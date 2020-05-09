<template>
  <div id="app">
    <ul class="nav">
      <router-link active-class="activeLink" class="link" tag="li" to="/" exact>首页</router-link>
      <router-link active-class="activeLink" class="link" tag="li" to="/outSideClick">OutSide自定义指令</router-link>
      <router-link
        active-class="activeLink"
        class="link"
        tag="li"
        to="/lazyImgLoad"
      >lazyImgLoad自定义指令</router-link>
      <router-link active-class="activeLink" class="link" tag="li" to="/compiler">compiler页面</router-link>
      <router-link active-class="activeLink" class="link" tag="li" to="/form">form页面</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log("this:", this);
  }
};
</script>

<style scoped>
.nav {
  border: 1px solid purple;
  padding: 20px;
}
.activeLink {
  color: red;
}
</style>
