import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseSecondaryConfig = ({
    apiKey: "AIzaSyDtxJpYsR2UG7-5VTQywKYSQYtd_6OGY80",
    authDomain: "stock-cd53e.firebaseapp.com",
    databaseURL: "https://stock-cd53e.firebaseio.com",
    projectId: "stock-cd53e",
    storageBucket: "stock-cd53e.appspot.com",
    messagingSenderId: "517081810321",
    appId: "1:517081810321:web:edfcd55f939bb7fb064630",
    measurementId: "G-5C1HHWPTY5",
});

const firebaseConfig = {
    apiKey: "AIzaSyCZ-DHJqsrjGKtClLtXAjL-wGu6XsIp1Wc",
    authDomain: "covid-finance-webapp.firebaseapp.com",
    databaseURL: "https://covid-finance-webapp.firebaseio.com",
    projectId: "covid-finance-webapp",
    storageBucket: "covid-finance-webapp.appspot.com",
    messagingSenderId: "514330280226",
    appId: "1:514330280226:web:0d162880f81ab6c622657b",
    measurementId: "G-8357C3WLB2"
};

Vue.config.productionTip = false;

//var db = firebase.firestore();

var secondary = firebase.initializeApp(firebaseSecondaryConfig, "secondary");
var db = secondary.firestore();

firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");

export default db;