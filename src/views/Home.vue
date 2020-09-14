<template>
  <div class="home">
    <div class="home__content">
      <template v-if="isLoggedIn">
        <h3 class="username">ようこそ! {{ user.userName }}さん</h3>
        <img :src="user.photoURL" alt="User Profile Image" class="avatar" />
        <div class="router">
          <router-link :to="{ name: 'edit' }">
            プロフィール画面へ
          </router-link>
        </div>
        <div v-on:click="logOut">log out</div>
      </template>
      <template v-else>
        <Login />
      </template>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// Components
import Login from "@/components/Login.vue"

export default {
  name: "Home",
  props: {
    user: Object
  },
  components: {
    Login
  },
  computed: {
    isLoggedIn() {
      if (this.user) {
        return true
      }
      return false
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>
<style lang="scss">
.home {
  width: 100%;
  min-height: 950px;
  position: relative;
  background-image: url("../assets/LifeDesign.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  * {
    padding: 0;
    margin: 0;
  }
  .home__content {
    width: 250px;
    height: 300px;
    padding: 20px;
    position: absolute;
    border-radius: 20px;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.4);
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    background: rgba(255, 255, 255, 0.7);
    .username {
      padding: 20px;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .router {
      padding: 20px;
      color: #2c3e50;
      a {
        font-size: 20px;
      }
    }
  }
}
</style>
