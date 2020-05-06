<template>
  <div>
    <ul class="box">
      <li v-for="(img,index) in imgs" :key="img">
        {{index}}::
        <img class="img" v-self-lazy="img" alt />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Lazy",
  data() {
    return {
      imgs: []
    };
  },
  created() {
    setTimeout(() => {
      this.imgs = [
        "http://localhost:3000/images/10.jpeg",
        "http://localhost:3000/images/11.jpeg",
        "http://localhost:3000/images/12.jpeg",
        "http://localhost:3000/images/13.jpeg",
        "http://localhost:3000/images/14.jpeg",
        "http://localhost:3000/images/15.jpeg",
        "http://localhost:3000/images/16.jpeg",
        "http://localhost:3000/images/17.jpeg",
        "http://localhost:3000/images/18.jpeg",
        "http://localhost:3000/images/19.jpeg",
        "http://localhost:3000/images/20.jpeg"
      ];
      }, 1000);
  }
};
</script>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  overflow: scroll;
}
img {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px solid pink;
}

li {
  list-style: none;
  display: flex;
  align-items: center;
}
</style>