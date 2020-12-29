<template>
  <div class="photos">
    <form @submit.prevent="getPics()">
      <input type="text" v-model="query" />
      <button>find</button>
    </form>
    <button v-show="this.pics.length !== 0" @click="prev()">prev</button>
    <button v-show="this.pics.length !== 0" @click="next()">next</button>
    <div v-if="pics" class="nasa__box">
      <div v-for="(pic, index) in pics" :key="index" class="nasa__img">
        <img
          :src="pic.links[0].href"
          alt=""
          :style="{ 'margin-left': '-' + 200 * currentPic + '%' }"
        />
      </div>
    </div>
    <div v-show="this.pics.length === 0">
      <span>Введите корректный запрос( например: sun, moon, rocket etc.)</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      query: "",
      pics: [],
      currentPic: 0,
    };
  },
  methods: {
    getPics() {
      const urlPic =
        "https://images-api.nasa.gov/search?q=" +
        this.query +
        "&media_type=image";
      axios.get(urlPic).then((response) => {
        // console.log(response.data.collection.items);
        this.pics = response.data.collection.items;
      });
    },
    next() {
      if (this.currentPic >= this.pics.length - 1) {
        this.currentPic = 0;
      } else {
        this.currentPic++;
      }
    },
    prev() {
      if (this.currentPic <= 0) {
        this.currentPic = this.pics.length - 1;
      } else {
        this.currentPic--;
      }
    },
  },
};
</script>

<style lang="scss">
.photos {
  width: 50%;
}
.nasa__box {
  display: flex;
  overflow-x: hidden;
}
.nasa__img {
  min-width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
  }
}
</style>