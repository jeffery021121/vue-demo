<template>
  <div>
    {{label}}
    <slot></slot>
    {{errMsg}}
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  name: "elFormItem", // 这里要拿到校验规则 和 校验数据。得通过类似react contextApi的 provide和inject
  inject: ["elForm"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errMsg: ""
    };
  },
  methods: {
    validate() {
      const ruleValue = this.elForm.rules[this.prop];
      const value = this.elForm.model[this.prop];
      const rule = { [this.prop]: ruleValue };
      let schema = new Schema(rule);
      // 错误的话promise会reject,成功才会resolve
      return schema.validate({ [this.prop]: value }, err => {
        if (err && err.length) {
          this.errMsg = err[err.length - 1].message;
        } else {
          this.errMsg = "";
        }
      });
    }
  }
};
</script>

<style>
</style>