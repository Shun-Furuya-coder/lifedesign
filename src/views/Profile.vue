<template>
  <div>
    <img :src="user.image" alt="" width="100px" />
    <div class="bigbox">
      <div class="life-design__content">
        <div v-for="(event, index) in formatedEvents" v-bind:key="index">
          <div class="scroll-pointer">
            <div class="circle">
              <div class="line"></div>
            </div>
            <h4>{{ event.age }} 歳</h4>
            <h3>{{ event.desc }}</h3>
          </div>
        </div>
      </div>
      <input type="number" v-model="edit.age" />
      <input type="text" v-model="edit.desc" />
      <button v-on:click="add">add</button>
    </div>
  </div>
  <!-- <div class="life-design">
      <div class="life-design__content">
        <div class="decade" v-for="(decade, index) in decades" :key="index">
          <div class="scroll-pointer">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
          <div>
            <h3 class="decade__age">{{ formatedYears[index] }}</h3>
            <div class="decade__contents">
              <div class="decade__content" v-for="(item, i) in decade" :key="i">
                <div class="test">
                  <div class="left">
                    <p>{{ item.age }} years old</p>
                    <div></div>
                  </div>
                  <div class="right">
                    <h3 class="title">{{ item.title }}</h3>
                    <p class="description">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script>
export default {
  data() {
    return {
      edit: {
        age: null,
        desc: "",
        details: ""
      },
      user: {
        name: "Shun",
        image: "https://images.app.goo.gl/ifUjnsxWFNuat6Uf6",

        lifeDesign: [
          { age: 21, desc: "etc", color: "", details: "" },
          {
            age: 4,
            desc: "沼津で生まれ育つ",
            color: "",
            details: ""
          },
          { age: 6, desc: "清水幼稚園", color: "", details: "" },
          { age: 12, desc: "清水小学校", color: "", details: "" }
        ]

        // lifeDesign: {
        //   one: {
        //     start: 0,
        //     end: 4,
        //     desc: "沼津で生まれ育つ",
        //     color: "",
        //     details: ""
        //   },
        //   two: {
        //     start: 4,
        //     end: 6,
        //     desc: "清水幼稚園",
        //     color: "",
        //     details: ""
        //   },
        //   three: {
        //     start: 6,
        //     end: 12,
        //     desc: "清水小学校",
        //     color: "",
        //     details: ""
        //   },
        //   four: {
        //     start: 12,
        //     end: 21,
        //     desc: "etc",
        //     color: "",
        //     details: ""
        //   },
        //}
      }
    };
  },
  computed: {
    formatedEvents() {
      let events = [];
      events = this.user.lifeDesign.slice().sort(function(a, b) {
        return a.age - b.age;
      });
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
    }
  }
};
</script>

<style lang="scss">
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
// .life-design {
//   height: 600px;
//   max-width: 900px;
//   margin: auto;
//   padding: 10px;
//   background: grey;
//   overflow: auto;
//   .life-design__content {
//     width: 100%;
//     height: 10000px;
//     padding: 24px;
//     box-sizing: border-box;
//     text-align: left;
//     background-color: whitesmoke;
//     color: black;
//     .decade {
//       display: flex;
//       flex-direction: row;
//       .scroll-pointer {
//         width: 16px;
//         display: flex;
//         flex-direction: column;
//         padding-top: 6px;
//         .circle {
//           width: 16px;
//           height: 16px;
//           margin-bottom: 6px;
//           background: black;
//           border-radius: 50%;
//         }
//         .line {
//           flex: 1;
//           width: 2px;
//           background: black;
//           height: 100%;
//           margin: auto;
//         }
//       }
//       .decade__age {
//         width: fit-content;
//         margin-left: 30px;
//         padding: 6px 20px;
//         background: black;
//         color: white;
//       }
//       .decade__contents {
//         min-height: 100px;
//         margin-bottom: 20px;
//         .decade__content {
//           padding: 30px 10px 0px 10px;
//           .test {
//             width: 100%;
//             display: flex;
//             flex-direction: row;
//             .left {
//               width: 130px;
//               padding-right: 10px;
//             }
//           }
//         }
//       }
//     }
//   }
// }
</style>
