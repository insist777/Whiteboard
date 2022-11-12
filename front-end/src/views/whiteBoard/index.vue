<template>
  <div class="h-screen w-screen">
    <el-container :key="index" class="h-screen" @click="clickedTool">
      <el-header
        class="bg-gray-100 fixed bg-transparent top-0 left-0 right-0 z-20 leading-10 shadow-sm"
        height="40px"
      >
        <HeaderMenu />
      </el-header>
      <el-container class="text-center h-screen bg-gray-100">
        <AsideMenu />
        <el-main class="bg-white mt-10">
          <div></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Tools } from './config';
import HeaderMenu from './components/headerMenu.vue';
import AsideMenu from './components/asideMenu.vue';

export default {
  components: {
    HeaderMenu,
    AsideMenu,
  },
  data() {
    return {
      toolNames: Object.values(Tools),
    };
  },
  methods: {
    clickedTool(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped lang="less"></style>
