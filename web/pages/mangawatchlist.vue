<template>
  <div class="container">
    <c-circular-progress
      v-if="status == 'loading'"
      is-indeterminate
      class="circular"
    />
    <div v-if="isEmpty() && status === 'success'">
      <MangaCard
        v-if="isEmpty()"
        class="mangacard"
        v-for="show in watchlist"
        :key="show.mangaId"
        :show="show"
      />
    </div>
    <div v-else-if="status == 'success'" class="nodatatext">no manga added</div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap");

.container {
  text-align: center;
}

.circular {
  margin-top: 30px;
}

.nodatatext {
  font-family: "Rubik", sans-serif;
  color: white;
  text-align: center;
  margin-top: 50px;
}

.mangacard {
  padding: 20px 0px;
  margin: 30px auto;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 2px 0 #651b85;
}
</style>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { UserWatchListOption } from "../types/options";
import Profile from "~/components/Profile.vue";
import { CCircularProgress } from "@chakra-ui/vue";

export default Vue.extend({
  name: "App",
  components: { Profile, CCircularProgress },
  layout: "watchlist",
  data() {
    return {
      watchlist: [],
      type: "manga",
      status: "loading",
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
      return Object.keys(this.watchlist).length !== 0;
    },
  },
});
</script>
