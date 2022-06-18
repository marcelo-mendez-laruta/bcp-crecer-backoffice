<template>
  <v-container fluid>
    <p>categoria: {{ $route.params.categoriaId }}</p>
    <v-row justify="center">
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
      <v-col cols="11" md="3">
        <v-row v-for="empresa in empresas" :key="empresa.id">
          <v-col cols="12" class="my-3">
            <v-card>
              <v-row>
                <v-col cols="4" class="pa-0">
                  <v-img
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="empresa.imagen"
                  ></v-img>
                </v-col>
                <v-col cols="8">
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
              <v-row>
                <v-col cols="4">
                  <v-img
                    v-if="newEmpresa.imagen != null"
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="newEmpresa.imagen"
                  ></v-img>
                  <v-img
                    v-else
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    src="https://picsum.photos/200/300?random=1"
                  ></v-img>
                </v-col>
                <v-col cols="8">
                  <p class="text-h5 font-weight-bold">
                    {{ newEmpresa.nombre }}
                  </p>
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
    //categoriaId: $route.params.categoriaId,
    empresas: [],
    message: {
      content: "",
      state: "",
    },
    newEmpresa: {},
  }),
  beforeMount() {
    this.getEmpresas();
  },
  methods: {
    getEmpresas: function () {
      console.log("categoriaId: " + this.categoriaId);
      this.$store.dispatch("getEmpresas", this.categoriaId).then((response) => {
        this.empresas = response;
      });
    },
    funcat: (cat = this.empresas) => {
      console.log(cat);
    },
    postEmpresa() {
      console.log(this.newEmpresa);
      this.newEmpresa.color = "sin color";
      this.$store.dispatch("addCategoria", this.newEmpresa).then(
        (response) => {
          if (response) {
            this.empresas = this.$store.getters.getEmpresas;
            this.message.content = "Se registro la empresa con exito";
            this.message.state = "success";
            this.funcat();
          } else {
            console.log("no se pudo agregar la empresa.");
            this.message.content = "No se pudo agregar";
            this.message.state = "error";
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
  },
};
</script>

<style>
</style>