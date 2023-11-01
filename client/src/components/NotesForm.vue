<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import Sidebar from './Sidebar.vue';
import { useMainStore } from '../stores/main';
export default {
    components: {
        Sidebar
    },
    computed: {
        ...mapWritableState(useMainStore, ['noteTitle', 'noteText'])
    },
    methods: {
        ...mapActions(useMainStore, ['addNotes']),
        redirectToPreviousPage() {
            this.$router.go(-1)
        }

    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <Sidebar />
            <div class="col">
                <div class="col p-5 text-left">
                    <div class="form-signin m-auto">
                        <div>
                            <form class="form-block" @submit.prevent="addNotes(noteTitle, noteText, this.$route.params.id)">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-6">
                                        <input class="form-input" type="text" placeholder="Note title" v-model="noteTitle" style="background-color: transparent; border: 1px solid white; color: white; width: 500px; height: 50px; padding: 15px">

                                    </div>
                                </div>
                                <div class="form-group" style="padding-top: 30px">
                                    <textarea class="form-input" required="" placeholder="Your text"
                                        v-model="noteText" style="background-color: transparent; border: 1px solid white; color: white;  border-radius: 0;"></textarea>
                                </div>
                                <div class="row justify-content-align-left col-sm-6" style="margin-top: 30px">
                                    <button class="btn btn-outline-info mr-2" style="border-color: #33C1C7"
                                        type="submit">Submit</button>
                                    <button type="button" class="btn btn-outline-light ml-2"
                                        @click.prevent="redirectToPreviousPage">Cancel</button>

                                </div>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
p {
    color: #fff
}

span {
    color: #33C1C7
}

label {
    color: #fff
}

.label {
    color: #fff
}</style>