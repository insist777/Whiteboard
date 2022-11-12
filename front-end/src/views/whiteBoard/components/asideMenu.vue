<template>
  <div>
    <div class="elContainer w-12 mt-12">
      <div class="iconf my-2">
        <div id="arrow">
          <i class="iconfont icon-ArrowUpRight text-xl p-2 hover:bg-gray-200"></i>
        </div>
        <div id="pen"><i class="iconfont icon-pencil text-xl p-2 hover:bg-gray-200"></i></div>
        <div id=""><i class="iconfont icon-line text-xl font-bold p-2 hover:bg-gray-200"></i></div>
        <div id="circle"><i class="iconfont icon-circle text-xl p-2 hover:bg-gray-200"></i></div>
        <div id="triangle">
          <i class="iconfont icon-triangle-s-o text-xl p-2 hover:bg-gray-200 text-gray-500"></i>
        </div>
        <div @click="clickRect">
          <i class="iconfont icon-Rectangle text-xl p-2 hover:bg-gray-200"></i>
        </div>
        <div id="elli"><i class="iconfont icon-tuoyuan text-2xl p-2 hover:bg-gray-200"></i></div>
        <div id="text">
          <i class="iconfont icon-text text-2xl p-2 hover:bg-gray-200 text-gray-500"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideMenu',
  data() {
    return {
      iconIsclick: '',
    };
  },
  methods: {
    clickRect() {
      this.iconIsclick = 'rect';
      this.$emit('clickData', this.iconIsclick);
    },
  },
};
</script>

<style lang="less" scoped>
.elContainer {
  .iconf {
    div {
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }
}
</style>
