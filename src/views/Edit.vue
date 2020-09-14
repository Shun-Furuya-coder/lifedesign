<template>
  <div>
    <div class="main-edit">
      <div class="image-block">
        <img :src="user.photoURL" alt="" class="image-circle" />
      </div>
      <div class="edit-block">
        <p>
          名前：<input
            type="text"
            class="name-submit"
            v-model="user.userName"
          />
        </p>
        <p>
          年齢：<input
            type="number"
            class="birth-year-submit"
            v-model="user.age"
          />
        </p>
        <p>
          コメント：<input type="text" class="bio-submit" v-model="user.bio" />
        </p>
        <button class="submit-button" v-on:click="update">変更を保存</button>
      </div>
      <div class="blank"></div>
      <div class="life-edit-block">
        <p>編集したい年を選んでください。</p>
        <input type="number" class="age-add" v-model="inputAge" />歳
        <p>見出しを書いてください。</p>
        <input type="text" class="comment-add" v-model="inputDesc" />
        <p>ショートコメントを書いてください。</p>
        <input type="text" class="comment-add" v-model="inputDetail" />
        <button class="add-button" v-on:click="add">追加</button>
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
    </div> -->
    <div class="life-design-box">
      <div class="design-paper">
        <div v-for="(event, index) in formatedEvents" v-bind:key="index">
          <div class="old-block">
            <div>{{ event.age }}歳</div>
            <button v-on:click="deleteEvent(event)">Delete</button>
          </div>
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
import firebase from "firebase";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      inputAge: 0,
      inputDesc: "",
      inputDetail: ""
      // user: {
      //   name: "Shun Furuya",
      //   image: "https://images.app.goo.gl/ifUjnsxWFNuat6Uf6",
      //   id: "@shun19990712",
      //   birth: { year: 1999, month: 7, day: 12 },
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
      //       details: ""
      //     },
      //     { age: 6, desc: "清水幼稚園", color: "", details: "" },
      //     { age: 12, desc: "清水小学校", color: "", details: "" }
      //   ]
      // }
    };
  },
  computed: {
    formatedEvents() {
      if (this.user.lifeDesign.length >= 2) {
        let events = [];
        events = this.user.lifeDesign.slice().sort(function(a, b) {
          return a.age - b.age;
        });
        return events;
      } else {
        return this.user.lifeDesign;
      }
    }
  },
  methods: {
    add() {
      let event = {
        age: Number(this.inputAge),
        desc: this.inputDesc,
        details: this.inputDetail
      };
      // this.user.lifeDesign.push(event);
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          lifeDesign: firebase.firestore.FieldValue.arrayUnion(event)
        })
        .then(() => {
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true
          });
        });
      // alert("complete");
      this.inputAge = 0;
      this.inputDesc = "";
      this.inputDetail = "";
      // console.log(typeof this.inputAge);
    },
    update() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          userName: this.user.userName,
          age: this.user.age,
          bio: this.user.bio
        });
      // alert("editted");
    },
    deleteEvent(event) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          lifeDesign: firebase.firestore.FieldValue.arrayRemove(event)
        })
        .then(() => {
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true
          });
        });
    }
  }
};
</script>

<style lang="scss">
.main-edit {
  padding: 50px;
  padding-bottom: 100px;
  width: 100%;
  height: 400px;
  .image-block {
    width: 30%;
    height: 50%;
    float: left;
    .image-circle {
      width: 150px;
      height: 150px;
      margin-bottom: 6px;
      background: black;
      margin: auto;
      border-radius: 50%;
    }
  }
  .edit-block {
    width: 70%;
    height: 50%;
    float: left;
    text-align: left;
    .name-submit {
      width: 200px;
      height: 30px;
      font-size: 16px;
      border: none;
      outline: 0;
      border-bottom: 1px solid #d1d5db;
    }
    .birth-year-submit {
      width: 50px;
      text-align: right;
      font-size: 16px;
      border: none;
      outline: 0;
      border-bottom: 1px solid #d1d5db;
    }
    .birth-month-day-submit {
      width: 40px;
      text-align: right;
      font-size: 16px;
      border: none;
      outline: 0;
      border-bottom: 1px solid #d1d5db;
    }
    .bio-submit {
      width: 400px;
      height: 30px;
      font-size: 16px;
      border: none;
      outline: 0;
      border-bottom: 1px solid #d1d5db;
    }
    .submit-button {
      background-color: rgb(59, 177, 255);
      color: white;
      border-radius: 30px;
    }
  }
  .blank {
    width: 15%;
    height: 30%;
    float: left;
  }
  .life-edit-block {
    width: 80%;
    height: 30%;
    text-align: left;
    float: left;
    .age-add {
      width: 40px;
      text-align: right;
      font-size: 16px;
      border: none;
      outline: 0;
      border-bottom: 1px solid #d1d5db;
    }
    .comment-add {
      width: 400px;
      height: 30px;
      font-size: 16px;
      border: none;
      outline: 0;
      border-bottom: 1px solid #d1d5db;
    }
    .add-button {
      background-color: rgb(59, 177, 255);
      color: white;
      border-radius: 30px;
    }
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
      margin-right: 5%;
      font-family: "arial black";
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
      font-size: 25px;
      font-family: "arial black";
    }
    .gap {
      width: 8%;
      height: 85px;
      float: left;
    }
    .detail-block {
      width: 62%;
      height: 85px;
      float: left;
      text-align: left;
      font-size: 20px;
    }
  }
}
</style>
