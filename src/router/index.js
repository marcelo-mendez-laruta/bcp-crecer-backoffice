import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriasView from "../views/CategoriasView.vue";
import EmpresaView from "../views/EmpresaView.vue";
import ProductosView from "../views/ProductosView.vue";
import RegistrarSignView from "../views/RegistrarSign.vue";

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
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: "/Registrar",
    name: "registrarSign",
    component: RegistrarSignView,
    meta: {
      hidelogout: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
