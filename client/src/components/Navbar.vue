<script>
import { mapActions } from 'pinia';
import { RouterLink } from 'vue-router'
import { useMainStore } from '../stores/main';

export default{
  methods: {
    ...mapActions(useMainStore, ['logOut'])
  }, computed: {
    isLoggedIn(){
      return localStorage.access_token
    }
  }
}

</script>
<template>
   <nav class="custom-navbar navbar navbar-expand-lg navbar-dark">

    <RouterLink class="navbar-brand" to="/">
      Books
    </RouterLink> 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <RouterLink to="/books" class="nav-link">Home<span class="sr-only">(current)</span></RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/shelf" class="nav-link">My Shelf</RouterLink>
      </li>
      <div v-if="!isLoggedIn">
      <li class="nav-item">
        <RouterLink to="/login" class="nav-link">Log In</RouterLink>
      </li>
    </div>
    <div v-if="!isLoggedIn">
      <li class="nav-item">
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </li>
    </div>
   
    <div v-if="isLoggedIn">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link" @click="logOut">Log Out</RouterLink>
      </li>
    </div>
    </ul>
  </div>
</nav>
</template>
<style>
.custom-navbar {
  color: #fff; 
}

</style>