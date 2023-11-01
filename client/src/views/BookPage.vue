<script>
import BookCards from '../components/BookCards.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import Navbar from '../components/Navbar.vue'
import Pagination from '../components/Pagination.vue'

export default {
    components: {
        BookCards,
        Navbar,
        Pagination
    },
    computed: {
        ...mapState(useMainStore, ['books', 'totalPage']),
        ...mapWritableState(useMainStore, ['query', 'currentPage', 'start'])
    },
    methods: {
        ...mapActions(useMainStore, ['getDefaultBooks']),

        sendQuery() {
            if (!this.query) {
                this.query = 'fiction+inpublisher:penguin'
            } else {
                console.log(this.query)
                this.getDefaultBooks()

            }
        },
        changePage(pg){
            this.start = pg * 30 - 30
            this.getDefaultBooks()
        }
    },
    created() {
        this.getDefaultBooks()
    }
}
</script>
<template>
    <Navbar />
    <div class="container text-center mt-3">
        <div class="container fluid">

            <h1 style="font-family: var(--second-font)">search books</h1>
            <form class="my-2 my-lg-0 text-center" @submit.prevent="sendQuery">
                <div class="input-group">

                    <input class="form-control" type="search" placeholder="Search..." aria-label="Search" v-model="query">
                    <span class="input-group-btn">
                        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                    </span>
                </div>
            </form>

        </div>
    </div>
    <hr style="border-top:3px solid white">
    <br />
    <div v-if="books">
    <div class="container">

        <div class="row">
          
            <BookCards v-for="book in books" :perBook="book" />
        </div>
    </div>
</div>

<div v-else>
            <p class="text-center">Loading...</p>
        </div>

    <div class="container text-center">
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <Pagination v-for="index in totalPage" :key="index" :currentPageNumber="index" @navClicked="changePage"/>
    </ul>
    </nav>
</div> 
</template>

<style>
body {
    margin: 0;
    padding: 0
}
    
</style>