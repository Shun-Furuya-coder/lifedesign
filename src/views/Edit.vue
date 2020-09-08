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
          生年月日：<input
            type="number"
            class="birth-year-submit"
            v-model="user.birth.year"
          />年<input
            type="number"
            class="birth-month-day-submit"
            v-model="user.birth.month"
          />月<input
            type="number"
            class="birth-month-day-submit"
            v-model="user.birth.day"
          />日
        </p>
        <p>
          コメント：<input type="text" class="bio-submit" v-model="user.bio" />
        </p>
        <button class="submit-button" v-on:click="update">変更を保存</button>
      </div>
      <div class="blank"></div>
      <div class="life-edit-block">
        <p>編集したい年を選んでください。</p>
        <input type="number" class="age-add" v-model="edit.age" />歳
        <p>見出しを書いてください。</p>
        <input type="text" class="comment-add" v-model="edit.desc" />
        <button class="add-button" v-on:click="add">追加</button>
      </div>
    </div>
    <div class="bigbox">
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
      edit: {
        age: null,
        desc: "",
        details: ""
      }
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
      let events = [];
      // events = this.user.lifeDesign.slice().sort(function(a, b) {
      //   return a.age - b.age;
      // });
      return events;
    }
  },
  methods: {
    add() {
      let event = {
        age: this.edit.age,
        desc: this.edit.desc,
        color: "",
        details: ""
      };
      this.user.lifeDesign.push(event);
    },
    update() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .update({
          userName: this.user.userName
        });
      alert("editted");
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
      width: 80px;
      height: 80px;
      margin-bottom: 6px;
      background: black;
      border-radius: 50%;
      margin: 20px;
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
      background-color: blue;
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
      background-color: blue;
      color: white;
      border-radius: 30px;
    }
  }
}
</style>
