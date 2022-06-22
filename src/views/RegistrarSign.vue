<template>
  <v-container>
    <v-row>
      <v-col cols="11"> boton </v-col>
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
};
</script>

<style>
</style>