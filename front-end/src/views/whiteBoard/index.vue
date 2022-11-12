<template>
  <div class="h-screen w-screen">
    <el-container class="h-screen">
      <el-header
        class="bg-gray-100 fixed bg-transparent top-0 left-0 right-0 z-20 leading-10 shadow-sm"
        height="40px"
      >
        <HeaderMenu />
      </el-header>
      <el-container class="text-center h-screen bg-gray-100">
        <AsideMenu @clickData="getClickData" />
        <el-main class="bg-white mt-10">
          <div
            id="container"
            @mousedown="getMousedownData($event)"
            @mouseup="getMouseupData($event)"
          ></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Konva from 'konva';
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
      stage: null,
      layer: null,
      isClickIcon: '',
      mousedownX: null,
      mousedownY: null,
      mouseupX: null,
      mouseupY: null,
    };
  },
  mounted() {
    this.initial();
    this.stage.add(this.layer);
  },
  methods: {
    // 初始化
    initial() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.stage = new Konva.Stage({
        container: 'container',
        width,
        height,
      });
      this.layer = new Konva.Layer();
    },
    // 添加矩形
    addRect() {
      const rect2 = new Konva.Rect({
        x: this.mousedownX,
        y: this.mousedownY,
        width: 100,
        height: 50,
        fill: 'white',
        shadowBlur: 0,
        cornerRadius: 0,
      });
      this.layer.add(rect2);
    },
    // 获取点击菜单栏
    getClickData(data) {
      this.isClickIcon = data;
      switch (this.isClickIcon) {
        case 'rect':
          this.addRect();
          break;
        default:
          return;
      }
    },
    getMousedownData(e) {
      // console.log(e);
      this.mousedownX = e.x;
      this.mousedownY = e.y;
      this.addRect();
    },
    getMouseupData(e) {
      // console.log(e);
      this.mouseupX = e.x;
      this.mouseupY = e.y;
    },
  },
};
</script>

<style scoped lang="less"></style>
