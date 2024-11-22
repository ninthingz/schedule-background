<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";

const year = ref(0);
const month = ref(0);
const day = ref(0);
const hour = ref(0);
const min = ref(0);
const sec = ref(0);

function updateClock() {
  const time = new Date();

  year.value = time.getFullYear();
  month.value = time.getMonth();
  day.value = time.getDay();
  hour.value = time.getHours();
  min.value = time.getMinutes();
  sec.value = time.getSeconds();
}

setInterval(updateClock, 1000);

updateClock();
</script>

<template>
  <div class="h-full flex flex-col justify-center">
    <h1 class="text-center">
      {{ moment({ hour: hour, minute: min, second: sec }).format("HH:mm:ss") }}
    </h1>
  </div>
</template>

<style scoped></style>
