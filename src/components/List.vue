<template>
  <div class="list">
    <div class="list__items">
      <span class="cell">Name</span>
      <span class="cell">km min</span>
      <span class="cell">km max</span>
      <span class="cell">date</span>
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
    <button @click="prevPage" :disabled="pageNumber === 0">влево</button>
    <button @click="nextPage" :disabled="pageNumber >= pageCount - 1">
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
  },
  mounted() {
    this.$store.dispatch("GET_ITEMS_FROM_API");
  },
};
</script>  
<style lang="scss">
.list {
  width: 50%;
}

.list__items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}
.list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}
.cell {
  border: 1px solid red;
  min-width: 100px;
  width: 100px;
  height: 40px;
  font-size: 14px;
}
</style>