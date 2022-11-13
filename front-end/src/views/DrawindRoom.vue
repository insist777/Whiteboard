<template>
  <div class="drawing_room">
    <div>
      <div>UserID: <input v-model="userid" type="text" /></div>
      <div>房间号: {{ roomId }}</div>
    </div>
    <div style="width: 100vw; height: 100vh" @contextmenu.prevent="onContextmenu">
      <el-tabs v-model="activeSheet" type="border-card">
        <el-tab-pane v-for="(obj, index) in sheets" :ref="'pane' + index" :key="index" :name="String(index)"
          :label="obj.name">
          <div :id="obj.id"></div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-card shadow="always" :body-style="{ padding: '20px', width: '700px' }">
      <div style="display: flex; justify-items: center">
        <div class="block" style="display: flex; justify-items: center">
          <span class="demonstration">线框颜色</span>
          <el-color-picker v-model="lineColor"></el-color-picker>
        </div>
        <div class="block" style="display: flex; justify-items: center">
          <span class="demonstration">填充颜色</span>
          <el-color-picker v-model="fillColor"></el-color-picker>
        </div>
        <div>边框宽度: <input v-model="lineWeight" style="width: 40px; height: 30px" type="number" /></div>
      </div>
      <div class="operate-btn">
        <div>
          <el-radio-group v-model="brushType">
            <el-radio-button label="选择"></el-radio-button>
            <el-radio-button label="箭头"></el-radio-button>
            <el-radio-button label="矩形"></el-radio-button>
            <el-radio-button label="圆形"></el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="backout">撤销</el-button>
          <el-button type="primary" size="mini" @click="recover">恢复</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue';
import Contextmenu from 'vue-contextmenujs';
// import TheWelcome from '@/components/TheWelcome.vue';
import Communication from '@/lib/communication';
import { WhiteBoardSystem } from '@/lib/WhiteboardSystem';

Vue.use(Contextmenu);

export default {
  data() {
    return {
      rightMenu: false,
      activeSheet: '0',
      userid: Math.floor(Math.random() * 10000),
      cache: {},
      sheets: WhiteBoardSystem.stages,
      brushType: '选择',
      flag: false,
      timeId: null,
      roomId: '123123',
      lineColor: '#000',
      fillColor: '#fff',
      lineWeight: 1,
    };
  },
  computed: {
    sheets1() {
      return WhiteBoardSystem.stages;
    },
  },
  watch: {
    lineColor(nv) {
      WhiteBoardSystem.brush.lineStyle.color = nv;
    },
    fillColor(nv) {
      WhiteBoardSystem.brush.fillStyle.color = nv;
    },
    lineWeight(nv) {
      WhiteBoardSystem.brush.lineStyle.weight = nv;
    },
    userid(newValue) {
      WhiteBoardSystem.userid = newValue;
    },
    activeSheet(newValue) {
      WhiteBoardSystem.currentSheet = newValue;
    },
    roomId(nv) {
      WhiteBoardSystem.roomId = nv;
    },
    brushType(nv) {
      const dict = { 选择: 'move', 箭头: 'arrow', 矩形: 'rect', 圆形: 'ellipse' };
      WhiteBoardSystem.brush.type = dict[nv];
    },
  },
  mounted() {
    // 画图形
    WhiteBoardSystem.bindStages();
  },
  created() {
    this.connectServer();
  },
  methods: {
    connectServer() {
      Communication.connect(`ws://localhost:8080/websocket/${this.userid}`);
      Communication.onMessage((e) => {
        const { data } = e;
        const cache = JSON.parse(data);
        if (cache.type === 'cache') {
          if (!WhiteBoardSystem.initFlag) {
            WhiteBoardSystem.initStages(cache.body, this.userid);
          }
        }
        if (cache.type === 'add') {
          console.log(cache);
          WhiteBoardSystem.addDirective(cache.body);
        }
        if (cache.type === 'delete') {
          WhiteBoardSystem.deleteDirective(cache.body);
        }
      });
    },
    rectBrush() {
      this.setBrush('rect');
    },
    moveBrush() {
      this.setBrush('move');
    },
    setBrush(type) {
      WhiteBoardSystem.brush.type = type;
      this.brushType = WhiteBoardSystem.brush.type;
    },
    backout() {
      WhiteBoardSystem.backout();
    },
    recover() {
      WhiteBoardSystem.recover();
    },
    onContextmenu(event) {
      console.log('快捷菜单');
      this.$contextmenu({
        items: [
          {
            label: '删除选中结点',
            onClick: () => {
              WhiteBoardSystem.deleteSelectedNodes();
            },
          },
        ],
        event, // 鼠标事件信息
        customClass: 'custom-class', // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230, // 主菜单最小宽度
      });
      return false;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
}

.el-card {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.operate-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
