<script>
import { mapActions, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
    methods: {
        ...mapActions(useMainStore, ['sendMessage']),
        

        formatDate(date) {
            const thedate = new Date(date)
            return new Intl.DateTimeFormat('en-GB', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}).format(thedate)
        }
    }
    , computed: {
        ...mapWritableState(useMainStore, ['userPost', 'userPostName'])
    },
    props: ['threadPost']
}


</script>
<template>
    <div class="be-comment">
        <div class="disc-sender-img">
            <a href="blog-detail-2.html">
                <img :src="threadPost.sender.pic" alt="" class="disc-sender-avatar">
            </a>
        </div>
        <div class="disc-details">

            <span class="disc-sender-name">
                {{ threadPost.sender.name }}
            </span>
            <span class="disc-send-name">
                <i class="fa fa-clock-o"></i>
                {{ this.formatDate(threadPost.createdAt) }}
            </span>

            <p class="disc-text">
               {{threadPost.content}}
            </p>
        </div>
    </div>
</template>
<style>

a {
    color: #33C1C7
}

.discussion-block {
    margin-bottom: 50px !important;
    border-radius: 2px;
    padding: 50px 70px;
}

.discussion-title {
    font-size: 16px;
    color: #33C1C7;
    margin-bottom: 15px;
}

.disc-sender-img {
    width: 60px;
    height: 60px;
    float: left;
    margin-bottom: 15px;
    padding-top: 20px
}

.disc-sender-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.disc-details {
    margin-left: 80px;
}

.disc-details span {
    display: inline-block;
    width: 50%;
    margin-bottom: 5px;
}

.disc-sender-name {
    font-size: 13px;
    color: #33C1C7
}

.disc-send-name {
    text-align: right;
}

.disc-send-name {
    font-size: 11px;
    color: #b4b7c1;
}

.disc-text {
    font-size: 13px;
    line-height: 18px;
    color: #7a8192;
    display: block;
    background: #f6f6f7;
    border: 1px solid #edeff2;
    padding: 15px 20px 20px 20px;
}
</style>