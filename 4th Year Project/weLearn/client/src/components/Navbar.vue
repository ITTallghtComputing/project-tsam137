<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <li class="nav-item" v-if="isLoggedIn">
      <router-link class="navbar-brand" to="/list">
      <span><img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/graduation-cap_1f393.png"
                  alt="Kitten"
                  width="25"
                  height="25"
                  style="position: relative;"
                /></span> weLearn</router-link>
    </li>
    <li class="nav-item" v-else-if="!isLoggedIn">
      <router-link class="navbar-brand" to="/">
      <span><img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/graduation-cap_1f393.png"
                  alt="Kitten"
                  width="25"
                  height="25"
                  style="position: relative;"
                /></span>
       weLearn</router-link>
    </li>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/list" class="nav-link"><span class="fa fa-users"></span> Show Profiles</router-link>
        </li>
        <li class="nav-item" v-if="user._id == '5fcd335aba244d058e44c002'">
          <router-link to="/admin" class="nav-link"> <span class="fa fa-wrench"></span> Admin Profiles</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/profile" class="nav-link"> <span class="	fa fa-user-circle"></span> My Profile</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/room" class="nav-link"> <span class="	fa fa-comments"></span> Chatrooms</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn && !(user.premium)">
          <!-- <li class="nav-item" v-if=""> -->
          <router-link :to="{ name: 'premium', params: { id: user._id, premium: user.premium } }" class="nav-link">
            <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/crown_1f451.png"
                  alt="Kitten"
                  width="25"
                  height="25"
                  style="position: relative; top: -5px"
                />
             Premium</router-link>
          
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a to="/logout" class="nav-link" @click.prevent="logoutUser"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style>
.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show > .nav-link {
  color: rgba(255, 255, 255, 0.5);
}
</style>
