<template>
  <div>
    <h1>user Info {{ user.userName }}</h1>
    <div class="main-profile">
      <div class="main-left">
        <div class="photo-box">
          <img :src="user.photoURL" alt="" />
        </div>
        <div class="name-box">
          <h2>
            {{ user.userName }}
          </h2>
          <h4>
            {{ $route.params.id }}
          </h4>
        </div>
      </div>
      <div class="main-right">
        <div class="follow-block">
          <div class="left-follow">
            <h2>Follow</h2>
            <h2 class="text-type">{{ user.follow.length }}</h2>
          </div>
          <div class="right-follower">
            <h2>Follower</h2>
            <h2 class="text-type">{{ user.follower.length }}</h2>
          </div>
        </div>
        <div class="button-block">
          <button class="button-type">フォローする</button>
        </div>
        <div class="bio-block"></div>
      </div>
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
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.user = doc.data();
      });
  }
};
</script>

<style lang="scss">
.main-profile {
  width: 100%;
  height: 400px;
  .main-left {
    width: 30%;
    height: 100%;
    float: left;
    .photo-box {
      width: 150px;
      height: 150px;
      margin-bottom: 6px;
      background: black;
      border-radius: 50%;
      margin: auto;
    }
    .name-box {
      width: 100%;
      height: auto;
    }
  }
  .main-right {
    width: 70%;
    height: 100%;
    float: left;
    .follow-block {
      width: 60%;
      height: 40%;
      float: left;
      .left-follow {
        width: 50%;
        height: 100%;
        float: left;
      }
      .right-follower {
        width: 50%;
        height: 100%;
        float: left;
      }
      .text-type {
        text-align: center;
      }
    }
    .button-block {
      width: 40%;
      height: 40%;
      float: left;
      .button-type {
        border-radius: 30px;
        background-color: blue;
      }
    }
    .bio-block {
      width: 100%;
      height: 60%;
      float: left;
    }
  }
}
</style>
