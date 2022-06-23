<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11">
        <v-col cols="12">
          <p class="text-h5 font-weight-bold">Categorias</p>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn
            text
            tile
            color="indigo darken-3"
            @click="newCategoriaOverlay = true"
          >
            <v-icon left> mdi-plus </v-icon>
            Nueva Categoria
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" offset-md="3">
          <v-text-field
            outlined
            label="Buscar Categoria"
            dense
            v-model="namefilter"
            @change="filterName"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="categoria in filteredCategorias"
              :key="categoria.id"
            >
              <v-card height="150">
                <v-row no-gutters style="height: 100%">
                  <v-col cols="4" style="height: 100%">
                    <v-img
                      cover
                      class="rounded-lg rounded-br-0 rounded-tr-0"
                      :src="categoria.imagen"
                      height="100%"
                    ></v-img>
                  </v-col>
                  <v-col cols="8" class="pl-3 pt-5" style="heigth: 85px">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <p class="text-h5 font-weight-bold">
                          {{ categoria.nombre }}
                        </p>
                        <p class="text-caption">{{ categoria.nombre }}</p>
                      </v-col>
                      <v-col cols="12">
                        <v-row align="center" justify="space-around" no-gutters>
                          <v-col cols="4">
                            <v-btn
                              class="ma-2"
                              text
                              dense
                              small
                              color="indigo"
                              @click="GotoEmpresa(categoria.id)"
                            >
                              <v-icon dark> mdi-eye </v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="4">
                            <v-btn
                              class="ma-2"
                              text
                              dense
                              small
                              color="orange"
                              @click="prepararUpdate(categoria)"
                            >
                              <v-icon dark> mdi-pencil </v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="4">
                            <v-btn
                              class="ma-2"
                              text
                              dense
                              small
                              color="red"
                              @click="eliminarCategoria(categoria.id)"
                            >
                              <v-icon dark> mdi-delete </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <v-overlay :value="newCategoriaOverlay" light>
      <v-card
        v-click-outside="CloseOverlay"
        style="margin-left: 10% !important"
        width="80%"
        max-width="80%"
        light
      >
        <v-card-text>
          <p class="text-h5 font-weight-bold black--text">
            {{ EditarCategoriaFlag ? "Editar Categoria" : "Nueva Categoria" }}
          </p>
          <v-text-field
            label="Nombre"
            outlined
            dense
            v-model="newCategoria.nombre"
          ></v-text-field>
          <v-text-field
            label="Imagen"
            outlined
            dense
            v-model="newCategoria.imagen"
          ></v-text-field>
          <v-divider v-if="newCategoria.nombre != null"></v-divider>
          <p
            v-if="newCategoria.nombre != null"
            class="text-caption font-weight-bold"
          >
            Previsualizacion
          </p>
          <v-card v-if="newCategoria.nombre != null" class="ma-7">
            <v-row no-gutters>
              <v-col cols="4">
                <v-img
                  v-if="newCategoria.imagen != null"
                  cover
                  class="rounded-lg rounded-br-0 rounded-tr-0"
                  :src="newCategoria.imagen"
                  height="100%"
                ></v-img>
                <v-img
                  v-else
                  cover
                  class="rounded-lg rounded-br-0 rounded-tr-0"
                  src="https://picsum.photos/200/300?random=1"
                ></v-img>
              </v-col>
              <v-col cols="8" class="pl-3 pt-5">
                <p class="text-h5 font-weight-bold">
                  {{ newCategoria.nombre }}
                </p>
                <p class="text-caption">{{ newCategoria.nombre }}</p>
              </v-col>
            </v-row>
          </v-card>
          <v-btn
            @click="updateCategoria"
            color="primary"
            v-if="EditarCategoriaFlag"
          >
            Confirmar
          </v-btn>
          <v-btn @click="postCategoria" color="primary" v-else>
            Registrar
          </v-btn>
          <v-alert
            class="mt-3"
            dense
            text
            :type="message.state"
            v-if="message.content != ''"
          >
            {{ message.content }}
          </v-alert>
        </v-card-text>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    categorias: [],
    filteredCategorias: [],
    EditarCategoriaFlag: false,
    message: {
      content: "",
      state: "",
    },
    namefilter: "",
    newCategoria: {},
    newCategoriaOverlay: false,
  }),
  beforeMount() {
    this.auth();
    this.getCategorias();
  },
  watch: {
    namefilter(name) {
      if (name != "") {
        let n = this.namefilter.toLowerCase();
        let alterArray = [];
        this.categorias.forEach((categoria) => {
          let Nombre = categoria.nombre.toLowerCase();
          if (Nombre.includes(n)) {
            alterArray.push(categoria);
          }
        });
        this.filteredCategorias = alterArray;
      } else {
        this.filteredCategorias = this.categorias;
      }
    },
  },
  methods: {
    auth() {
      if (!this.$store.state.loggedin) {
        if (localStorage.user) {
          this.$store.commit("SET_USER", localStorage.user);
        } else {
          this.$router.push("/login");
        }
      }
    },
    getCategorias: function () {
      this.$store.dispatch("getCategorias").then((response) => {
        this.categorias = response;
        this.filteredCategorias = response;
      });
    },
    funcat: (cat = this.categorias) => {
      console.log(cat);
    },
    CloseOverlay() {
      this.newCategoriaOverlay = false;
      this.newCategoria = {};
    },
    postCategoria() {
      console.log(this.newCategoria);
      this.newCategoria.color = "sin color";
      this.$store.dispatch("addCategoria", this.newCategoria).then(
        (response) => {
          if (response) {
            this.categorias = this.$store.getters.getCategorias;
            this.filteredCategorias = this.$store.getters.getCategorias;
            this.message.content = "Se registro la categoria con exito";
            this.message.state = "success";
            this.newCategoria = {};
            this.newCategoriaOverlay = false;
          } else {
            console.log("no se pudo agregar la categoria");
            this.message.content = "No se pudo agregar";
            this.message.state = "error";
            this.newCategoria = {};
          }
        },
        (error) => {
          console.error("No se pudo conectar con el servicio");
          console.error(error);
        }
      );
    },
    filterName() {},
    prepararUpdate(categoria) {
      this.EditarCategoriaFlag = true;
      this.newCategoria = categoria;
      this.newCategoriaOverlay = true;
    },
    updateCategoria() {
      this.$store.dispatch("updateCategoria", this.newCategoria).then(
        (response) => {
          if (response) {
            this.categorias = this.$store.getters.getCategorias;
            this.filteredCategorias = this.$store.getters.getCategorias;
            this.message.content = "Se actualizo la categoria con exito";
            this.message.state = "success";
            this.newCategoria = {};
            this.newCategoriaOverlay = false;
            this.funcat();
          } else {
            console.log("no se pudo actualizar la categoria");
            this.message.content = "No se pudo actualizar";
            this.message.state = "error";
            this.newCategoria = {};
          }
          this.EditarCategoriaFlag = false;
          this.newCategoriaOverlay = false;
        },
        (error) => {
          console.error("No se pudo conectar con el servicio");
          console.error(error);
          this.EditarCategoriaFlag = false;
          this.newCategoriaOverlay = false;
          this.newCategoria = {};
        }
      );
      this.newCategoriaOverlay = false;
    },
    eliminarCategoria(categoriaId) {
      console.log(categoriaId);
      this.$store.dispatch("deleteCategoria", categoriaId).then(
        (response) => {
          if (response) {
            this.categorias = this.$store.getters.getCategorias;
            this.message.content = "Se Elimino la categoria con exito";
            this.message.state = "success";
            this.newCategoria = {};
            this.filteredCategorias = this.$store.getters.getCategorias;
          } else {
            console.log("no se pudo actualizar la categoria");
            this.message.content = "No se pudo actualizar";
            this.message.state = "error";
            this.newCategoria = {};
          }
        },
        (error) => {
          console.error("No se pudo conectar con el servicio");
          console.error(error);
        }
      );
    },
    GoTo(pagename) {
      this.$router.push(pagename);
    },
    GotoEmpresa(categoriaId) {
      console.log(categoriaId);
      //this.$router.push({path: `empresa/${categoriaId}`});
      this.$router.push({
        name: "empresabycategoriaid",
        params: { categoriaId },
      });
    },
  },
};
</script>

<style>
</style> 