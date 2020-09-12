import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Edit from "../views/Edit.vue";
import Users from "../views/Users.vue";
import User from "../views/User.vue";
import Follow from "../views/Follow.vue";
import Follower from "../views/Follower.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/profile/edit",
    name: "edit",
    component: Edit
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/user/:id",
    name: "User",
    component: User
  },
  {
    path: "/user/:id/follow",
    name: "Follow",
    component: Follow
  },
  {
    path: "/user/:id/follower",
    name: "Follower",
    component: Follower
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
