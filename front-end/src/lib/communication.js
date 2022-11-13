export default class Communication {
  static websocket = null;

  static connect(url) {
    this.websocket = new WebSocket(url);
  }

  static send(msg) {
    this.websocket.send(msg);
  }

  static onOpen(func) {
    this.websocket.onopen = func;
  }

  static onMessage(func) {
    this.websocket.onmessage = func;
  }

  static onClose(func) {
    this.websocket.onclose = func;
  }

  static close() {
    this.websocket.close();
  }
}
