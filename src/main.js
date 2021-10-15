// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { makeServer } from "./server";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { worker } from "./mocks/browser";
import Vuex from 'vuex'
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Start the mocking conditionally.
if (process.env.VUE_APP_ENV === "development") {
  // worker.start();
  makeServer();
}

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);


Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
