<script>
import { mapActions, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main';
import { RouterLink } from 'vue-router'
export default{
    computed: {
        ...mapWritableState(useMainStore, ['registerEmail', 'registerName', 'registerPassword'])
    },
    methods: {
        ...mapActions(useMainStore, ['register'])
    }
}
</script>
<template>
     <div class="logo">
          <RouterLink to="/"> <img src="../assets/icon.png" alt="shelf"></RouterLink>
</div>
        <div class="login-form container w-50 shadow mt-4 p-4">
    <form @submit.prevent ="register(registerName, registerEmail, registerPassword)">
        <h1 class="text-center mt-n4 mb-5" style="font-family: var(--second-font)">Register to Books App</h1>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="registerName">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="registerEmail">
      </div>
      <div class="mb-4">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="registerPassword">
      </div>
      <hr>
      <div class="text-center">
        <button type="submit" class="btn btn-info">Register</button>
      </div>
      <p style="color: grey;" class="mt-3">Already have an account? <RouterLink to="/login"><span>Sign in.</span></RouterLink></p>
     
    </form>
  </div>
</template>

<style scoped>
body {
    background-color: #343a40;
}
p {
    color: #fff
}
span {
    color: #33C1C7
}
.form-label  {
    color: #fff
}


.logo {
  position: relative;
  width: 100%;
  height: 100px; 
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}
</style>