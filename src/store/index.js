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
  },
  getters: {
    getCategorias: (state) => state.categorias,
    getEmpresas: (state) => state.empresas,
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

    //MUTATIONS - SECCION EMPRESAS
    SET_EMPRESAS(state, empresas){
      state.empresas=empresas;
    },
    ADD_EMPRESAS(state, empresas){
      let empresas = state.empresas;
      empresas.push(empresas);
      state.empresas = empresas;
    }
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

    //ACTIONS - SECCION EMPRESAS
    getEmpresas({commit}) {
      // no se revisa cache de navegaor
      return new Promise((resolve, reject) => {
        try {
          axios
            .post("empresas")
            .then((response) => {
              commit("SET_EMPRESAS", response.data.empresas);
              resolve(response.data.empresas);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
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
    }
  },
  modules: {},
});
