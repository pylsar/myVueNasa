<template>
  <div id="app">
    <div class="data">
      <div class="list">
        <span class="one">id</span>
        <span class="one">Name</span>
      </div>
      <div v-for="(item, index) in items" :key="index" class="list">
        <div class="one">
          <span>{{ item.name }}</span>
        </div>
        <div class="one">
          <span>{{ item.name_limited }}</span>
        </div>
      </div>
    </div>
    <div class="photos">
      <form @submit.prevent="getPics(query)">
        <input type="text" v-model="query" />
        <button>find</button>
      </form>
      <button @click="prev()">prev</button>
      <button @click="next()">next</button>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      query: "",
      pics: [],
      currentPic: 0,
    };
  },
  methods: {
    fetchData() {
      const apiKey = "Ky9mSDGPnp2nnE9bUa2TyaeMlnoUpsDEqGWQh24B";
      const url =
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
      axios.get(url).then((response) => {
        this.items = response.data.near_earth_objects;
        // console.log(this.items);
      });
    },
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
  mounted() {
    this.fetchData();
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
.data {
  width: 50%;
}
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
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}
.one {
  border: 1px solid red;
  width: 200px;
  height: 40px;
  margin-right: 10px;
  font-size: 14px;
}
</style>
