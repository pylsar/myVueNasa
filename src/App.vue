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
  box-sizing: border-box;
}
#app {
  display: flex;
}
</style>
