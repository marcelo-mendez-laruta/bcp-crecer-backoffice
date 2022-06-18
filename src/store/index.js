import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { reject, resolve } from "core-js/fn/promise";

Vue.use(Vuex);
axios.defaults.baseURL =
  "https://bcpcrecerapi20220611134544.azurewebsites.net/";

export default new Vuex.Store({
  state: {
    categorias: [],
    empresas: [],
<<<<<<< HEAD
=======
    productos: [],
    user: {},
    loggedin: false,
>>>>>>> ebb9624f8475c716407f513bd2125433bcd3bba0
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedin: (state) => state.loggedin,
    getCategorias: (state) => state.categorias,
    getEmpresas: (state) => state.empresas,
<<<<<<< HEAD
=======
    getProductos: (state) => state.productos,
>>>>>>> ebb9624f8475c716407f513bd2125433bcd3bba0
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.loggedin = true;
    },
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    ADD_CATEGORIA(state, categoria) {
      let categorias = state.categorias;
      categorias.push(categoria);
      state.categorias = categorias;
    },
<<<<<<< HEAD

    //MUTATIONS - SECCION EMPRESAS
    SET_EMPRESAS(state, empresas){
      state.empresas=empresas;
    },
    ADD_EMPRESAS(state, empresas){
      let empresas = state.empresas;
      empresas.push(empresas);
      state.empresas = empresas;
    }
=======
    //MUTATIONS - SECCION EMPRESA
    SET_EMPRESAS(state, empresas) {
      state.empresas = empresas;
    },
    ADD_EMPRESA(state, empresa) {
      let empresas = state.empresas;
      empresas.push(empresa);
      state.empresas = empresas;
    },

    //MUTATIONS - SECCION PRODUCTOS
    SET_PRODUCTOS(state, productos) {
      state.getProductos = productos;
    },
    ADD_PRODUCTO(state, producto) {
      let productos = state.productos;
      productos.push(producto);
      state.productos = productos;
    },
>>>>>>> ebb9624f8475c716407f513bd2125433bcd3bba0
  },
  actions: {
    login({ commit }, request) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("login", request)
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data));
              commit("SET_USER", JSON.stringify(response.data));
              resolve(true);
            })
            .catch((error) => {
              console.error(error);
              reject(false);
            });
        } catch (error) {
          console.log(error);
        }
      });
    },
    logout({ state }) {
      localStorage.removeItem("user");
      state.user = {};
      state.loggedin = false;
    },
    getCategorias({ commit }) {
      if (localStorage.categorias) {
        return new Promise((resolve) => {
          commit(
            "SET_CATEGORIAS",
            JSON.parse(localStorage.getItem("categorias"))
          );
          resolve(JSON.parse(localStorage.getItem("categorias")));
        });
      } else {
        return new Promise((resolve, reject) => {
          try {
            axios
              .get("categorias")
              .then((response) => {
                localStorage.setItem(
                  "categorias",
                  JSON.stringify(response.data.categorias)
                );
                commit("SET_CATEGORIAS", response.data.categorias);
                resolve(response.data.categorias);
              })
              .catch((error) => {
                reject(error);
              });
          } catch (error) {
            console.error(error);
          }
        });
      }
    },
    addCategoria({ commit, state }, categoria) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("nuevacategoria", categoria)
            .then((response) => {
              console.log(response);
              if (response.data) {
                let categorias = state.categorias;
                categorias.push(categoria);
                localStorage.setItem("categorias", JSON.stringify(categorias));
                commit("SET_CATEGORIAS", categorias);
              }
              resolve(response.data);
            })
            .catch((error) => {
              console.error(error);
              reject(false);
            });
        } catch (error) {
          console.log(error);
        }
      });
    },

    //ACTIONS - SECCION EMPRESAS
<<<<<<< HEAD
    getEmpresas({commit}) {
      // no se revisa cache de navegaor
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("empresas")
            .then((response) => {
              commit("SET_EMPRESAS", response.data.empresas);
              resolve(response.data.empresas);
=======
    getEmpresas({ commit }, request) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("empresas", request)
            .then((response) => {
              if (response.data != null) {
                commit("SET_EMPRESAS", response.data.empresas);
                resolve(response.data.empresas);
              }
>>>>>>> ebb9624f8475c716407f513bd2125433bcd3bba0
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
<<<<<<< HEAD
          comsola.error(error);
        }
      });
    },
    addEmpresas({commit, state}, empresas) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("nuevaempresa", empresas)
            .then((response) => {
              console.log("EMPRESAS: " + response);
              if (response.data) {
                let empresas = state.empresas;
                empresas.push(empresas);
=======
          console.error(error);
        }
      });
    },
    addEmpresa({ commit, state }, empresa) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("nuevaempresa", empresa)
            .then((response) => {
              if (response.data) {
                let empresas = state.empresas;
                empresas.push(empresa);
>>>>>>> ebb9624f8475c716407f513bd2125433bcd3bba0
                commit("SET_EMPRESAS", empresas);
              }
              resolve(response.data);
            })
            .catch((error) => {
              console.error(error);
              reject(false);
            });
        } catch (error) {
          console.error(error);
        }
      });
<<<<<<< HEAD
    }
=======
    },

    //ACTIONS - SECCION PRODUCTOS
    getProductos({ commit }, request) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("productos", request)
            .then((response) => {
              if (response.data != null) {
                commit("SET_PRODUCTOS", response.data.productos);
                resolve(response.data.productos);
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          console.error("[getProductos] " + error);
        }
      });
    },
    addProducto({ commit, state }, producto) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("nuevoproducto", producto)
            .then((response) => {
              console.log("PRODUCTOS: " + response.data);
              if (response.data) {
                let productos = state.productos;
                productos.push(producto);
                commit("SET_PRODUCTOS", productos);
              }
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          console.error("[addProducto] " + error);
        }
      });
    },
>>>>>>> ebb9624f8475c716407f513bd2125433bcd3bba0
  },
  modules: {},
});
