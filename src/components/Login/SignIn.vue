<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="700">
    <v-row>
      <v-col md="6">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <div class="imgbx">
          <v-img
            v-if="NewSignIn.imagen != null"
            cover
            class="rounded-lg rounded-br-0 rounded-tr-0"
            :src="NewSignIn.imagen"
            height="100%"
          >
          </v-img>
          <v-img
            v-else
            cover
            class="rounded-lg rounded-br-0 rounded-tr-0"
            src="https://i.ytimg.com/vi/sju9XsN6Hb0/maxresdefault.jpg"
            height="100%"
          >
          </v-img>
        </div>
        <!-- <v-img class="spacing-playground pa-6" contain
                    src="https://i.ytimg.com/vi/sju9XsN6Hb0/maxresdefault.jpg" max-width="100%"></v-img> -->

        <v-card-title>Registro de usuario.</v-card-title>
        <v-card-text>
          <br />
          <div>
            Registrate y disfruta de la mejor plataforma para ofrecer tus
            productos.
          </div>
        </v-card-text>

        <v-card-title>Ingresa tus datos.</v-card-title>

        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-container fluid>
            <v-text-field
              label="Correo electrónico"
              outlined
              v-model="NewSignIn.email"
            ></v-text-field>
            <v-text-field
              label="Teléfono"
              outlined
              v-model="NewSignIn.telefono"
            ></v-text-field>
            <v-text-field
              v-model="NewSignIn.password"
              label="Contraseña"
              placeholder="Ingrese una contraseña."
              outlined
              :type="showpassword ? 'text' : 'password'"
              :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpassword = !showpassword"
            ></v-text-field>
          </v-container>
        </v-card-actions>
      </v-col>

      <v-col md="6">
        <v-card-actions>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="Nombres"
                  outlined
                  v-model="NewSignIn.nombre"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-col cols="6">
                <v-text-field
                  label="Apellido paterno"
                  outlined
                  v-model="NewSignIn.paterno"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Apellido materno"
                  outlined
                  v-model="NewSignIn.materno"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Fecha de nacimiento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :active-picker.sync="activePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row ajustify="center" no-gutters>
              <v-col cols="6">
                <v-text-field
                  label="C.I."
                  outlined
                  v-model="NewSignIn.idc"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="4">
                <v-select
                  :items="Extensiones"
                  outlined
                  v-model="NewSignIn.extidc"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="00"
                  outlined
                  v-model="NewSignIn.complementoidc"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row ajustify="center" no-gutters>
              <v-col class="d-flex" cols="12">
                <v-select
                  :items="TipoDoc"
                  label="Tipo de documento"
                  outlined
                  v-model="NewSignIn.tipoidc"
                ></v-select>
              </v-col>
            </v-row>

            <v-divider class="mx-4"></v-divider>
            <br />
            <v-row justify="center" no-gutters>
              <v-col>
                <v-text-field
                  label="Imagen"
                  outlined
                  v-model="NewSignIn.imagen"
                ></v-text-field>
                <p
                  v-if="NewSignIn.imagen != null"
                  class="text-caption font-weight-bold"
                >
                  Imagen cargada.
                </p>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-select
                  :items="Role"
                  outlined
                  label="Seleccione su rol"
                  v-model="NewSignIn.role"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>

        <v-card-actions>
          <v-container>
            <v-row justify="center">
              <v-col cols="5">
                <v-btn outlined color="rgb(252,81,133)" block @click="clear">
                  Limpiar
                </v-btn>
              </v-col>
              <v-col cols="7">
                <v-btn
                  depressed
                  color="rgb(33,230,193)"
                  block
                  @click="postSignIn"
                >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
            <v-alert
              class="mt-3"
              dense
              text
              :type="message.state"
              v-if="message.content != ''"
            >
              {{ message.content }}
            </v-alert>
          </v-container>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>


<script>
export default {
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,

    Extensiones: ["LP", "CB", "SC", "OR", "PO", "CH", "TJ", "PA", "BE"],
    TipoDoc: ["Carnet de identidad", "NIT"],
    Role: ["Administrador", "Usuario", "Cliente"],
    NewSignIn: {},

    showpassword: false,
    message: {
      content: "",
      state: "",
    },
  }),
  beforeMount() {},
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    validarTipDoc() {
      if (this.NewSignIn.tipoidc == "Carnet de identidad") {
        this.NewSignIn.tipoidc = "Q";
      } else if (this.NewSignIn.tipoidc == "NIT") {
        this.NewSignIn.tipoidc = "R";
      }
    },
    postSignIn() {
      this.NewSignIn.fecnac = this.date;
      this.NewSignIn.complementoidc = this.NewSignIn.complementoidc
        ? this.NewSignIn.complementoidc
        : "00";
      this.validarTipDoc();
      console.log(this.NewSignIn);
      this.$store.dispatch("addSignIn", this.NewSignIn).then(
        (response) => {
          if (response) {
            this.message.content = "Su usuario fue registrado correctamente.";
            this.message.state = "success";
            this.clear();
          } else {
            this.message.content =
              "Surgio un problema, contactese con el administrador del aplicativo.";
            this.message.state = "error";
            this.clear();
            console.log("No se pudo registrar al usuario.");
          }
        },
        (error) => {
          console.error("[postSignIn] No se pudo conectar al servicio.");
          console.error(error);
          this.clear();
        }
      );
    },
    clear() {
      this.NewSignIn = {};
    },
  },
};
</script>

<style>
.contendor-card {
  position: relative;
}

.botonAbajo {
  position: absolute;
  bottom: 0;
}

.card {
  position: relative;
  min-width: 200px;
  height: 130px;
  /* height: 250px; */
  transition: 0.5s;
  /* margin: 10px; */
  float: left;
}

.imgbx {
  left: 0px;
  top: 0px;
  width: 350px;
  height: 250px;
  transform: translateY(-12px);
  background: var(--fg-primary);
  /* border-radius: var(--bd-radius); */
  /* box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35); */
  overflow: hidden;
  transition: 0.5s;
}
</style>