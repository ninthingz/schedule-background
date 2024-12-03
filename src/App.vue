<script setup lang="ts">
import TimeRoulette from "./components/TimeRoulette.vue";
import TimeClock from "./components/TimeClock.vue";
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <TimeClock />
  </div>
  <TimeRoulette
    id="time-roulette"
    class="float-right absolute right-3"
  ></TimeRoulette>
</template>

<style scoped>
#time-roulette {
  top: 50%;
  transform: translateY(-50%);
}
</style>
