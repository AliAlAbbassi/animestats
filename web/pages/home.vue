<template>
  <div class="home">
    <Profile :User="User" />
    <div class="menu">
      <p :class="AnimeText" @click="toggleUnderlineStyle()">Anime</p>
      <p class="line">|</p>
      <p :class="MangaText" @click="toggleUnderlineStyle()">Manga</p>
    </div>
    <AnimeCard
      v-if="type == 'anime'"
      class="animecard"
      v-for="show in watchlist"
      :key="show.animeId"
      :show="show"
    />
    <MangaCard
      v-else
      class="mangacard"
      v-for="show in watchlist"
      :key="show.mangaId"
      :show="show"
    />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.home {
  max-width: 350px;
  min-width: 350px;
  margin: auto;
}

body {
  background-color: #141414;
  font-family: "Rubik";
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

.menu {
  display: flex;
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  justify-content: center;
}

.animecard {
  padding: 20px 0px;
  margin: 30px auto;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 2px 0 #651b85;
  /* background-image: url("https://cdn.myanimelist.net/r/96x136/images/anime/1477/106613.jpg?s=2d49cca54d1ec6cc3dcd2fba4ccf68da"); */
}
</style>

<script lang="ts">
import axios from "axios";
import { UserWatchListOption } from "../types/options";
import Profile from "~/components/Profile.vue";

export default {
  name: "App",
  components: { Profile },
  data() {
    return {
      watchlist: [],
      User: {
        username: process.client ? localStorage.getItem("username") : "",
        imgUrl: "",
      },
      AnimeText: "underlined",
      MangaText: "text",
      type: "anime",
    };
  },
  async created() {
    if (process.client) {
      if (localStorage.getItem("username")) {
        await this.getUserWatchlist({
          username: localStorage.getItem("username")!,
          after: 0,
          type: this.type,
        });
      } else {
        this.$router.push("/");
      }
    } else {
      console.log("we're on the server");
    }
  },
  methods: {
    async getUserWatchlist(options: UserWatchListOption) {
      const { username, after, type } = options;
      axios
        .get(`/watchlist?username=${username}&after=${after}&type=${type}`, {
          baseURL: "http://localhost:4000",
        })
        .then((data) => {
          this.watchlist = data.data;
        });
    },
    async fetchUserList() {
      if (process.client) {
        if (localStorage.getItem("username")) {
          await this.getUserWatchlist({
            username: localStorage.getItem("username")!,
            after: 0,
            type: this.type,
          });
        } else {
          this.$router.push("/");
        }
      } else {
        console.log("we're on the server");
      }
    },
    handleMangaUnderlineStyle() {
      this.AnimeText = "text";
      this.MangaText = "underlined";
      this.type = "manga";
      this.fetchUserList();
    },
    handleAnimeUnderlineStyle() {
      this.AnimeText = "underlined";
      this.MangaText = "text";
      this.type = "anime";
      this.fetchUserList();
    },
  },
};
</script>
