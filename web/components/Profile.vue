<template>
  <div class="container">
    <p class="username">@{{ User.username }}</p>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.username {
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 40px;
}

.container {
  max-width: 350px;
  margin: 10px auto;
}
</style>
<script lang="ts">
import Vue from "vue";
import { ProfilePropsUser } from "../types/options";

export default Vue.extend({
  props: {
    User: {
      type: Object as () => ProfilePropsUser,
    },
  },
});
</script>