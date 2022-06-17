<template>
<v-container>
  <p>holaaaaaaa</p>
  <p>id {{ categoriaId }}</p>
</v-container>
</template>

<script>

export default {
  props: {
    categoriaId: Number,
  },
  data: () => ({

  }),
  beforeMount() {
    console.log("id: " + this.categoriaId);
  },
  methods: {
  }
};
</script>

<style>
</style>