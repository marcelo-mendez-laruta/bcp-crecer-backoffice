import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriasView from "../views/CategoriasView.vue";
import EmpresaView from "../views/EmpresaView.vue";
import ProductosView from "../views/ProductosView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Categorias",
    name: "categorias",
    component: CategoriasView,
  },
  {
    path: "/EmpresasByCategoriaId/:categoriaId",
    name: "empresabycategoriaid",
    component: EmpresaView,
  },
  {
    path: "/Categoria/:categoriaId/Empresa/:empresaId/Productos",
    name: "productos",
    component: ProductosView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
