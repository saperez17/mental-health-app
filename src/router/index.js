import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
// import Navbar from '@/components/Navbar'
// import Home from '@/views/Home'
import UserAuth from "@/views/UserAuth";
import Landing from "@/views/Landing";
import Profile from "@/views/Profile";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/signup",
      name: "Signup",
      component: UserAuth,
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile 
    },
    {
      path: "/profile",
      component: Profile,
    },
   
    {
      path: "/",
      name: "Landing",
      component: Landing,
    },
  ],
});
