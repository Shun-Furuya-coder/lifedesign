<template>
  <div>
    <!-- <div class="main-profile">
      <div class="user-info">
        <img :src="image" alt="" class="image-circle" />
        <h4>{{ user.name }}</h4>
        <h4>{{ user.id }}</h4>
      </div>
      <div class="follow-block">
        <h3>Follow Followers</h3>
        <h2>{{ user.follow.length }} {{ user.followers.length }}</h2>
      </div>
      <div class="edit-button">
        <button>
          <router-link to="/profile/edit">プロフィールを編集</router-link>
        </button>
      </div>
      <div class="user-bio">
        <h4>{{ user.bio }}</h4>
      </div>
    </div> -->
    <div class="main-profile">
      <div class="main-left">
        <img :src="user.photoURL" alt="" class="photo-box" />
        <div class="name-box">
          <h2>
            {{ user.userName }}
          </h2>
          <h4>
            {{ user.uid }}
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
          <button class="button-type">
            <router-link to="/profile/edit" class="text"
              >プロフィールを編集</router-link
            >
          </button>
        </div>
        <div class="bio-block">
          {{ user.bio }}
        </div>
      </div>
    </div>
    <!-- <div class="bigbox">
      <div class="life-design__content">
        <div v-for="(event, index) in formatedEvents" v-bind:key="index">
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
      <input type="number" v-model="edit.age" />
      <input type="text" v-model="edit.desc" />
      <button v-on:click="add">add</button>
    </div> -->
    <div class="past-future">
      <button class="switch-button" v-on:click="toPast">Past</button>
      <button class="switch-button" v-on:click="toFuture">Future</button>
    </div>
    <!-- <div v-if="isPast"> -->
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
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },
  data() {
    return {
      edit: {
        age: null,
        desc: "",
        details: ""
      },
      isPast: true,
      past: [],
      future: []
      // user: {
      //   name: "Shun Furuya",
      //   image: "https://images.app.goo.gl/ifUjnsxWFNuat6Uf6",
      //   id: "@shun19990712",
      //   bio:
      //     "ここに自己紹介などを書き込む。1999/07/12 生まれ。21歳。プログラミングをやってます。",

      //   follow: ["@yasunarle", "@shun1", "@shun2", "@shun3"],
      //   followers: ["@yasunarle", "@shun1", "@shun2", "@shun3"],

      //   lifeDesign: [
      //     { age: 21, desc: "etc", color: "", details: "" },
      //     {
      //       age: 4,
      //       desc: "沼津で生まれ育つ",
      //       color: "",
      //       details: "元気な男の子だった。"
      //     },
      //     { age: 6, desc: "清水幼稚園", color: "", details: "" },
      //     { age: 12, desc: "清水小学校", color: "", details: "" }
      //   ]
      // }
    }
  },
  created() {
    for (const one of this.user.lifeDesign) {
      if (one.age <= this.user.age) {
        this.past.push(one)
      } else {
        this.future.push(one)
      }
    }
  },
  computed: {
    formatedEvents() {
      if (this.isPast) {
        let events = []
        events = this.past.slice().sort(function(a, b) {
          return a.age - b.age
        })
        return events
      } else {
        let events = []
        events = this.future.slice().sort(function(a, b) {
          return a.age - b.age
        })
        return events
      }
    }
  },
  methods: {
    add() {
      let event = {
        age: this.edit.age,
        desc: this.edit.desc,
        color: "",
        details: ""
      }
      this.user.lifeDesign.push(event)
    },
    toPast() {
      this.isPast = true
    },
    toFuture() {
      this.isPast = false
    }
  }
}
</script>

<style lang="scss">
// .main-profile {
//   width: 100%;
//   height: 350px;
//   .user-info {
//     width: 30%;
//     height: 100%;
//     float: left;
//     .image-circle {
//       width: 80px;
//       height: 80px;
//       margin-bottom: 6px;
//       background: black;
//       border-radius: 50%;
//       margin: 20px;
//     }
//   }
//   .follow-block {
//     width: 50%;
//     height: 30%;
//     float: left;
//     text-align: left;
//     word-spacing: 80px;
//   }
//   .edit-button {
//     width: 20%;
//     height: 30%;
//     float: right;
//     text-align: center;
//   }
//   .user-bio {
//     width: 70%;
//     height: 70%;
//     float: left;
//     text-align: left;
//   }
// }
.main-profile {
  padding-top: 50px;
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
        font-size: 15px;
        font-weight: bold;
        .text {
          color: white;
        }
      }
    }
    .bio-block {
      width: 70%;
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
    font-size: 15px;
    font-weight: bold;
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
