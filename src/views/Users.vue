<template>
  <div>
    <h1>All Users</h1>
    <!-- <div v-for="(user, index) in users" :key="index">
      <router-link :to="{ name: 'User', params: { id: user.id } }">
        {{ user.userName }}</router-link
      >
    </div> -->
    <div v-for="(user, index) in users" :key="index">
      <div class="big-box">
        <router-link :to="{ name: 'User', params: { id: user.id } }">
          <div class="user-box">
            <div class="image-block">
              <img :src="user.userImageURL" alt="" class="image-circle" />
            </div>
            <div class="name-block">
              {{ user.userName }}
              <div class="id-font">
                {{ user.id }}
              </div>
            </div>
            <div class="other-block">
              Follow: {{ user.follow.length }}
              <div>Followers: {{ user.follower.length }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        docs.forEach(doc => {
          // console.log(doc);
          this.users.push({
            id: doc.id,
            ...doc.data()
          });
        });
        // this.users.userName.slice().sort(function(a, b) {
        //   return b - a;
        // });
      });
  }
};
</script>

<style lang="scss">
.big-box {
  width: 100%;
  height: 100px;
  .user-box {
    width: 500px;
    height: 80px;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    border-radius: 30px;
    background-color: rgb(59, 147, 248);
    .image-block {
      width: 20%;
      height: 100%;
      float: left;
      position: relative;
      .image-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: black;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .name-block {
      width: 40%;
      height: 100%;
      float: left;
      font-size: 20px;
      text-align: left;
      line-height: 40px;
      color: white;
      .id-font {
        font-size: 13px;
      }
    }
    .other-block {
      width: 30%;
      height: 100%;
      font-size: 13px;
      float: left;
      color: white;
      text-align: left;
      line-height: 40px;
      margin-left: 30px;
    }
  }
}
</style>
