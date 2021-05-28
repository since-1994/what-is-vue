import Vue from "vue";
import VueRouter from "vue-router";

import User from "./components/User.vue";
import App from "./App.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/user/:id",
      component: User,
      children: [{ path: "hello", component: User }],
    },
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
