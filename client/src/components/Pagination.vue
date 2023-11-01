<script>
import { mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';


export default{
    props: ['currentPageNumber'],
    computed: {
      ...mapWritableState(useMainStore, ['currentPage'])
    }
}

</script>

<template>
    <li class="page-item">
      <a class="page-link" @click.prevent="this.$emit('navClicked', currentPageNumber)" >{{ currentPageNumber }}</a>
    </li>

</template>