<template>
  <div id="app">
    <Myheader />
    <router-view :user="user" />
  </div>
</template>

<script>
import firebase from "firebase";
// Components
import Myheader from "@/components/Myheader.vue";

export default {
  components: {
    Myheader
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    authState() {
      // Auth
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.uid);
          userRef.get().then(userDoc => {
            if (!userDoc.exists) {
              // DB 新規登録
              userRef.set({
                userName: "",
                bio: "こんにちわ",
                lifeDesign: [],
                age: 20,
                birth: {
                  year: 2000,
                  month: 1,
                  day: 1
                },
                follow: [],
                follower: [],
                userImageURL: user.photoURL
              });
            } else {
              // DB すでに存在
              this.user = {
                ...user,
                ...userDoc.data()
              };
              console.log(this.user);
            }
          });
        } else {
          this.user = null;
        }
      });
    }
  },
  created() {
    this.authState();
  }
};
</script>
<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
