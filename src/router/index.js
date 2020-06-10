import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import { fb } from "../firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      alias: "/"
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "products",
          name: "products",
          component: Products
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        }
      ]
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUSer = fb.auth().currentUser;

  if (requiresAuth && !currentUSer) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next("/");
  } else if (requiresAuth && currentUSer) {
    next();
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
