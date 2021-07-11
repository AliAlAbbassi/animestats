<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main">
          <CReset />
          <Profile :User="User" />
          <div class="menu">
            <p :class="AnimeText" @click="handleAnimeUnderlineStyle()">Anime</p>
            <p class="line">|</p>
            <p :class="MangaText" @click="handleMangaUnderlineStyle()">Manga</p>
          </div>
          <Nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<style >
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

body {
  background-color: #141414;
  font-family: "Rubik";
}

.container {
  max-width: 350px;
  min-width: 350px;
  margin: auto;
}
.menu {
  display: flex;
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 30px;
  justify-content: center;
}

.line {
  margin: 0px 10px;
  cursor: pointer;
}

.text {
  cursor: pointer;
}

.underlined {
  text-decoration: underline;
  cursor: pointer;
}
</style>

<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox
} from "@chakra-ui/vue";

export default {
  name: "App",
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox
  },
  data() {
    return {
      User: {
        username: process.client ? localStorage.getItem("username") : "",
        imgUrl: ""
      },
      AnimeText: "underlined",
      MangaText: "text"
    };
  },
  created() {
    if (this.$router.currentRoute == "mangawatchlist") {
      this.$router.push("/mangawatchlist");
    } else {
      this.$router.push("/animewatchlist");
    }
  },
  methods: {
    handleMangaUnderlineStyle() {
      this.AnimeText = "text";
      this.MangaText = "underlined";
      this.$router.push("mangawatchlist");
    },
    handleAnimeUnderlineStyle() {
      this.AnimeText = "underlined";
      this.MangaText = "text";
      this.$router.push("animewatchlist");
    }
  }
};
</script>
