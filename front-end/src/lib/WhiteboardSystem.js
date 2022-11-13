import Konva from 'konva';
import Communication from './communication';
import OperateStack from './OperateStack';

export class WhiteBoardSystem {
  static bindCount = 0;

  // 是否初始化过了, 初始化之后就设置为true
  static initFlag = false;

  static userid = '';

  static permission = 'w';

  // 默认是0
  static currentSheet = '0';

  static roomId = '';

  static currentSelectNode = [];

  static recoverStack = new OperateStack();

  static userOperateStack = new OperateStack();

  /**
   * 画笔
   */
  static brush = {
    type: 'move',
    node: null,
    position: {},
    down: false,
    lineStyle: {
      color: '#000',
      weight: 1,
    },
    fillStyle: {
      color: '#fff',
    },
  };

  // stages ~= sheet数组
  static stages = [];

  static createRectByCache(config) {
    const rect = new Konva.Rect({
      id: config.id,
      x: config.position.x,
      y: config.position.y,
      width: config.attrs.size.width,
      height: config.attrs.size.height,
      fill: config.fillStyle.color,
      strokeWidth: Number(config.lineStyle.weight.split('p')[0]),
      // draggable: true,
    });
    if (config.shapeId !== undefined && config.shapeId !== '' && config.shapeId !== null) {
      rect.shapeId = config.shapeId;
    }
    if (config.userId !== undefined && config.userId !== '' && config.userId !== null) {
      rect.userId = config.userId;
    }
    rect.type = 'rect';
    return rect;
  }

  static drawRect(e, shapeId, userId) {
    this.brush.nodeId = String(Math.floor(Math.random() * 1000));
    const rect = new Konva.Rect({
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: 0,
      height: 0,
      stroke: this.brush.lineStyle.color,
      fill: this.brush.fillStyle.color,
      strokeWidth: this.brush.lineStyle.weight,
      // draggable: true,
    });
    if (shapeId !== undefined) {
      rect.shapeId = shapeId;
    }
    if (userId !== undefined) {
      rect.userId = userId;
    }
    rect.type = 'rect';
    return rect;
  }

  /**
   * 给图形对象增加选中变形状态
   * @param node konva图形对象
   */
  static openTranformer(node) {
    const { parent } = node;
    if (parent === null) {
      return;
    }
    const transformer = new Konva.Transformer({
      nodes: [node],
      centeredScaling: false,
      shouldOverdrawWholeArea: true,
    });
    if (node.shapeId !== undefined) {
      transformer.shapeId = node.shapeId;
    }
    parent.add(transformer);
  }

  /**
   * 选中
   */
  static select(target) {
    // 应该没有别人选中的时候才能选中
    if (target.shapeId !== undefined) {
      target.draggable(true);
      this.openTranformer(target);
      this.currentSelectNode.push(target);
    }
  }

  static sendDirective(type, body) {
    body.sheetIndex = this.currentSheet;
    body.userId = this.userid;
    const directive = JSON.stringify({ type, body });
    Communication.send(directive);
  }

  static _deleteNode(type, shapeId, sheetIndex) {
    let deleteNode = null;
    const nodes = this.stages[sheetIndex].stage.find(type);
    nodes.forEach((n) => {
      if (n.shapeId && n.shapeId === shapeId) {
        deleteNode = n.clone();
        deleteNode.shapeId = shapeId;
        n.destroy();
      }
    });
    this.reDraw();
    return deleteNode;
  }

  static _deleteNodeAndSendRective(type, shapeId, sheetIndex) {
    let deleteNode = null;
    const nodes = this.stages[sheetIndex].stage.find(type);
    nodes.forEach((n) => {
      if (n.shapeId && n.shapeId === shapeId) {
        deleteNode = n.clone();
        deleteNode.shapeId = shapeId;
        n.destroy();
        this.sendDirective('delete', { shapeId });
      }
    });
    this.reDraw();
    return deleteNode;
  }

  /**
   * 添加konva结点
   */
  static _addKonvaShape(node, sheetIndex) {
    console.log(this.stages);
    this.stages[Number(sheetIndex)].stage.children[0].add(node);
    this.reDraw();
  }

