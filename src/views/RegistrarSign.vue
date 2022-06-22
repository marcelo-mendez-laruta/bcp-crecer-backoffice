<template>
  <v-container>
    <v-row>
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
      <v-col cols="11">
        <Registro />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Registro from "../components/Login/SignIn";

export default {
  components: {
    Registro,
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },
  },
};
</script>

<style>
</style>