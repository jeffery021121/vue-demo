<template>
  <div id="app">
    <div v-out-side="blur">
      <input type="text" @focus="focus" />
      <div class="band" v-show="visiable">
        <input type="button" value="点我啊" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutSideClick",
  data() {
    return {
      aa: 111,
      visiable: false
    };
  },
  methods: {
    focus() {
      this.visiable = true;
    },
    blur() {
      this.visiable = false;
    }
  },
  directives: {
    outSide: {
      bind(el, bindings, vnode) {
        el.handler = e => {
          if (el.contains(e.target)) return;
          vnode.context[bindings.expression]();
        };
        document.addEventListener("click", el.handler);
      },
      unbind(el) {
        document.removeEventListener("click", el.handler);
      }
    }
  }
};
</script>

<style scoped>
.band {
  height: 50px;
  width: 50px;
  background: pink;
}
</style>