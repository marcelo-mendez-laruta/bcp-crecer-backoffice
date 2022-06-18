<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0" color="white" v-if="!$route.meta.hideNavbar">
        <v-img
          contain
          src="https://static.cdnlogo.com/logos/b/12/bcp.svg"
          max-height="75"
          max-width="150"
        ></v-img>
        <v-spacer></v-spacer>
        <v-btn icon color="indigo" @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    GoTo(pagename) {
      this.$router.push(pagename);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
