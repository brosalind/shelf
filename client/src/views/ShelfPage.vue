<script>
import Sidebar from '../components/Sidebar.vue'
import ShelfCard from '../components/ShelfCard.vue'
import { mapActions, mapState } from 'pinia';
import {useMainStore} from '../stores/main'
import { RouterLink } from 'vue-router'
export default{
    components: {
        Sidebar,
        ShelfCard
    },
    computed: {
        ...mapState(useMainStore, ['allShelf'])
    },
    methods: {
        ...mapActions(useMainStore, ['getAllShelf'])
    },
    created(){
        this.getAllShelf()
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
        <Sidebar />
<div class="col">
    <div class="container">
        <h1 style="font-family: var(--second-font);padding-top: 30px;">Your Collection</h1>

        <hr>
        <div v-if="allShelf.length>0">
    <div class="row">
  
  <ShelfCard v-for="item in allShelf" :key="item._id" :currentShelfItem="item"/>
</div>
    
</div>

<div v-else>
            <RouterLink to="/books"><span>Add a New Book To Your Shelf!</span></RouterLink>
 </div>


</div>

  
</div>

    </div>
   


</div>
</template>

<style>
span {
    color: #33C1C7
}
</style>