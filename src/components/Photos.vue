<template>
  <div class="photos">
    <form @submit.prevent="getPics()" class="photos__form">
      <input type="text" v-model="query" class="photos__search"/>
      <button class="photos__search-btn">find</button>
    </form>
    <div class="photos__subform">
      <button v-show="this.pics.length !== 0" @click="prev()" class="photos__search-subbtn">prev</button>
      <button v-show="this.pics.length !== 0" @click="next()" class="photos__search-subbtn">next</button>
    </div>
    <div v-show="this.pics.length === 0" class="photos__help">
      <span>Введите корректный запрос( например: sun, moon, rocket etc.)</span>
    </div>
    <div v-if="pics" class="nasa__box">
      <div v-for="(pic, index) in pics" :key="index" class="nasa__img">
        <img
          :src="pic.links[0].href"
          alt=""
          :style="{ 'margin-left': '-' + 200 * currentPic + '%' }"
        />
      </div>
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
  height: 80vh;
  &__help{
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 20px;
  }
  &__form{
    width: 300px;
    height: 40px;
    margin: 0 auto;
  }
  &__search{
    width: 260px;
    height: 100%;
    outline: none;
    padding-left: 5px;
    background: none;
    border: none;
    border: 1px solid #00CC66;
  }
  &__search-btn{
    width: 40px;
    height: 100%;
    outline: none;
    border: none;
    background: #00CC66;
    cursor: pointer;
  }
  &__subform{
    width: 300px;
    margin: 0 auto;
  }
  &__search-subbtn{
    width: 150px;
    cursor: pointer;
    background: none;
    border: 1px solid #00CC66;
    outline: none;
    margin-bottom: 20px;
  }
}
.nasa__box {
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 80vh;
}
.nasa__img {
  min-width: 100%;
  max-height: 100%;
  & img {
    width: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 860px) {
  .photos {
    width: 100%;
  }
}
</style>