<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import Swal from 'sweetalert2/dist/sweetalert2'

export default {
    computed: {
        ...mapWritableState(useMainStore, ['userPostName', 'userProfilePic'])
    },
    methods: {
        ...mapActions(useMainStore, ['editUserProfile']),
        handleFileUpload(event) {
            let file = event.target.files[0]
            if (file.type === "image/jpeg" || file.type === 'image/png') {
                const data = new FormData()
                data.append("file", file)
                data.append("upload_preset", "booksapp")
                data.append("cloud_name", "dcwqwzrxx")
                fetch("https://api.cloudinary.com/v1_1/dcwqwzrxx/image/upload", {
                    method: 'POST',
                    body: data
                }).then((res) => res.json())
                    .then((data) =>
                        this.userProfilePic = data.url.toString()
                    ).then((data) => {
                        console.log(data)
                        Swal.fire({
                            title: 'Success!',
                            text: 'Picture is uploaded',
                            confirmButtonColor: '#33C1C7',
                            background: '#000000',
                            color: '#ffffff',
                        })
                    })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: `This is not a picture.`,
                    confirmButtonColor: '#33C1C7',
                    background: '#000000',
                    color: '#ffffff',
                })
            }
        },
        redirectToPreviousPage() {
            this.$router.go(-1)
        }
    }
}

</script>
<template>
    <div class="login-form container w-50 shadow mt-4 p-4">
        <form @submit.prevent="editUserProfile(userPostName, userProfilePic)">
            <h1 class="text-center" style="font-family: var(--second-font)">Edit your profile details</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="userPostName">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Profile Picture</label>
                <input type="file" class="form-control" accept="image/*" @change="handleFileUpload">
                <span class="clue">Please wait for the success message to show that we have received your image before
                    pressing submit.</span>
            </div>
            <hr>
            <div class="row justify-content-center">
                <button type="submit" class="btn btn-outline-info mr-2">Submit</button>
                <button type="button" class="btn btn-outline-light ml-2"
                    @click.prevent="redirectToPreviousPage">Cancel</button>
            </div>
        </form>
    </div>
</template>
<style>
p {
    color: #fff
}

span {
    color: #33C1C7
}

.clue {
    font-size: 10px
}

.form-label {
    color: #fff
}
</style>