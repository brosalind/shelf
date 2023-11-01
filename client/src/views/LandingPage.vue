<script>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="row no-gutters" style="height:800px">
    <div class="col no-gutters">

      <RouterLink to="/">
        <img src="../assets/iconbooks.png" alt="logo"
          style="position: absolute; top:0; left:20px; right:100px; height:10%">

      </RouterLink>
      <img src="../assets/books21.png" class="img-fluid w-100">

    </div>
    <div class="col-6" style="background-color: black; ">

      <div class="container-fluid gx-5" style="padding-top: 30px; padding-left: 30px">

        <RouterLink to="/books">

          <button class="btn btn-outline-light" style="float:right; margin-left: 50%;">Browse the Collection</button>
        </RouterLink>

        <span class="text-center mt-20" style="margin-top: 20%; font-family: var(--second-font); letter-spacing: 1px;">
          Say hello to
        </span>
        <h1 class="text-center mt-20" style="font-size: 100px; margin-top: 20%">
          Your New Home for Books and Knowledge
        </h1>

      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center vh-100" style="width: 1265px">
    <div class="row vw-100 no-gutters">
      <div class="col no-gutters">
        <p class="ft-num">01</p>
        <p class="text-center ft-heading">discove new books</p>
        <p class="text-center" style="font-family: var(--first-font);color: white; letter-spacing: 2px; font-size: 12px">find your new favorite read</p>
      </div>
      <div class="col">
        <img src="../assets/discover.png" style="width: 600px">
      </div>
    </div>
    </div>
    <div class="d-flex justify-content-center  align-items-center" style="height: 500px; width: 1265px">
    <div class="row vw-100 no-gutters">
      <div class="col-6">
        <img src="../assets/track.png" style="width: 600px; margin-left: 40px; margin-top: -80px;">
      </div>
      <div class="col">
        <p class="ft-num">02</p>
        <p class="text-center ft-heading">track your reading progress</p>
        <p class="text-center" style="font-family: var(--first-font);color: white; letter-spacing: 2px; font-size: 12px">set your own reading goals & meet them</p>
      </div>
    </div>
    </div>
    <div class="d-flex justify-content-center  align-items-center vh-100" style=" width: 1265px">
    <div class="row no-gutters vw-100">
      <div class="col-6" >
        <p class="ft-num">03</p>
        <p class="text-center ft-heading">take notes on your favorite book</p>
        <p class="text-center" style="font-family: var(--first-font);color: white; letter-spacing: 2px; font-size: 12px">never lose an insight again</p>
      </div>
      <div class="col-6" >
        <img src="../assets/notes.png" style="width: 600px; margin-top: -80px; margin-left: -40px">
      </div>
    </div>
    </div>
    <div class="d-flex justify-content-center  align-items-center" style="width: 1265px">
    <div class="row no-gutters vw-100">
      <div class="col-6">
        <img src="../assets/discussion.png" style="width: 600px; margin-left: 50px; margin-top: -80px">
      </div>
      <div class="col-6">
        <p class="ft-num">04</p>
        <p class="text-center ft-heading">join the discussion</p>
        <p class="text-center" style="font-family: var(--first-font);color: white; letter-spacing: 2px; font-size: 12px">and make your own circle</p>
      </div>
    </div>
    </div>

    <div class="container" style="margin-top: 300px;">

  <footer class="custom-footer footer text-light">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5 style="font-family: var(--second-font)">Shelf Inc.</h5>
          <p style="color: grey; font-family: var(--second-font)">&copy; 2023 Shelf Inc.</p>
          <p> simplify your reading. no bs.</p>
        </div>
        <div class="col-md-6">
          <h5 style="font-family: var(--second-font)">Quick Links</h5>
          <div class="row">
            <div class="col-md-6">
              <ul class="list-unstyled">
                <li>
                  <RouterLink to="/">About</RouterLink>
                </li>
                <li>
                  <RouterLink to="/books">App</RouterLink>
                </li>
                <li>
                  <RouterLink to="/contact">Contact</RouterLink>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="list-unstyled">
                <li>
                  <RouterLink to="/register">Register</RouterLink>
                </li>
                <li>
                  <RouterLink to="/login">Log In</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

    </div>

</template>

<style>
body {
  margin: 0;
  padding: 0
}

span,
h1 {
  color: white
}

.custom-footer {
  background-color: black;
  color: #fff;
}
</style>
