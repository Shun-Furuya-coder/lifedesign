
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";


Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyB8prG_UFTj3cfj2f3WPZSMW6jwZYOrN7w",
  authDomain: "lifedesign-418ef.firebaseapp.com",
  databaseURL: "https://lifedesign-418ef.firebaseio.com",
  projectId: "lifedesign-418ef",
  storageBucket: "lifedesign-418ef.appspot.com",
  messagingSenderId: "1063968234477",
  appId: "1:1063968234477:web:609383bf78b61fea6425e4",
  measurementId: "G-7QF4W20LW3"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

