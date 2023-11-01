<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
    props: ['currentNote']
}
</script>
<template>
    <div class="col-md-6" style="margin-bottom: 10px;">
        <div class="card custom-card">
            <div class="card-body custom-card-body">
                <div class="scrollable-text" style="height: 200px; overflow-y: auto;">
                    <p class="note-title">{{ currentNote.title }} </p>
                    <p class="note-text">{{ currentNote.note }}</p>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.custom-card {
    border: 2px solid white;
    background-color: transparent;
}


.custom-card-body {
    background-color: transparent;
}

.note-title {
    font-size: 15px;
    color: #33C1C7;
    font-family: var(--second-font);
}
.note-text{
    font-size: 12px;
    color: white
}
</style>