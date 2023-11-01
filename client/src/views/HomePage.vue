<script>
import Sidebar from '../components/Sidebar.vue'
import ShelfCard from '../components/ShelfCard.vue'
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main'
import { RouterLink } from 'vue-router'
export default {
  components: {
    Sidebar,
    ShelfCard
  },
  computed: {
    ...mapState(useMainStore, ['recentReads', 'shelf', 'completedShelf', 'currentShelf', 'userPostName', 'userPostPicture'])
  },
  methods: {
    ...mapActions(useMainStore, ['getMyShelf', 'getCompletedBooks', 'getCurrentBooks'])
  },
  created() { 
    this.getMyShelf()
    this.getCompletedBooks()
    this.getCurrentBooks()
  }
}


</script>

<template>
  <div class="container">
    <div class="row">
      <Sidebar />
      <div class="col">

        <div class="col-12">
          <h1 style="font-family: var(--second-font); padding-top: 30px;">Welcome back, {{ userPostName }}.</h1>

<hr>
          <div class="row">
            <div class="col-4">
              <p class="ft-num">{{ currentShelf.length }}</p>
              <p class="text-center ft-heading">currently reading</p>
            </div>
            <div class="col-4">
              <p class="ft-num">{{ shelf.length }}</p>
              <p class="text-center ft-heading">want to read</p>
            </div>
            <div class="col-4">
              <p class="ft-num">{{ completedShelf.length }}</p>
              <p class="text-center ft-heading">finished</p>
            </div>
          </div>
          <hr>
        </div>

        <div class="container">

          <div v-if="currentShelf.length > 0" style="margin-bottom: 30px;">
            <h2 id="#currently" style="font-family: var(--second-font)">Currently Reading...</h2>
            <div class="row">
              <ShelfCard v-for="item in currentShelf" :key="item._id" :currentShelfItem="item" />
            </div>
          </div>

          <div v-if="shelf.length > 0" style="margin-bottom: 30px;">
            <h2 id="#up-next" style="font-family: var(--second-font)">Up Next...</h2>
            <div class="row">
              <ShelfCard v-for="item in recentReads" :key="item._id" :currentShelfItem="item" />
            </div>
          </div>

          <div v-if="completedShelf.length > 0" style="margin-bottom: 30px;">
            <h2 id="#past" style="font-family: var(--second-font)">Past Reads...</h2>
            <div class="row">
              <ShelfCard v-for="item in completedShelf" :key="item._id" :currentShelfItem="item" />
            </div>
          </div>

          <div v-else>
            <RouterLink to="/books"><span style="font-family: var(--second-font)">Add a New Book To Your Shelf!</span>
            </RouterLink>
          </div>


        </div>
</div>
</div>


  </div>
</template>

<style>
h2 {
  margin-bottom: 15px;
}
</style>
