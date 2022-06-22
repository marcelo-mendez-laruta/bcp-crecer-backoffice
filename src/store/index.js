import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL =
  "https://bcpcrecerapi20220611134544.azurewebsites.net/";

export default new Vuex.Store({
  state: {
    categorias: [],
    empresas: [],
    productos: [],
    user: {},
    loggedin: false,
    SignIn: [],
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedin: (state) => state.loggedin,
    getCategorias: (state) => state.categorias,
    getEmpresas: (state) => state.empresas,
    getProductos: (state) => state.productos,
    getSign: (state) => state.SignIn,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.loggedin = true;
    },

    //MUTATIONS - SECCION SIGNIN

    SET_SIGN(state, SignIn) {
      state.SignIn = SignIn;
    },
    //MUTATIONS - SECCION CATEGORIAS
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    ADD_CATEGORIA(state, categoria) {
      let categorias = state.categorias;
      categorias.push(categoria);
      state.categorias = categorias;
    },
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
          console.error(error);
        }
      });
    },
    logout({ state }) {
      localStorage.removeItem("user");
      state.user = {};
      state.loggedin = false;
    },
    addSignIn({ commit }, newSignIn) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("registroUsuario", newSignIn)
            .then((response) => {
              console.log("[addSigIn] Response: " + response);
              commit("SET_USER", response);
              resolve(response);
            })
            .catch((error) => {
              console.error(error);
              let userblank = {};
              reject(userblank);
            });
        } catch (error) {
          console.log("[addSigIn] " + error);
        }
      });
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
    getEmpresas({ commit }, request) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("empresas", request)
            .then((response) => {
              console.log("[getEmpresas]");
              console.log(response);
              if (response.data != null) {
                commit("SET_EMPRESAS", response.empresas);
                resolve(response.data.empresas);
              }
            })
            .catch((error) => {
              console.error("[getEmpresas] " + error);
              reject(error);
            });
        } catch (error) {
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
  },
  modules: {},
});
