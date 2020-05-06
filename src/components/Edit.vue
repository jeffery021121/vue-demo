<template>
  <div class="box">
    <div class="btnBox">
      <input class="btn" type="button" @click="handleRun" value="运行" />
      <input class="btn" type="button" @click="handleClear" value="清空" />
    </div>
    <textarea
      class="textarea"
      :value="code"
      @input="handleInput"
      @keydown.9.prevent="handleKeyDown"
    />
  </div>
</template>

<script>
// 这里展示还是展示我们都code，每次修改将值传递给父组件
export default {
  name: "edit",
  data() {
    return { code: "" };
  },
  methods: {
    handleInput(e) {
      const code = e.target.value;
      this.code = code;
      this.$emit("edit", code);
    },
    handleRun() {
      this.$emit("run");
    },
    handleClear() {
      this.$emit("clear");
      this.code = '';
      this.$emit("edit", '');
    },
    handleKeyDown() {
      const code = this.code + "  ";
      this.code = code;
      this.$emit("edit", code);
    }
  }
};
</script>

<style scoped>
.box {
  background: rgba(66, 66, 66, 0.2);
}
.btnBox {
  background: pink;
}
.btn {
  width: 50px;
  margin-right: 30px;
}
.textarea {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  outline: none;
}
</style>