<template>
  <FormulateForm @submit="submit" class="formContainer">
    <img
      src="https://official-ongoing-2.gamindustri.us/manga/Berserk/Part2/0281-006.png"
      alt="griffith"
      class="imgLogin"
    />
    <div class="sectionTwo">
      <p class="title">MAL username</p>
      <FormulateInput type="text" v-model="username" class="formInputText" />
      <FormulateInput type="submit" label="Connect" class="submitBtn" />
    </div>
  </FormulateForm>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

@media (min-width: 800px) {
  .formContainer {
    text-align: center;
    color: white;
    font-family: "Rubik";
    font-size: 25px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sectionTwo {
    margin: auto 30px;
  }

  .imgLogin {
    width: 400px;
    height: 600px;
    object-fit: cover;
  }
  .submitBtn {
    background-color: white;
    color: black;
    border-radius: 10px;
    max-width: 130px;
    margin: 0px auto;
  }

  .formInputText {
    margin-bottom: 30px;
    color: black;
  }

  .title {
    color: white;
    font-family: "Rubik";
    font-size: 25px;
  }
}

@media (max-width: 800px) {
  .title {
    color: white;
    font-family: "Rubik";
    font-size: 25px;
    margin-bottom: 5px;
  }

  .imgLogin {
    margin-bottom: 20px;
    width: 400px;
    height: 600px;
    object-fit: cover;
  }
  .formContainer {
    max-width: 350px;
    min-width: 350px;
    margin: auto;
    text-align: center;
    color: white;
    font-family: "Rubik";
    font-size: 25px;
    margin-top: 10px;
  }

  .formInputText {
    margin-bottom: 30px;
    color: black;
  }

  .submitBtn {
    background-color: white;
    color: black;
    border-radius: 10px;
    max-width: 130px;
    margin: 0px auto;
  }
}
</style>

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