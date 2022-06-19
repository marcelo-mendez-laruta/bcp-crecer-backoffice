<template>
  <v-row align="center" justify="center" style="height: 100%">
    <v-col cols="4">
      <v-card>
        <v-row justify="center">
          <v-col cols="10">
            <v-img
              contain
              src="https://static.cdnlogo.com/logos/b/12/bcp.svg"
              max-width="100%"
            ></v-img>
          </v-col>
          <v-col cols="10">
            <v-text-field
              dense
              v-model="request.telefono"
              label="Telefono"
              outlined
            ></v-text-field>
            <v-text-field
              dense
              v-model="request.password"
              label="Contraseña"
              outlined
              :type="showpassword ? 'text' : 'password'"
              :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpassword = !showpassword"
            ></v-text-field>
            <v-alert
              class="mt-3"
              dense
              text
              :type="message.state"
              v-if="message.content != ''"
            >
              {{ message.content }}
            </v-alert>
            <v-btn @click="Login" color="primary" block
              ><v-icon left> mdi-login </v-icon> Login
            </v-btn>
          </v-col>
          <v-col cols="10">
            <v-btn
            @click="Registrarse"
              text
              color="primary"
              block
            >
            Registrarse
            </v-btn>          
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    request: {},
    showpassword: false,
    message: {
      content: "",
      state: "",
    },
  }),
  beforeMount() {
    this.auth();
  },
  methods: {
    auth() {
      if (!this.$store.state.loggedin) {
        if (localStorage.user) {
          this.$store.commit("SET_USER", localStorage.user);
          this.$router.push("/");
        }
      }
    },
    GoTo(pagename) {
      this.$router.push(pagename);
    },
    Login() {
      this.$store.dispatch("login", this.request).then((response) => {
        if (response) {
          this.$router.push("/");
        } else {
          this.message.content = "Usuario o Contraseña invalidos";
          this.message.state = "error";
        }
      });
    },
    Registrarse() {
      this.$router.push("/Registrar");
    }
  },
};
</script>

<style>
</style>