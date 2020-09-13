<template>
  <div>
    <h1>user Info {{ pageUser.userName }}</h1>
    <div class="main-profile">
      <div class="main-left">
        <!-- <div class="photo-box">
          <img :src="pageUser.userImageURL" alt="" />
        </div> -->
        <img :src="pageUser.userImageURL" alt="" class="photo-box" />
        <div class="name-box">
          <h2>
            {{ pageUser.userName }}
          </h2>
          <h4>
            {{ $route.params.id }}
          </h4>
        </div>
      </div>
      <div class="main-right">
        <div class="follow-block">
          <div class="left-follow">
            <router-link :to="{ name: 'Follow', params: { id: pageUser.id } }">
              <h2>Follow</h2>
              <h2 class="text-type">{{ pageUser.follow.length }}</h2>
            </router-link>
          </div>
          <div class="right-follower">
            <router-link
              :to="{ name: 'Follower', params: { id: pageUser.id } }"
            >
              <h2>Follower</h2>
              <h2 class="text-type">{{ pageUser.follower.length }}</h2>
            </router-link>
          </div>
        </div>
        <div class="button-block">
          <div v-if="!isMe">
            <button class="button-type" v-if="isOther" v-on:click="follow">
              フォローする
            </button>
            <button class="button-type" v-else v-on:click="unfollow">
              フォローを外す
            </button>
          </div>
        </div>
        <div class="bio-block">
          {{ user.bio }}
        </div>
      </div>
    </div>
    <div class="bigbox">
      <div class="life-design__content">
        <div v-for="(event, index) in pageUser.lifeDesign" v-bind:key="index">
          <div class="scroll-pointer">
            <div class="time-line">
              <h4>{{ event.age }} 歳</h4>
              <div class="circle"></div>
              <div class="line"></div>
            </div>
          </div>
          <h3>{{ event.desc }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  props: {
    user: Object
  },
  data() {
    return {
      pageUser: {},
      isMe: false
    }
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        this.pageUser = {
          id: doc.id,
          ...doc.data()
        }
      })

    if (this.user.uid == this.$route.params.id) {
      this.isMe = true
    }
    console.log(this.user.uid)
    console.log(this.$route.params.id)
  },
  computed: {
    isOther() {
      for (const followerId of this.pageUser.follower) {
        if (followerId === this.user.uid) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    follow() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.id)
        .update({
          follower: firebase.firestore.FieldValue.arrayUnion(this.user.uid)
        })

      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          follow: firebase.firestore.FieldValue.arrayUnion(
            this.$route.params.id
          )
        })
    },

    unfollow() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.id)
        .update({
          follower: firebase.firestore.FieldValue.arrayRemove(this.user.uid)
        })

      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          follow: firebase.firestore.FieldValue.arrayRemove(
            this.$route.params.id
          )
        })
    }
  }
}
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
      margin: auto;
      border-radius: 50%;
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
      position: relative;
      .button-type {
        position: absolute;
        top: 50%;
        left: 30%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        border-radius: 30px;
        background-color: blue;
        width: 40%;
        height: 30%;
        color: white;
        font-size: 15px;
      }
    }
    .bio-block {
      width: 100%;
      height: 60%;
      float: left;
      text-align: left;
      font-size: 20px;
    }
  }
}
.bigbox {
  max-width: 1000px;
  height: 800px;
  margin: auto;
  border: 1px solid black;
  background-color: rgb(126, 184, 250);
  .life-design__content {
    width: 100%;
    height: 10000px;
    padding: 24px;
    box-sizing: border-box;
    text-align: left;
    background-color: rgb(129, 225, 255);
    color: black;
    .scroll-pointer {
      width: 16px;
      display: flex;
      flex-direction: column;
      padding-top: 6px;
      .circle {
        width: 30px;
        height: 30px;
        margin-bottom: 6px;
        background: rgb(248, 165, 165);
        border-radius: 50%;
      }
      .line {
        flex: 1;
        width: 2px;
        background: black;
        height: 100%;
        margin: auto;
      }
    }
  }
}
</style>
