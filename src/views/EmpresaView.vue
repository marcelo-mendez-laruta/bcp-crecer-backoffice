<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11">
        <v-btn
          tile
          text
          color="black"
          @click="hasHistory() ? $router.go(-1) : $router.push('/')"
        >
          <v-icon left> mdi-arrow-left </v-icon>
          Atras
        </v-btn>
      </v-col>
      <v-col cols="11" md="8">
        <v-card>
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
              <p class="text-h5 font-weight-bold">{{ categoria.nombre }}</p>
              <p class="text-caption">{{ categoria.nombre }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="11" md="5">
        <p class="text-h5 font-weight-bold">Empresas registradas</p>
        <v-row v-for="empresa in empresas" :key="empresa.id">
          <v-col cols="12" class="my-3">
            <v-card @click="GotoProductos(empresa)">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="empresa.imagen"
                    height="100%"
                  ></v-img>
                </v-col>
                <v-col cols="8" class="pl-3 pt-5">
                  <p class="text-h5 font-weight-bold">{{ empresa.nombre }}</p>
                  <p class="text-caption">{{ empresa.nombre }}</p>
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
            <p class="text-h5 font-weight-bold">Nueva Empresa</p>
            <v-text-field
              label="Nombre"
              outlined
              dense
              v-model="newEmpresa.nombre"
            ></v-text-field>
            <v-text-field
              label="Imagen"
              outlined
              dense
              v-model="newEmpresa.imagen"
            ></v-text-field>
            <v-divider v-if="newEmpresa.nombre != null"></v-divider>
            <p
              v-if="newEmpresa.nombre != null"
              class="text-caption font-weight-bold"
            >
              Previsualizacion
            </p>
            <v-card v-if="newEmpresa.nombre != null" class="ma-7">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    v-if="newEmpresa.imagen != null"
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="newEmpresa.imagen"
                    height="100%"
                  ></v-img>
                  <v-img
                    v-else
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    src="https://picsum.photos/200/300?random=1"
                    height="100%"
                  ></v-img>
                </v-col>
                <v-col cols="8" class="pl-3 pt-5">
                  <p class="text-h5 font-weight-bold">
                    {{ newEmpresa.nombre }}
                  </p>
                  <p class="text-caption">{{ newEmpresa.nombre }}</p>
                </v-col>
              </v-row>
            </v-card>
            <v-btn @click="postEmpresa" color="primary"> Registrar </v-btn>
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
    categoria: {},
    categorias: [],
    empresas: [],
    message: {
      content: "",
      state: "",
    },
    newEmpresa: {},
  }),
  beforeMount() {
    this.auth();
    this.getEmpresas(this.$route.params.categoriaId);
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
        response.forEach((categoria) => {
          if (categoria.id == this.$route.params.categoriaId) {
            this.categoria = categoria;
          }
        });
      });
    },
    getEmpresas: function (categoriaId) {
      let categoria = {
        categoriaId: categoriaId,
      };
      console.log(categoria);
      this.$store.dispatch("getEmpresas", categoria).then((response) => {
        this.empresas = response;
        console.log(response);
      });
    },
    postEmpresa() {
      let empresa = this.newEmpresa;
      empresa.categoriaId = this.$route.params.categoriaId;
      empresa.color = "sin color";
      this.$store.dispatch("addEmpresa", empresa).then(
        (response) => {
          if (response) {
            this.empresas = this.$store.getters.getEmpresas;
            this.message.content = "Se registro la empresa con exito";
            this.message.state = "success";
            this.newEmpresa = {};
          } else {
            console.log("no se pudo agregar la empresa.");
            this.message.content = "No se pudo agregar";
            this.message.state = "error";
            this.newEmpresa = {};
          }
        },
        (error) => {
          console.error("No se pudo conectar con el servicio");
          console.error(error);
        }
      );
    },
    hasHistory() {
      return window.history.length > 2;
    },
    GoTo(pagename) {
      this.$router.push(pagename);
    },
    GotoProductos(empresa) {
      this.$router.push({
        name: "productos",
        params: { empresa: empresa, empresaId: empresa.id },
      });
    },
  },
};
</script>

<style>
</style>