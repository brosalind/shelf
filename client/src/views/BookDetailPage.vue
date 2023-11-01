<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import Navbar from '../components/Navbar.vue';
import DiscussionThread from '../components/DiscussionThread.vue';

// let serverUrl = 'https://books-production-ac91.up..app'
let serverUrl = 'http://localhost:3000'

import io from 'socket.io-client'
const socket = io(serverUrl)

export default {
    computed: {
        ...mapWritableState(useMainStore, ['currentBook', 'userPost', 'isLoggedIn', 'userPostName', 'userPostEmail', 'userPostPicture']),
        ...mapState(useMainStore, ['discussionPosts'])
    },
    components: {
        Navbar,
        DiscussionThread
    },
    methods: {
        ...mapActions(useMainStore, ['getBookDetails', 'addToShelf', 'sendMessage', 'getDiscussionThread'])
    },
    created() {
        this.getBookDetails(this.$route.params.id)
        this.userPostEmail = localStorage.email
        this.userPostName = localStorage.name
        this.getDiscussionThread(this.$route.params.id)
        if (localStorage.access_token) {
            this.isLoggedIn = true
        }
    },

    mounted() {
        socket.on("hello", text => {
            console.log("hello", text)
            this.discussionPosts.push({
                content: text,
                sender: {
                    name: this.userPostName,
                    pic: this.userPostPicture
                },
                createdAt: new Date()
            })
            this.userPost = ''
        })
    }
}
</script>
<template>
    <Navbar />
    <div v-if="currentBook == null" class="d-flex justify-content-center align-items-center vh-100">
        <p class="text-center" style="font-size: large; font-weight: bold;">loading...</p>
    </div>

    <div v-else>
        <div class="container" style="margin-top: 20px;">
            <h1 class="text-center mb-10" style="color:#33C1C7; font-family: var(--second-font); margin-top: 50px; margin-bottom: 30px;">{{ currentBook.items[0].volumeInfo.title }}</h1>
            <div class="row">
                <div class="col-sm-4">
                    <img :src="`https://books.google.com/books/publisher/content/images/frontcover/${currentBook.items[0].id}?fife=w400-h600&source=gbs_api`" class="img-fluid img-thumbnail w-100"
                        alt="book cover">
                </div>
                <div class="col-sm-8">
                    <p>Synopsis: {{ currentBook.items[0].volumeInfo.description }}</p>
                    <p>Genre: {{ currentBook.items[0].volumeInfo.categories[0] }}</p>
                    <p>Page Count: {{ currentBook.items[0].volumeInfo.pageCount }}</p>
                    <button class="btn btn-outline-info" type="button"
                        @click.prevent="addToShelf(currentBook.items[0].volumeInfo.title, currentBook.items[0].volumeInfo.authors[0], currentBook.items[0].volumeInfo.description, currentBook.items[0].volumeInfo.pageCount, currentBook.items[0].volumeInfo.categories[0], currentBook.items[0].id, currentBook.items[0].volumeInfo.industryIdentifiers[0].identifier)">Add
                        Book to
                        Shelf</button>
                </div>
            </div>
            <hr>
        </div>

        <div class="container">
            <div class="discussion-block">


                <div v-if="Array.isArray(discussionPosts) && discussionPosts.length > 0">
                    <h2 style="color: #33C1C7; font-family: var(--second-font); font-size:30px" class="text-center">join the discussion</h2>
                    <h1 class="discussion-title">Comments {{ discussionPosts.length }}</h1>
                    <DiscussionThread v-for="post in discussionPosts" :threadPost="post" :key="post.id" />
                </div>

                <div v-else="discussionPosts == 'notFound'">
                    <h2 style="color: #33C1C7" class="text-center">There are no discussions yet on this book. Start the
                        discussion.</h2>
                </div>

                <div style="margin-top: 50px;">
                    <form class="form-block" @submit.prevent="sendMessage(userPost, this.$route.params.id, userPostEmail)">
                        <div class="row" >
                            <div class="col-xs-12 col-sm-6" >
                                <div class="form-group icon" >
                                    <div class="icon"><img :src="this.userPostPicture"></div>
                                    <input class="form-input" type="text" placeholder="Your name" v-model="userPostName"
                                        disabled  style="background-color: black;">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea class="form-input" required="" placeholder="Your text" v-model="userPost" style="background-color: black;"></textarea>
                        </div>
                        <button class="btn btn-outline-info" style="border-color: #33C1C7" type="submit">submit</button>
                    </form>
                </div>
            </div>

        </div>



        <div v-if="!isLoggedIn">
            <p class="text-center">
                <RouterLink to="/register"><span class="text-center">Sign up to contribute.</span></RouterLink>
            </p>

        </div>
    </div>
</template>

<style>
h2,
span {
    color: #33C1C7
}

span {
    font-size: 19px;
}

.form-group .icon {
    position: absolute;
    top: 1px;
    left: 16px;
    width: 48px;
    height: 48px;
    background: #f6f6f7;
    color: #b5b8c2;
    text-align: center;
    line-height: 50px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
}

.form-group .form-input {
    font-size: 13px;
    line-height: 50px;
    font-weight: 400;
    color: #b4b7c1;
    width: 100%;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #edeff2;
    border-radius: 3px;
}

.form-group.icon .form-input {
    padding-left: 70px;
}

.form-group textarea.form-input {
    height: 150px;
}

.icon img {
    margin-top: -5px;
    height: 40px;
    width: 40px
}
</style>