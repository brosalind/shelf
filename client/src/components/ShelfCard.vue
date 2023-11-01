<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
    props: ['currentShelfItem'],
    methods: {
        ...mapActions(useMainStore, ['removeFromShelf', 'getShelfBookDetail', 'changeBookToCurrent', 'changeBookToFinish', 'changeBookToRead'])
    }
}
</script>
<template>

    <div class="col-md-2" style="margin-bottom: 20px;">
        <div class="shelf-card text-center"><img
                :src="`https://books.google.com/books/publisher/content/images/frontcover/${currentShelfItem.cover}?fife=w400-h600&source=gbs_api`"
                class="img-responsive w-100" alt="book cover" style="width: 100px; height: 180px">
            <div class="shelf-content">
               
                    <div class="shelf-description">{{ currentShelfItem.title }} by {{ currentShelfItem.author }}
                </div>
            </div>
            <div class="row justify-content-center" style="padding: 15px">
                <div class="container-fluid" style=" display: flex;
    justify-content: space-around;">
                    <a @click.prevent="removeFromShelf(currentShelfItem._id)"><img src="../assets/icons/close-line-icon delete.png" style="width: 20px;height:20px" title="Remove"></a>
                    <a @click.prevent="getShelfBookDetail(currentShelfItem._id)"><img src="../assets/icons/angle-circle-right-icon.png" style="width: 20px;height:20px" title="Read More"></a>
                   
                    
                    <a v-if="currentShelfItem.status==='Current'" @click.prevent="changeBookToFinish(currentShelfItem._id)"><img src="../assets/icons/check-mark-line-icon done.png" style="width: 20px;height:20px" title="Mark as Finished"></a>


                    <a v-if="currentShelfItem.status==='To Read'" @click.prevent="changeBookToCurrent(currentShelfItem._id)"><img src="../assets/icons/book-open-icon currently reading.png" style="width: 20px;height:20px" title="Start Reading"></a>

                            
                </div>

            </div>
        </div>
</div>


</template>

<style>
p {
    color: white
}


.shelf-card {
    max-width: 160px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border: 1px solid white;
}


.shelf-card img {
    transition: all 0.25s linear;
}

.shelf-content {
    height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
}

.shelf-description {
    color: white;
    font-weight: normal;
    font-size: 9.5px;
    height: 100%; 
    text-align: center; 
    overflow: hidden;
}

.shelf-card a title{
    color: black
}


</style>