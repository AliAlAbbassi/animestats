<template>
  <FormulateForm @submit="submit">
    <FormulateInput
      type="text"
      v-model="username"
      label="MyAnimeList Username"
    />
    <FormulateInput type="submit" label="Connect" />
  </FormulateForm>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      username: process.client ? localStorage.getItem("username") : "",
    };
  },
  created() {
    if (process.client && localStorage.getItem("username")) {
      this.$router.push("animewatchlist");
    }
  },
  methods: {
    submit() {
      localStorage.setItem("username", this.username!);
      this.$router.push("animewatchlist");
    },
  },
});
</script>