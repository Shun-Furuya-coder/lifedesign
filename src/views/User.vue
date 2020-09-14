<template>
  <div>
    <div class="main-profile">
      <div class="main-left">
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
    <!-- <div class="bigbox">
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
    </div> -->
    <div class="past-future">
      <button class="switch-button" v-on:click="toPast">Past</button>
      <button class="switch-button" v-on:click="toFuture">Future</button>
    </div>
    <div class="life-design-box">
      <div class="design-paper">
        <div v-for="(event, index) in formatedEvents" v-bind:key="index">
          <div class="old-block">{{ event.age }}歳</div>
          <div class="time-line">
            <div class="circle-block"></div>
            <div class="line-block"></div>
          </div>
          <div class="desc-block">
            {{ event.desc }}
          </div>
          <div class="gap"></div>
          <div class="detail-block">
            {{ event.details }}
          </div>
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
      isMe: false,
      isPast: true,
      past: [],
      future: []
    };
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
        };
        for (const one of this.pageUser.lifeDesign) {
          if (one.age <= this.pageUser.age) {
            this.past.push(one);
          } else {
            this.future.push(one);
          }
        }
      });

    if (this.user.uid == this.$route.params.id) {
      this.isMe = true
    }
  },
  computed: {
    isOther() {
      for (const followerId of this.pageUser.follower) {
        if (followerId === this.user.uid) {
          return false
        }
      }
      return true;
    },

    formatedEvents() {
      if (this.isPast) {
        let events = [];
        events = this.past.slice().sort(function(a, b) {
          return a.age - b.age;
        });
        return events;
      } else {
        let events = [];
        events = this.future.slice().sort(function(a, b) {
          return a.age - b.age;
        });
        return events;
      }
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
        });
    },
    toPast() {
      this.isPast = true;
    },
    toFuture() {
      this.isPast = false;
    }
  }
}
</script>

<style lang="scss" scoped>
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
        background-color: rgb(59, 177, 255);
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
// .bigbox {
//   max-width: 1000px;
//   height: 800px;
//   margin: auto;
//   border: 1px solid black;
//   background-color: rgb(126, 184, 250);
//   .life-design__content {
//     width: 100%;
//     height: 10000px;
//     padding: 24px;
//     box-sizing: border-box;
//     text-align: left;
//     background-color: rgb(129, 225, 255);
//     color: black;
//     .scroll-pointer {
//       width: 16px;
//       display: flex;
//       flex-direction: column;
//       padding-top: 6px;
//       .circle {
//         width: 30px;
//         height: 30px;
//         margin-bottom: 6px;
//         background: rgb(248, 165, 165);
//         border-radius: 50%;
//       }
//       .line {
//         flex: 1;
//         width: 2px;
//         background: black;
//         height: 100%;
//         margin: auto;
//       }
//     }
//   }
// }
.past-future {
  width: 100%;
  height: auto;
  .switch-button {
    width: 60px;
    height: 30px;
    background-color: rgb(59, 177, 255);
    color: white;
  }
}
.life-design-box {
  width: 100%;
  height: auto;
  background-color: rgb(59, 177, 255);
  float: left;
  .design-paper {
    padding-top: 80px;
    width: 80%;
    height: auto;
    background-color: white;
    float: left;
    margin: 100px;
    .old-block {
      width: 15%;
      height: 150px;
      float: left;
      text-align: right;
      font-size: 20px;
    }
    .time-line {
      width: 10%;
      height: 150px;
      float: left;
      .circle-block {
        width: 30px;
        height: 30px;
        background: rgb(248, 165, 165);
        border-radius: 50%;
      }
      .line-block {
        flex: 1;
        width: 2px;
        background: black;
        height: 120px;
        margin-left: 15px;
      }
    }
    .desc-block {
      width: 70%;
      height: 65px;
      float: left;
      text-align: left;
      font-size: 20px;
    }
    .gap {
      width: 10%;
      height: 85px;
      float: left;
    }
    .detail-block {
      width: 60%;
      height: 85px;
      float: left;
      text-align: left;
    }
  }
}
</style>
