<template>
  <div class="body flex w-screen h-screen items-center justify-center">
    <div class="container">
      <h1>请输入昵称</h1>
      <form>
        <div class="form-control">
          <input v-model="userName" type="text" required />
        </div>

        <button class="btn" @click="clickLogin">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { WhiteBoardSystem } from '@/lib/WhiteboardSystem';

export default {
  data() {
    return {
      userName: '',
    };
  },
  methods: {
    clickLogin() {
      const roomId = uuidv4();
      const userId = uuidv4();
      if (this.userName) {
        WhiteBoardSystem.roomId = roomId;
        WhiteBoardSystem.userId = userId;
        window.location = '/whiteBoard';
      }
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
  color: #fff;
  font-family: 'Muli', sans-serif;
  overflow: hidden;
}

.container {
  width: 30%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 60px;
  border-radius: 5px;
}

.container h1 {
  text-align: center;
  margin-bottom: 30px;
}

.container a {
  text-decoration: none;
  color: lightblue;
}

.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: #e6c3c2;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.text {
  margin-top: 30px;
}

.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 300px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 109%;
  padding: 20px 0;
  font-size: 18px;
  color: #fff;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: #faaca8;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus+label span,
.form-control input:valid+label span {
  color: lightblue;
  transform: translateY(-30px);
}
</style>