  static _addKonvaShapeAndSendDirective(node, sheetIndex) {
    this._addKonvaShape(node, sheetIndex);
    this.sendDirective('add', {
      shapeId: node.shapeId,
      type: node.type,
      json: node.toJSON(),
    });
  }

  /**
   * @用户操作
   * 删除当前选中的结点
   */
  static deleteSelectedNodes() {
    const operate = {
      type: 'delete',
      nodes: [],
    };
    this.currentSelectNode.forEach((node) => {
      this._deleteNode('Transformer', node.shapeId, this.currentSheet);
      const deleteNode = this._deleteNode('Shape', node.shapeId, this.currentSheet);
      operate.nodes.push(deleteNode);
    });
    this.userOperateStack.push(operate);
  }

  /**
   * @用户操作
   */
  static _bindDrawingHandler(stage) {
    stage.on('mousedown', (e) => {
      console.log(e.target);
      if (e.target === stage) {
        this.clearSelector(stage);
        this.currentSelectNode.forEach((node) => node.draggable(false));
        this.currentSelectNode = [];
      }
      this.brush.down = true;
      if (this.permission === 'w' && this.brush.type === 'move') {
        this.select(e.target);
      }
      if (this.permission === 'pw' && this.brush.type === 'move' && e.target.userid === this.userid) {
        this.select(e.target);
      }
      // const node = e.currentTarget;
      if (this.brush.type === 'rect') {
        const rect = this.drawRect(e, `${this.userid}-${Date.now()}`, this.userid);
        this.brush.node = rect;
        this.brush.position = { x: e.evt.layerX, y: e.evt.layerY };
        stage.children[0].add(rect);
        // 加入操作栈
        this.userOperateStack.appendOperate('add', [rect.shapeId]);
      }
    });
    stage.on('mouseup', (e) => {
      if (this.brush.down && this.brush.node !== null) {
        // 发送操作指令到服务器
        // Communication.send(
        //   JSON.stringify({
        //     type: 'add',
        //     body: {
        //       sheetIndex: this.currentSheet,
        //       shapeId: this.brush.nodeId, // 通用
        //       userId: this.userid,
        //       type: this.brush.type, // 通用
        //       position: this.brush.position,
        //       lineStyle: this.brush.lineStyle,
        //       fillStyle: this.brush.fillStyle,
        //       // 服务器端可以直接存储json字符串
        //       attrs: {
        //         size: {
        //           width: Math.abs(e.evt.layerX - this.brush.position.x),
        //           height: Math.abs(e.evt.layerY - this.brush.position.y),
        //         },
        //       },
        //     },
        //   }),
        // );
        this.sendDirective('add', {
          shapeId: this.brush.node.shapeId,
          type: this.brush.type,
          json: this.brush.node.toJSON(),
        });
      }
      this.brush.down = false;
      this.brush.node = null;
      this.brush.nodeId = null;
      this.brush.position = {};
      this.reDraw();
    });
    stage.on('mousemove', (e) => {
      if (this.brush.type === 'rect' && this.brush.down) {
        const w = Math.abs(e.evt.layerX - this.brush.position.x);
        const h = Math.abs(e.evt.layerY - this.brush.position.y);
        this.brush.node.attrs.width = w;
        this.brush.node.attrs.height = h;
        // e.target.children[0].draw();
        this.reDraw();
      }
    });
  }

  static createLayerByCache(index, shapes) {
    const layer = new Konva.Layer();
    shapes.forEach((shape) => {
      if (shape.type === 'rect') {
        const rect = WhiteBoardSystem.createRectByCache(shape);
        layer.add(rect);
        rect.on('mouseup', (e) => {
          const { parent } = e.target;
          const transformer = new Konva.Transformer({
            node: e.target,
            centeredScaling: false,
            shouldOverdrawWholeArea: true,
          });
          console.log(transformer);
          parent.add(transformer);
        });
      }
    });
    return layer;
  }

  // 处理服务器指令
  static directiveController() {
    Communication.onMessage((e) => {
      const { data } = e;
      const cache = JSON.parse(data);
      if (cache.type === 'cache') {
        WhiteBoardSystem.initStages(cache.body, this.userid);
      }
      if (cache.type === 'add') {
        WhiteBoardSystem.addDirective(cache.body);
      }
    });
  }

