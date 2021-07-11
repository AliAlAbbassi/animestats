<template>
  <div>
    <c-circular-progress v-if="status == 'loading'" is-indeterminate />
    <div v-if="isEmpty() && status == 'success'">
      <AnimeCard
        class="animecard"
        v-for="show in watchlist"
        :key="show.animeId"
        :show="show"
      />
    </div>
    <div v-else class="nodatatext">No anime added</div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");
body {
  background-color: #141414;
  font-family: "Rubik";
}

.nodatatext {
  font-family: "Rubik", sans-serif;
  color: white;
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
import Vue from "vue";
import axios from "axios";
import { UserWatchListOption } from "../types/options";
import Profile from "~/components/Profile.vue";
import { CCircularProgress } from "@chakra-ui/vue";

export default Vue.extend({
  components: { Profile, CCircularProgress },
  layout: "watchlist",
  data() {
    return {
      watchlist: [],
      status: "loading",
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
          this.status = "success";
        });
    },
    isEmpty() {
      return Object.keys(this.watchlist).length === 0;
    },
  },
});
</script>
