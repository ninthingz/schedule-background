<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";

const year = ref(0);
const month = ref(0);
const day = ref(0);
const hour = ref(0);
const min = ref(0);
const sec = ref(0);

const dateTimeStr = ref("");

function updateClock() {
  const dateTime = moment();

  year.value = dateTime.get("year");
  month.value = dateTime.get("month") + 1;
  day.value = dateTime.get("date");
  hour.value = dateTime.get("hour");
  min.value = dateTime.get("minute");
  sec.value = dateTime.get("second");
  dateTimeStr.value = dateTime.format("YYYY-MM-DD HH:mm:ss");
}

setInterval(updateClock, 1000);

updateClock();
</script>

<template>
  <div class="bg-slate-100 rounded-xl p-8 md:p-0">
    <span class="text-center h-full p-5 select-none">
      {{ dateTimeStr }}
    </span>
  </div>
</template>