  static _bindStages() {
    WhiteBoardSystem.stages.forEach((stage, index) => {
      // const doc = document.getElementById(stage.id);
      // stage.container(doc);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const s = new Konva.Stage({
        container: stage.id,
        width,
        height,
      });
      console.log('s', s);
      this._bindDrawingHandler(s);

      const layer = WhiteBoardSystem.createLayerByCache(index, stage.shapes);
      s.add(layer);
      WhiteBoardSystem.stages[index].stage = s;
    });
  }

  static reDraw() {
    this.stages[this.currentSheet].stage.children[0].draw();
  }

  static bindStages() {
    // const timeid = setInterval(() => {
    //   if (this.bindCount > 5) {
    //     alert('初始化超时,请重新刷新页面!');
    //     clearInterval(window.sessionStorage.getItem('timeid'));
    //   }
    //   if (this.initFlag) {
    //     this._bindStages();
    //     clearInterval(window.sessionStorage.getItem('timeid'));
    //   }
    //   this.bindCount++;
    // }, 300);
    // window.sessionStorage.setItem('timeid', timeid);

    setTimeout(() => {
      this._bindStages();
    }, 1000);
  }

  static clearSelector(stage) {
    const transformer = stage.find('Transformer');
    transformer.forEach((tr) => tr.destroy());
    stage.draw();
  }

  static initStages(cache, userid) {
    this.userid = userid;
    cache.forEach((obj) => {
      // const width = window.innerWidth;
      // const height = window.innerHeight;

      // const stage = new Konva.Stage({
      //   container: obj.id,
      //   width,
      //   height,
      // });

      // const layer = WhiteBoardSystem.createLayerByCache(cache.shapes);

      // add the layer to the stage
      // stage.add(layer);
      WhiteBoardSystem.stages.push({
        id: obj.id,
        name: obj.name,
        shapes: obj.shapes,
        stage: {},
      });
    });
    console.log('initStages结果', WhiteBoardSystem.stages);
    this.initFlag = true;
  }

  static createNodeByCacheDirective(cacheBody) {
    // let node = null;
    const { type } = cacheBody;
    const jsonObj = JSON.parse(cacheBody.json);
    const node = new Konva[jsonObj.className](jsonObj.attrs);
    node.type = type;
    node.shapeId = cacheBody.shapeId;
    node.userId = cacheBody.userId;
    this._addKonvaShape(node, cacheBody.sheetIndex);
    // if (type === 'rect') {
    //   node = new Konva.Rect({
    //     x: cacheBody.position.x,
    //     y: cacheBody.position.y,
    //     width: cacheBody.attrs.size.width,
    //     height: cacheBody.attrs.size.height,
    //     stroke: cacheBody.lineStyle.color,
    //     strokeWidth: cacheBody.lineStyle.weight,
    //     fill: cacheBody.fillStyle.color,
    //   });
    //   if (this.permission === 'w') {
    //     // node.draggable(true);
    //   }
    // }
    return node;
  }

  /**
   * 添加来自服务器的图形
   */
  static addDirective(cacheBody) {
    console.log('cacheBody', cacheBody);
    if (cacheBody.userId === this.userid) {
      return;
    }
    const { sheetIndex } = cacheBody;
    const layer = this.stages[Number(sheetIndex)].stage.children[0];
    console.log('要添加的layer', layer);
    const node = this.createNodeByCacheDirective(cacheBody);
    layer.add(node);
    layer.draw();
  }

  static deleteDirective(cacheBody) {
    console.log('deleteDirective', cacheBody);
    if (cacheBody.userId === this.userid) {
      return;
    }
    const { sheetIndex } = cacheBody;
    this._deleteNode('Shape', cacheBody.shapeId, sheetIndex);
  }

  /**
   * 撤回一次
   */
  static backout() {
    // 先从操作栈pop一个操作
    const operate = this.userOperateStack.pop();
    if (operate === undefined) {
      return;
    }
    console.log('operate', operate);
    console.log('backout');
    const backoutOperate = { type: '', nodes: [] };
    // 判断操作的类型
    // 如果是add
    if (operate.type === 'add') {
      backoutOperate.type = 'add';
      operate.nodes.forEach((nodeid) => {
        const deletedNode = this._deleteNodeAndSendRective('Shape', nodeid, this.currentSheet);
        backoutOperate.nodes.push(deletedNode);
      });
    }
    if (operate.type === 'delete') {
      backoutOperate.type = 'delete';
      operate.nodes.forEach((node) => {
        this._addKonvaShapeAndSendDirective(node, this.currentSheet);
        backoutOperate.nodes.push(node.shapeId);
      });
    }
    this.recoverStack.push(backoutOperate);
  }

  /**
   * 恢复
   */
  static recover() {
    // 先从恢复pop一个操作
    const operate = this.recoverStack.pop();
    if (operate === undefined) {
      return;
    }
    const recallOperate = { type: '', nodes: [] };
    // 判断操作的类型
    // 如果是add
    if (operate.type === 'add') {
      recallOperate.type = 'add';
      operate.nodes.forEach((node) => {
        this._addKonvaShapeAndSendDirective(node, this.currentSheet);

        recallOperate.nodes.push(node.shapeId);
      });
    }
    if (operate.type === 'delete') {
      recallOperate.type = 'delete';
      operate.nodes.forEach((node) => {
        const deletedNode = this._deleteNodeAndSendRective('Shape', node, this.currentSheet);
        recallOperate.nodes.push(deletedNode);
      });
    }
    this.userOperateStack.push(recallOperate);
  }

  /**
   [{"id":"container_1","name":"随便画画1","shapes":[{"shapeId":"10023","userId":"324ad43bc2","type":"rect","position":{"x":60,"y":60},"lineStyle":{"type":"solid","weight":"2px","color":"#ff0000"},"fillStyle":{"color":"#ff0000"},"attrs":{"size":{"width":100,"height":100}}}]},{"id":"container_2","name":"随便画画2","shapes":[{"shapeId":"10024","userId":"324ad43bc2","type":"rect","position":{"x":100,"y":200},"lineStyle":{"type":"solid","weight":"2px","color":"#00ff00"},"fillStyle":{"color":"#00ff00"},"attrs":{"size":{"width":80,"height":80}}}]},{"id":"container_3","name":"随便画画3","shapes":[{"shapeId":"10027","userId":"324ad43bc2","type":"rect","position":{"x":300,"y":300},"lineStyle":{"type":"solid","weight":"2px","color":"#ff0000"},"fillStyle":{"color":"#0000ff"},"attrs":{"size":{"width":150,"height":150}}}]}]
   */
  static initData = [
    {
      id: 'container_1',
      name: '随便画画1',
      shapes: [
        {
          shapeId: '10023',
          userId: '324ad43bc2',
          type: 'rect',
          position: {
            x: 60,
            y: 60,
          },
          lineStyle: {
            type: 'solid',
            weight: '2px',
            color: '#ff0000',
          },
          fillStyle: {
            color: '#ff0000',
          },
          attrs: {
            size: {
              width: 100,
              height: 100,
            },
          },
        },
      ],
    },
    {
      id: 'container_2',
      name: '随便画画2',
      shapes: [
        {
          shapeId: '10024',
          userId: '324ad43bc2',
          type: 'rect',
          position: {
            x: 100,
            y: 200,
          },
          lineStyle: {
            type: 'solid',
            weight: '2px',
            color: '#00ff00',
          },
          fillStyle: {
            color: '#00ff00',
          },
          attrs: {
            size: {
              width: 80,
              height: 80,
            },
          },
        },
      ],
    },
    {
      id: 'container_3',
      name: '随便画画3',
      shapes: [
        {
          shapeId: '10027',
          userId: '324ad43bc2',
          type: 'rect',
          position: {
            x: 300,
            y: 300,
          },
          lineStyle: {
            type: 'solid',
            weight: '2px',
            color: '#ff0000',
          },
          fillStyle: {
            color: '#0000ff',
          },
          attrs: {
            size: {
              width: 150,
              height: 150,
            },
          },
        },
      ],
    },
  ];
}
