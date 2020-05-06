<template>
  <div>
    <div>代码运行结果</div>
    <div ref="showBox" class="showBox"></div>
  </div>
</template>

<script>
export default {
  name: "show",
  props: {
    code: {
      type: String,
      default: ""
    }
  },
  methods: {
    getSouce(nodeType) {
      const reg = new RegExp(`<${nodeType}[^>]*>`);
      const matches = this.code.match(reg);
      let nodeCode = undefined;
      if (matches) {
        const start = matches.index + matches[0].length;
        const end = this.code.indexOf(`</${nodeType}>`);
        nodeCode = this.code.slice(start, end);
      }
      return nodeCode;
    },
    renderCode() {
      const templateCode = this.getSouce("template");
      const scriptCode = this.getSouce("script");
      const style = this.getSouce("style");
      let vueComponentObj = {
        template: "<div></div>"
      };
      if (scriptCode) {
        vueComponentObj = new Function(
          scriptCode.replace("export default", "return")
        )();
      }
      if (templateCode) vueComponentObj.template = templateCode;
      const VueComponent = this.$options._base.extend(vueComponentObj);
      const instance = new VueComponent();
      const node = instance.$mount().$el;
      //   this.$refs.showBox.innerHTML = "";
      this.clear();
      setTimeout(() => {
        this.$refs.showBox.appendChild(node);
      }, 200);

      if (style) {
        const element = document.createElement("style");
        element.innerHTML = style;
        element.setAttribute("compilerAdd", "compilerAdd");
        document.body.appendChild(element);
      }
    },
    clear() {
      this.$refs.showBox.innerHTML = "";
      const elements = document.getElementsByTagName("style");
      const arr = [];
      Array.prototype.forEach.call(elements, element => {
        if (element.getAttribute("compilerAdd")) {
          const parent = element.parentNode;
          // 直接在这里删除，会删除不掉
          arr.push({ parent, element });
        }
      });
      arr.forEach(({ parent, element }) => {
        parent.removeChild(element);
      });
    }
  }
};
</script>

<style scoped>
.showBox {
  background: paleturquoise;
  height: 300px;
}
</style>