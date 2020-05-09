<template>
  <div>
    <p>其实还需要加离开的路由钩子清空有可能因编辑器造成的影响</p>
    <div class="compilerBox">
      <div class="item">
        <Edit @edit="handleEdit" @run="handleRun" @clear="handleClear" />
      </div>
      <div class="item">
        <Show :code="code" ref="show" />
      </div>
    </div>
  </div>
</template>

<script>
import Edit from "../components/Edit";
import Show from "../components/Show";
export default {
  name: "Compiler",
  components: {
    Show,
    Edit
  },
  data() {
    return {
      code: ""
    };
  },
  created(){
    console.log('this_compiler',this)
  },
  methods: {
    handleEdit(code) {
      this.code = code;
    },
    handleRun() {
      this.$refs["show"].renderCode();
    },
    handleClear() {
      this.$refs["show"].clear();
    }
  }
};
</script>

<style scoped>
.compilerBox {
  display: flex;
}
.item {
  flex: 1;
  height: 100%;
}
</style>