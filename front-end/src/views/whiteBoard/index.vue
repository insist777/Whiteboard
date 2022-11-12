<template>
  <div class="h-screen w-screen">
    <el-container class="h-screen">
      <el-header
        class="bg-gray-100 fixed bg-transparent top-0 left-0 right-0 z-20 shadow-md leading-10"
        height="40px"
      >
        <div>
          <i class="iconfont icon-fanhui cursor-pointer hover:bg-gray-200 p-1"></i
          ><span class="px-5">|</span>
          <i class="iconfont icon-Undo cursor-pointer hover:bg-gray-200 p-1"></i>
          <i class="iconfont icon-Redo cursor-pointer mx-5 hover:bg-gray-200 p-1"></i>
          <span class="pr-5">|</span>
          <el-select v-model="fontSelect" class="font">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="pr-5">|</span>
          <el-input-number
            v-model="fontSize"
            class="count"
            controls-position="right"
            :min="1"
            :max="10"
            size="small"
          ></el-input-number>
          <span class="px-5">|</span>
          <i class="iconfont icon-tianse cursor-pointer text-gray-500 hover:bg-gray-200 p-1"></i>
          <i class="el-icon-edit cursor-pointer ml-3 hover:bg-gray-200 p-1"></i>
          <i class="iconfont icon-image cursor-pointer hover:bg-gray-200 p-1 ml-3"></i>
          <span class="px-5">|</span>
          <i class="iconfont icon-select cursor-pointer text-gray-800 hover:bg-gray-200 p-1"></i>
          <i class="iconfont icon-cut cursor-pointer hover:bg-gray-200 p-1 mx-3"></i>
          <i class="iconfont icon-copy cursor-pointer mr-5 hover:bg-gray-200 p-1"></i>
          <i class="iconfont icon-paste cursor-pointer text-gray-500 hover:bg-gray-200 p-1"></i>
          <span class="px-5">|</span>
          <i class="iconfont icon-clear cursor-pointer text-gray-800 hover:bg-gray-200 p-1"></i>
        </div>
      </el-header>
      <el-container class="mt-10 text-center">
        <div class="w-12 bg-gray-100 h-screen">
          <div class="my-2">
            <div class="my-3"><i class="iconfont icon-ArrowUpRight text-xl px-2"></i></div>
            <div class="my-3"><i class="iconfont icon-pencil text-xl px-2"></i></div>
            <div class="my-3"><i class="iconfont icon-line text-xl font-bold px-2"></i></div>
            <div class="my-3"><i class="iconfont icon-circle text-xl px-2"></i></div>
            <div class="my-3">
              <i class="iconfont icon-triangle-s-o text-xl px-2 text-gray-500"></i>
            </div>
            <div class="my-3"><i class="iconfont icon-Rectangle text-xl px-2"></i></div>
            <div class="my-3"><i class="iconfont icon-tuoyuan text-2xl px-2"></i></div>
            <div class="my-3"><i class="iconfont icon-text text-2xl px-2 text-gray-500"></i></div>
          </div>
        </div>
        <el-main class="bg-white">
          <div></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '微软雅黑',
        },
        {
          value: '选项2',
          label: '宋体',
        },
        {
          value: '选项3',
          label: '楷体',
        },
      ],
      fontSelect: '选项1',
      fontSize: 1,
    };
  },
};
</script>

<style scoped lang="less">
.count ::v-deep.el-input {
  width: 50px;
}
::v-deep .el-input__inner {
  padding: 0;
  border: 0;
  background-color: transparent;
}
::v-deep .el-input-number__decrease,
.el-input-number__increase {
  padding: 0;
  border: 0;
  background-color: transparent;
}
.font ::v-deep .el-input__inner {
  width: 100px;
  padding: 0;
  border: 0;
  background-color: transparent;
}
</style>
