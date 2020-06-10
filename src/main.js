import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
import "./assets/app.scss";
import 'popper.js';
import 'bootstrap';
import Navbar from "@/components/Navbar";
import {fb} from  './firebase';

window.$ = window.jQuery = jQuery;
window.$ = window.JQuery;
window.JQuery = jQuery;

Vue.component("Navbar", Navbar);

Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});