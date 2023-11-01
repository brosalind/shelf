<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import NoteCard from '../components/NoteCard.vue';
import Sidebar from '../components/Sidebar.vue'

export default {
    computed: {
        ...mapState(useMainStore, ['userBookDetail', 'bookNotes']),

    },
    components: {
        Sidebar,
        NoteCard
    },
    methods: {
        ...mapActions(useMainStore, ['getShelfBookDetail', 'getBookDetails']),
        addNotes(id) {
            this.$router.push(`/notes/add/${id}`)
        }
    },
    created() {
        this.getShelfBookDetail(this.$route.params.id)
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <Sidebar />
            <div class="col">
                <hr>
                <div v-if="userBookDetail == null">
                    <p class="text-center">loading...</p>
                </div>

                <div v-else>
                    <div class="container">
                        <h1 class="text-center mb-10" style="color:#33C1C7; font-family: var(--second-font)">{{ userBookDetail.title }}</h1>
                        <div class="row">
                            <div class="col-sm-4">
                                <img :src="`https://books.google.com/books/publisher/content/images/frontcover/${userBookDetail.cover}?fife=w400-h600&source=gbs_api`"
                                    class="img-fluid img-thumbnail w-100" alt="book cover">
                            </div>
                            <div class="col-sm-8">
                                <p>Synopsis: {{ userBookDetail.description }}</p>
                                <p>Genre: {{ userBookDetail.genre }}</p>
                                <p>Page Count: {{ userBookDetail.pageCount }}</p>
                                <div class="row">
                                    <div class="col-3">
                                        <button class="btn btn-outline-info" type="button"
                                            @click.prevent="addNotes(userBookDetail._id)">Add Notes</button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-outline-info" type="button"
                                            @click.prevent="getBookDetails(userBookDetail.isbn)">Join Book
                                            Discussion</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr>
                        <div v-if="bookNotes.length === 0">
                        </div>
                        <div v-else>
                            <h2 style="font-family: var(--second-font);"> book notes</h2>
                            <div class="row">
                                
                                <NoteCard v-for="note in bookNotes" :key="note._id" :currentNote="note" />
                               
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
h2,
span {
    color: #33C1C7
}

p {
    color: white
}

span {
    font-size: 19px;
}


</style>