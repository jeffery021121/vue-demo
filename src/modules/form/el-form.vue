<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "elForm",
  provide() {
    // elFormItem这个属性 放到了 当前的组件的_provide
    return { elForm: this };
  },
  props: {
    rules: {
      // 所有的规则
      type: Object,
      default: () => ({})
    },
    model: {
      // 所有的数据
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    async validate(cb) {
      // 其实这里可以有两种思路，一种是获取所有的子元素，子元素自己验证，另外一种就是父元素来验证，只是把结果给子元素
      // 我在react上用的后者，这个可能和我在react找不到所有子元素有关
      let arr = [];
      const getValiChild = children => { // 这个方法应该扩展成全局的$broadcast
        children.forEach(child => {
          if (
            child.$options.name === "elFormItem" &&
            child.validate &&
            child.prop
          ) {
            arr.push(child);
          }
          let graChildren = child.$children;
          if (graChildren && graChildren.length) {
            getValiChild(graChildren);
          }
        });
      };
      getValiChild(this.$children);
      try {
        await Promise.all(arr.map(child => child.validate()));
        cb(true);
      } catch {
        cb(false);
      }
    }
  }
};
</script>

<style>
</style>