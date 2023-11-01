<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main'

export default {
    props: ['perBook'],
    methods: {
        ...mapActions(useMainStore, ['addToShelf', 'getBookDetails']),

    }
}

</script>
<template>
    <div class="col-md-4">
        <div class="book-card text-center"><img
                :src="`https://books.google.com/books/publisher/content/images/frontcover/${perBook.id}?fife=w400-h600&source=gbs_api`"
                class="img-responsive w-100" alt="book cover" style="height:400px; width: 300px;">
            <div class="book-content">

                <div v-if="perBook.volumeInfo.authors">
                    <div class="book-description">{{ perBook.volumeInfo.title }} by {{ perBook.volumeInfo.authors[0] }}
                    </div>
                </div>
                <div v-else>
                    <div class="book-description">{{ perBook.volumeInfo.title }}</div>
                </div>
            </div>
            <div class="row justify-content-center" style="padding: 15px">
                <div class="container-fluid" style="margin-left:-15px">
                    <button class="btn btn-info" style="border-color: #33C1C7; margin-right: 10px; margin-left: 20px;"
                        @click.prevent="addToShelf(perBook.volumeInfo.title, perBook.volumeInfo.authors[0], perBook.volumeInfo.description, perBook.volumeInfo.pageCount, perBook.volumeInfo.categories[0], perBook.id, perBook.volumeInfo.industryIdentifiers[0].identifier)">Read
                        Later</button>
                    <button class="btn btn-outline-info" style="border-color: #33C1C7;"
                        @click.prevent="getBookDetails(perBook.volumeInfo.industryIdentifiers[0].identifier)">More</button>
                </div>

            </div>
        </div>
</div></template>