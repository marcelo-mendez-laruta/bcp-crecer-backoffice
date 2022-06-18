<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="11" md="8">
        <v-card>
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
      <v-col cols="11" md="5">
        <p class="text-h5 font-weight-bold">Produtos registrados</p>
        <v-row v-for="producto in productos" :key="producto.id">
          <v-col cols="12" class="my-3">
            <v-card @click="OpenProducto(producto)">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="producto.imagen"
                    height="100%"
                  ></v-img>
                </v-col>
                <v-col cols="8" class="pl-3 pt-5">
                  <p class="text-h5 font-weight-bold">{{ producto.nombre }}</p>
                  <p class="text-caption">{{ producto.nombre }}</p>
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
            <p class="text-h5 font-weight-bold">Nuevo Producto</p>
            <v-text-field
              label="Nombre"
              outlined
              dense
              v-model="newProducto.nombre"
            ></v-text-field>
            <v-text-field
              label="Imagen"
              outlined
              dense
              v-model="newProducto.imagen"
            ></v-text-field>
            <v-text-field
              label="Descripcion"
              outlined
              dense
              v-model="newProducto.descripcion"
            ></v-text-field>
            <v-text-field
              v-model="newProducto.precio"
              label="Precio"
              value="0"
              type="number"
              prefix="$BOL"
              hide-details
              single-line
              dense
              outlined
              class="mb-3"
            ></v-text-field>
            <v-text-field
              class="mb-3"
              v-model="newProducto.descuento"
              label="Descuento"
              value="0"
              min="0"
              max="100"
              type="number"
              prefix="%"
              hide-details
              single-line
              dense
              outlined
            ></v-text-field>
            <v-divider v-if="newProducto.nombre != null"></v-divider>
            <p
              v-if="newProducto.nombre != null"
              class="text-caption font-weight-bold"
            >
              Previsualizacion
            </p>
            <v-card v-if="newProducto.nombre != null" class="ma-7">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    v-if="newProducto.imagen != null"
                    cover
                    class="rounded-lg rounded-br-0 rounded-tr-0"
                    :src="newProducto.imagen"
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
                    {{ newProducto.nombre }}
                  </p>
                  <p class="text-caption">{{ newProducto.nombre }}</p>
                </v-col>
              </v-row>
            </v-card>
            <v-btn @click="postProducto" color="primary"> Registrar </v-btn>
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
    <v-overlay :value="overlay">
      <v-card
        color="white"
        class="mx-auto my-12"
        max-width="374"
        v-click-outside="CloseOverlay"
      >
        <v-img height="250" :src="producto.imagen"></v-img>

        <v-card-title class="black--text">{{ producto.nombre }}</v-card-title>

        <v-card-text>
          <div class="black--text text-h6 font-weight-bold">Precio</div>
          <div class="text-subtitle-1 black--text">
            $BOL {{ producto.precio }}
          </div>
          <div class="black--text text-h6 font-weight-bold">Descuento</div>
          <div class="text-subtitle-1 black--text">
            {{ producto.descuento }} %
          </div>
          <div class="black--text text-h6 font-weight-bold">Descripción</div>
          <div class="black--text">
            {{ producto.descripcion }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="amber darken-3" text> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    empresa: {},
    overlay: false,
    message: {
      content: "",
      state: "",
    },
    productos: [],
    newProducto: {},
    producto: {},
  }),
  beforeMount() {
    this.auth();
    this.getProductos(this.$route.params.empresa.id);
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
    getProductos: function (empresaId) {
      console.log(this.$route.params.empresa);
      this.empresa = this.$route.params.empresa;
      console.log(this.empresa);
      let empresa = {
        productoId: empresaId,
      };
      this.$store.dispatch("getProductos", empresa).then((response) => {
        this.productos = response;
      });
    },
    postProducto() {
      let producto = this.newProducto;
      producto.empresaId = this.$route.params.empresa.id;
      producto.color = "sin color";
      this.$store.dispatch("addProducto", producto).then(
        (response) => {
          if (response) {
            this.productos = this.$store.getters.getProductos;
            this.message.content = "Se registro el producto con exito";
            this.message.state = "success";
            this.newEmpresa = {};
          } else {
            console.log("no se pudo agregar el producto.");
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
    GoTo(pagename) {
      this.$router.push(pagename);
    },
    OpenProducto(producto) {
      this.producto = producto;
      this.overlay = true;
    },
    CloseOverlay() {
      this.overlay = false;
      this.producto = {};
    },
  },
};
</script>

<style>
</style>