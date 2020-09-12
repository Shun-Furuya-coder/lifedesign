<template>
  <div class="login">
    <div>
      <div v-on:click="login">Log in</div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
      this.$router.push("/profile/edit");
    }
  }
};
</script>
<style lang="scss">
.login {
  width: 100%;
  min-height: 800px;
  background-image: url("../assets/LifeDesign.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
