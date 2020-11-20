import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyDtxJpYsR2UG7-5VTQywKYSQYtd_6OGY80",
    authDomain: "stock-cd53e.firebaseapp.com",
    databaseURL: "https://stock-cd53e.firebaseio.com",
    projectId: "stock-cd53e",
    storageBucket: "stock-cd53e.appspot.com",
    messagingSenderId: "517081810321",
    appId: "1:517081810321:web:edfcd55f939bb7fb064630",
    measurementId: "G-5C1HHWPTY5",
});

Vue.config.productionTip = false;

var db = firebase.firestore();

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");

export default db;
