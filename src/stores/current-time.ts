import moment from "moment";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentTimeStore = defineStore("currentTime", () => {
  const year = ref(0);
  const month = ref(0);
  const day = ref(0);
  const hour = ref(0);
  const min = ref(0);
  const sec = ref(0);
  const dateTimeStr = ref("");

  let timerStart = false;

  function startTimer() {
    if (!timerStart) {
      timerStart = true;
      setInterval(updateClock, 1000);
    }
  }

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

  startTimer();

  return { year, month, day, hour, min, sec, dateTimeStr };
});
