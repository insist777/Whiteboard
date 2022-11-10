<template>
  <div class="h-screen w-screen">
    <el-container class="h-screen">
      <el-header
        class="bg-gray-100 fixed bg-transparent top-0 left-0 right-0 z-20 shadow-md leading-10"
        height="40px"
      >
        <div>
          <i class="iconfont icon-fanhui cursor-pointer"></i><span class="px-5">|</span>
          <i class="iconfont icon-Undo cursor-pointer"></i>
          <i class="iconfont icon-Redo cursor-pointer px-5"></i>
          <span class="pr-5">|</span>
          <el-select v-model="fontSelect" placeholder="微软雅黑" class="font">
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
          ></el-input-number>
          <span class="px-5">|</span>
          <i class="iconfont icon-tianse cursor-pointer text-gray-500"></i>
        </div>
      </el-header>
      <el-container class="mt-10 text-center">
        <el-aside class="w-1/5 bg-gray-300">Aside</el-aside>
        <el-main class="bg-gray-200">Main</el-main>
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
      fontSelect: '',
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
