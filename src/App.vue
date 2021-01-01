<template>
  <div id="app">
    <list />
    <photos />
  </div>
</template>

<script>
import List from "./components/List";
import Photos from "./components/Photos";
export default {
  name: "App",
  components: {
    List,
    Photos,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background: skyblue;
}
#app {
  display: flex;
  width: 96%;
  margin: 0 auto;
  padding-top: 20px;
}



@media screen and (max-width: 860px) {
#app {
    flex-direction: column;
  }
}

</style>
