<template>
  <div>
    <div class="headIcon -ml-1">
      <i class="iconfont icon-fanhui"></i><span class="mx-5 select-none">|</span>
      <i class="iconfont icon-Undo"></i>
      <i class="iconfont icon-Redo mx-5"></i>
      <span class="mr-5 select-none">|</span>
      <el-select v-model="fontSelect" class="font select-none">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span class="pr-5 select-none">|</span>
      <el-input-number
        v-model="fontSize"
        class="count"
        controls-position="right"
        :min="1"
        :max="10"
        size="small"
      ></el-input-number>
      <span class="mx-5 select-none">|</span>
      <i class="iconfont icon-tianse text-gray-500"></i>
      <i class="el-icon-edit ml-3"></i>
      <i class="iconfont icon-image ml-3"></i>
      <span class="mx-5 select-none">|</span>
      <i class="iconfont icon-select text-gray-800"></i>
      <i class="iconfont icon-cut mx-3"></i>
      <i class="iconfont icon-copy mr-5"></i>
      <i class="iconfont icon-paste text-gray-500"></i>
      <span class="mx-5 select-none">|</span>
      <i class="iconfont icon-clear text-gray-800"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu',
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

<style lang="less" scoped>
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

.headIcon {
  i {
    cursor: pointer;
    padding: 4px;
  }
  i:hover {
    background-color: rgb(229 231 235);
  }
}
</style>
