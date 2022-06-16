import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL =
  "https://bcpcrecerapi20220611134544.azurewebsites.net/";

export default new Vuex.Store({
  state: {
    categorias: [],
  },
  getters: {
    getCategorias: (state) => state.categorias,
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    ADD_CATEGORIA(state, categoria) {
      let categorias = state.categorias;
      categorias.push(categoria);
      state.categorias = categorias;
    },
  },
  actions: {
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
  },
  modules: {},
});
