<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11">
        <p class="text-h5 font-weight-bold">Categorias</p>
      </v-col>
      <v-col cols="11" md="4">
        <v-row v-for="categoria in categorias" :key="categoria.id">
          <v-col cols="12" class="my-3">
            <v-card @click="GotoEmpresa(categoria.id)">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="categoria.imagen"
                    height="100%"
                  ></v-img>
                </v-col>
                <v-col cols="8" class="pl-3 pt-5">
                  <p class="text-h5 font-weight-bold" style="height: 75px">
                    {{ categoria.nombre }}
                  </p>
                  <p class="text-caption">{{ categoria.nombre }}</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" class="text-center">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col cols="11" md="5">
        <v-card>
          <v-card-text>
            <p class="text-h5 font-weight-bold">Nueva Categoria</p>
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
            <v-btn @click="postCategoria" color="primary"> Registrar </v-btn>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    categorias: [],
    message: {
      content: "",
      state: "",
    },
    newCategoria: {},
  }),
  beforeMount() {
    this.auth();
    this.getCategorias();
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
      });
    },
    funcat: (cat = this.categorias) => {
      console.log(cat);
    },
    postCategoria() {
      console.log(this.newCategoria);
      this.newCategoria.color = "sin color";
      this.$store.dispatch("addCategoria", this.newCategoria).then(
        (response) => {
          if (response) {
            this.categorias = this.$store.getters.getCategorias;
            this.message.content = "Se registro la categoria con exito";
            this.message.state = "success";
            this.newCategoria = {};
            this.funcat();
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