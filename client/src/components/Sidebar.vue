<script>
import { mapActions, mapState } from 'pinia';
import { RouterLink } from 'vue-router'
import { useMainStore } from '../stores/main';

export default {
  methods: {
    ...mapActions(useMainStore, ['logOut']),
    redirectToPreviousPage() {
      window.history.back()
      },
    scrollToAnchor(anchorId) {
      const anchorElement = document.getElementById(anchorId);
      if (anchorElement) {
        this.$router.push({ hash: anchorId }).then(() => {
          const yOffset = -70; 
          const y = anchorElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        });
      }
    }
  },
  computed: {
    ...mapState(useMainStore, ['userPostName', 'userPostPicture'])
  }
}
</script>
<template>
  <section id="sidebar-menu" class="sidebar col-md-2 d-none d-md-block">
    <div class="sidebar-sticky mt-5">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a @click.prevent="redirectToPreviousPage">Back </a>
        </li>
      </ul>
      <img :src="userPostPicture" class="img img-fluid" style="margin-top: 10px; margin-bottom: 15px;">
     
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/home">Dashboard</RouterLink>
          <ul class="nested-ul">
            <li class="nav-item">
              <a @click.prevent="scrollToAnchor('#currently')">Currently Reading</a>
            </li>
            <li class="nav-item">
              <a @click.prevent="scrollToAnchor('#up-next')">Up Next</a>
            </li>
            <li class="nav-item">
              <a @click.prevent="scrollToAnchor('#past')">Past Reads</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/shelf">My Shelf </RouterLink>
        </li>
      </ul>
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/books">Browse Books </RouterLink>
        </li>
      </ul>
      <hr>
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/user">Edit My Profile</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/" @click="logOut">Log Out </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.sidebar {
  background-color: black;
  color: #fff;
}

.sidebar .nav-item {
  color: #fff;
  margin-top: 5px;
  margin-bottom: 2px;
}

.sidebar .active {
  background-color: #555;
}

.nested-ul {
  list-style-type: none;
  margin-left: 20px;
  /* Adjust the indentation as needed */
  padding-left: 0;
}

.nested-ul li {
  margin-bottom: 5px;
  /* Add spacing between list items */
}
a {
  font-family: var(--second-font);
  letter-spacing: 0.5px;
}
</style>