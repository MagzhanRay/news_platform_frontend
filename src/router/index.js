import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewView from "../views/News/View.vue";
import NewsCreate from "../views/News/Create.vue";
import NewsEdit from "../views/News/Edit.vue";
import CategoryCreate from "../views/Category/CreateView.vue";
import CategoryEdit from "../views/Category/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/category",
      name: "category",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Category/CategoryView.vue"),
    },
    {
      path: "/news",
      name: "news",
      component: NewView,
    },
    {
      path: "/news/create",
      name: "newsCreate",
      component: NewsCreate,
    },
    {
      path: "/news/:id/edit",
      name: "newsEdit",
      component: NewsEdit,
    },
    {
      path: "/category/create",
      name: "categoryCreate",
      component: CategoryCreate,
    },
    {
      path: "/category/:id/edit",
      name: "categoryEdit",
      component: CategoryEdit,
    },
  ],
});

export default router;
