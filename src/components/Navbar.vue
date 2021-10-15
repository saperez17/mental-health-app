<template>
  <b-navbar id="navbar-brand" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#" to="/">
      <router-link to="/">MindCalm</router-link>
      <!-- MindCalm -->
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item v-if="!userId" href="#">
            <router-link to="/signup">Login</router-link>
          </b-nav-item>
          <b-nav-item v-if="userId" href="#">
            <span @click="goProfileHandler">
              <b-icon-person-circle></b-icon-person-circle>
            </span>
          </b-nav-item>
          <b-nav-item v-if="userId" href="#">
            <b-icon-door-open-fill
              @click="logoutHandler"
            ></b-icon-door-open-fill>
          </b-nav-item>
          <b-nav-item v-if="!userId" href="#">Signup</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { getFromLocal, removeFromLocal } from "@/utils/localStorage";
export default {
  name: "Navbar",
  computed: {
    userId() {
      const userId = this.$store.state.user || getFromLocal("user");
      return userId;
    },
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("setUser", null);
      removeFromLocal("user");
    },
    goProfileHandler() {
      this.$router.push({ name: `Profile`, params:{id: `${this.userId.user.id}`} });
    },
  },
  mounted() {
    console.log("user store", this.$store.state.user);
  },
};
</script>

<style scoped>
#navbar {
  background-color: #c5adff !important;
  /* background-color:#3301a8 !important; */
}
#navbar-brand {
}
.bg-info {
  background-color: #deceff !important;
}
.router-link-exact-active,
.nav-link,
.nav-item {
  color: #9401dd !important;
}

.navbar-collapse,
.collapse,
.navbar-nav,
.ml-auto,
.nav-item {
  background-color: #deceff !important;
}
</style>
