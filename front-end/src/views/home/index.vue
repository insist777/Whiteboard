<template>
  <div class="flex flex-row min-h-screen bg-gradient-to-r from-gray-800 to-blue-800">
    <nav class="fixed bg-transparent top-0 left-0 right-0 transition-all ease-in-out z-20">
      <div class="py-5 flex justify-between items-center transition-all ease-in-out">
        <h1
          class="ml-6 bg-clip-text text-3xl text-transparent font-mono bg-gradient-to-r from-green-400 to-blue-500"
        >
          Invincibility
        </h1>
        <ul class="flex justify-center items-center">
          <li class="text-white px-8 hover:text-red-600 cursor-pointer">
            <i class="iconfont icon-home"></i>
            首页
          </li>
          <li class="text-white px-8 hover:text-red-800 cursor-pointer">
            <i class="iconfont icon-about"></i>
            关于
          </li>
          <li class="text-white px-8 hover:text-red-800 cursor-pointer">
            <i class="iconfont icon-contact"></i>
            联系
          </li>
        </ul>
      </div>
    </nav>

    <div class="h-screen flex items-center justify-center text-center w-screen">
      <div class="container">
        <h1 class="text-5xl -mt-5 mx-5 text-white">Welcome To WhiteBoard</h1>
        <p class="text-xl tracking-wider text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, consequuntur?
        </p>
        <div class="button mt-10">
          <button @click="createWhiteBoard">创建房间</button>
          <button>加入房间</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    createWhiteBoard() {
      this.$router.push('/whiteBoard');
    },
  },
};
</script>

<style scoped lang="less">
.button {
  button {
    margin-left: 32px;
    padding: 32px 160px;
    font-size: 20px;
    border: 0.5px white solid;
    border-radius: 9999px;
    color: white;
    background-color: transparent;
    transition: background 1s;
  }
  button:hover {
    color: black;
    background-color: #fff;
  }
}
</style>
