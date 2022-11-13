export default class OperateStack {
  constructor() {
    this._opetates = [];
  }

  push(shape) {
    this._opetates.push(shape);
  }

  /**
   * @returns operate
   */
  pop() {
    return this._opetates.pop();
  }

  peek() {
    return this._opetates[this._opetates.length - 1];
  }

  appendOperate(type, nodes) {
    const operate = {
      type,
      nodes,
    };
    this.push(operate);
  }

  clear() {
    this._opetates = [];
  }
}
