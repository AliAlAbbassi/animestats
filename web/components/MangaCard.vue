<template>
  <c-box v-if="show" border-width="0px" rounded="lg" overflow="hidden" d="flex">
    <c-image
      class="mangacover"
      :src="show.mangaImagePath"
      :alt="show.mangaTitle"
    />
    <c-box class="scndsection">
      <c-box d="flex" align-items="baseline">
        <!-- <c-badge rounded="full" px="2" variant-color="green"> New </c-badge> -->
        <c-box
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          {{ show.mangaNumEpisodes }} Episodes &bull;
          {{ show.numWatchedEpisodes }} Watched
        </c-box>
      </c-box>
      <c-box
        font-weight="semibold"
        class="mangaTitle"
        as="h4"
        line-height="tight"
        is-truncated
      >
        {{ show.mangaTitle }}
      </c-box>
      <c-box>
        {{ show.mangaAiringStatus }}
        <c-box as="span" color="gray.600" fontSize="sm">
          / {{ show.mangaNumEpisodes }}
        </c-box>
      </c-box>
      <c-box d="flex" align-items="center">
        <c-icon
          v-for="(_, i) in Array(5).fill('')"
          name="star"
          :key="i"
          :color="i < show.score ? 'green.500' : 'gray.300'"
        />
      </c-box>
      <c-box as="span" color="gray.600" font-size="sm">
        score {{ show.score }}
      </c-box>
    </c-box>
  </c-box>
  <p v-else class="text">No manga added</p>
</template>

<style scoped>
.mangacover {
  width: "100%";
  max-height: 200px;
  border-radius: 5px;
}

.scndsection {
  max-width: 150px;
  min-height: 150px;
}

.text {
  color: white;
  cursor: pointer;
  font-size: 20px;
}

.mangaTitle {
  color: white;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
});
</script>