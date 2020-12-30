<template>
  <div class="list">
    <div class="list__items">
      <span class="cell cell--head">Name</span>
      <div class="cell"> 
        <span class="cell--head-sort">km min</span>
        <div>
          <button @click="sortMinByMin" class="cell__btn">min</button>
          <button @click="sortMinByMax" class="cell__btn">max</button>
        </div>
      </div>
      <div class="cell"> 
        <span class="cell--head-sort">km max</span>
        <div>
          <button @click="sortMaxByMin" class="cell__btn">min</button>
          <button @click="sortMaxByMax" class="cell__btn">max</button>
        </div>
      </div>
      <span class="cell cell--head">date</span>
    </div>
    <div v-for="(item, index) in paginatedData" :key="index" class="list__item">
      <div class="cell">
        <span>{{ item.name_limited }}</span>
      </div>
      <div class="cell">
        <span>{{
          item.estimated_diameter.kilometers.estimated_diameter_min
        }}</span>
      </div>
      <div class="cell">
        <span>{{
          item.estimated_diameter.kilometers.estimated_diameter_max
        }}</span>
      </div>
      <div class="cell">
        <span>{{ item.close_approach_data[0].close_approach_date }}</span>
      </div>
    </div>
    <button @click="prevPage" :disabled="pageNumber === 0" class="list__pagination">влево</button>
    <button @click="nextPage" :disabled="pageNumber >= pageCount - 1" class="list__pagination">
      вправо
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "List",
  data() {
    return {
      pageNumber: 0,
      size: 8,
    };
  },
  computed: {
    ...mapGetters(["ITEMSDATA"]),
    pageCount() {
      return Math.ceil(this.ITEMSDATA.length / this.size);
    },
    paginatedData() {
      return this.ITEMSDATA.slice(
        this.pageNumber * this.size,
        this.pageNumber * this.size + this.size
      );
    },
  },
  methods: {
    ...mapActions(["GET_ITEMS_FROM_API"]),
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    sortMinByMin(){
      return this.ITEMSDATA.sort((a,b) => a.estimated_diameter.kilometers.estimated_diameter_min - b.estimated_diameter.kilometers.estimated_diameter_min)
    },
    sortMinByMax(){
      return this.ITEMSDATA.sort((a,b) => b.estimated_diameter.kilometers.estimated_diameter_min - a.estimated_diameter.kilometers.estimated_diameter_min)
    },
    sortMaxByMin(){
      return this.ITEMSDATA.sort((a,b) => a.estimated_diameter.kilometers.estimated_diameter_max - b.estimated_diameter.kilometers.estimated_diameter_max)
    },
    sortMaxByMax(){
      return this.ITEMSDATA.sort((a,b) => b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max)
    }
  },
  mounted() {
    this.$store.dispatch("GET_ITEMS_FROM_API");
  },
};
</script>  
<style lang="scss">
.list {
  width: 50%;
  height: 80vh;
  &__items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    margin-bottom: 10px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
  &__pagination{
    width: 70px;
    height: 30px;
    outline: none;
    border: none;
    background: #00CC66;
    cursor: pointer;
    margin-right: 20px;
  }
}
.cell {
  min-width: 100px;
  width: 25%;
  height: 40px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &__btn{
    width: 40%;
    height: 20px;
    outline: none;
    border: none;
    background: #00CC66;
    cursor: pointer;
    margin-right: 5%;
    margin-left: 5%;
  }
  &--head{
    height: 40px;
    font-weight: 700;
    text-align: center;
  }
  &--head-sort{
    height: 20px;
    font-weight: 700;
    text-align: center;
  }
}
</style>