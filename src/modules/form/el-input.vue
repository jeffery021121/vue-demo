<template>
  <input type="text" :value="value" @input="handleInput" />
</template>

<script>
export default {
  name: "elInput",
  props: {
    value: {
      type: String
      // default:''
    }
  },
  methods: {
    handleInput(e) {
      // 同步数据
      this.$emit("input", e.target.value);
      // 验证数据正确性，这个需要最近的el-form-item去执行其validate方法,这里需要用到$dispatch
      // 因为$parent很有可能找到的并不是elFormItem，可能是个中间包裹组件。
      this.$dispatch("elFormItem", "validate");
    }
  }
};
</script>

<style>
</style>