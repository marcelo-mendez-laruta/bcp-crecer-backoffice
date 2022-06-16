<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0" color="white">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-img
          contain
          src="https://static.cdnlogo.com/logos/b/12/bcp.svg"
          max-height="75"
          max-width="150"
        ></v-img>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item class="px-5 py-5">
            <v-img src="https://static.cdnlogo.com/logos/b/12/bcp.svg"></v-img>
          </v-list-item>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item @click="GoTo('categorias')">
              <v-list-item-title>Categorias</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoTo('categorias')">
              <v-list-item-title>Empresas</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
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
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
