<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { useCurrentTimeStore } from "../stores/current-time";
import { Habit, useHabitStore } from "../stores/habit";
import { useComponentStateStore } from "../stores/component-state";

const currentTimeStore = useCurrentTimeStore();
const habitStore = useHabitStore();

const timeRoulette = ref<HTMLCanvasElement>();

const timeRouletteCtx = ref<CanvasRenderingContext2D>();
const componentStateStore = useComponentStateStore();

const eyeOpen = ref(true);

watch(eyeOpen, () => {
  if (eyeOpen.value) {
    componentStateStore.showTimeClockComponent = true;
    componentStateStore.showTimeRouletteComponent = true;
    draw();
  } else {
    componentStateStore.showTimeClockComponent = false;
    componentStateStore.showTimeRouletteComponent = false;
  }
});

onMounted(() => {
  if (timeRoulette.value) {
    const dpr = window.devicePixelRatio;
    timeRoulette.value.width = window.innerWidth * 0.15 * dpr;
    timeRoulette.value.height = window.innerHeight * 0.7 * dpr - 30;
    timeRouletteCtx.value = timeRoulette.value.getContext("2d")!;
    draw();
  }
});

watch(() => currentTimeStore.min, minChange);

function minChange() {
  let focusHabit: Habit | null = null;
  habitStore.habitList.forEach((habit) => {
    if (
      currentTimeStore.hour >= habit.startHour &&
      currentTimeStore.hour < habit.endHour
    ) {
      if (
        currentTimeStore.hour === habit.startHour &&
        currentTimeStore.min < habit.startMinute
      ) {
        return;
      }
      if (
        currentTimeStore.hour === habit.endHour &&
        currentTimeStore.min >= habit.endMinute
      ) {
        return;
      }
      focusHabit = habit;
    }

    if (habit.endHour < habit.startHour) {
      if (
        currentTimeStore.hour >= habit.startHour ||
        currentTimeStore.hour < habit.endHour
      ) {
        if (
          currentTimeStore.hour === habit.startHour &&
          currentTimeStore.min < habit.startMinute
        ) {
          return;
        }
        if (
          currentTimeStore.hour === habit.endHour &&
          currentTimeStore.min >= habit.endMinute
        ) {
          return;
        }
        focusHabit = habit;
      }
    }
  });
  habitStore.focusHabit = focusHabit;
  draw();
}

function draw() {
  if (!timeRouletteCtx.value || !timeRoulette.value) {
    return;
  }
  timeRouletteCtx.value.clearRect(
    0,
    0,
    timeRoulette.value.width,
    timeRoulette.value.height
  );
  const leftX = 20;
  const rightX = timeRoulette.value.width - 20;
  const topY = 10;
  const bottomY = timeRoulette.value.height - 10;
  const middleY = timeRoulette.value.height / 2;

  const hourHeight = timeRoulette.value.height / 6;

  const offset = (currentTimeStore.min / 60) * hourHeight;

  let hourStartHeight = middleY - offset;
  let hourStart = currentTimeStore.hour;

  while (hourStartHeight > topY + hourHeight) {
    hourStartHeight -= hourHeight;
    hourStart -= 1;
    if (hourStart == -1) {
      hourStart = 23;
    }
  }

  const lingrad0 = timeRouletteCtx.value.createLinearGradient(
    timeRoulette.value.width / 2,
    0,
    timeRoulette.value.width / 2,
    timeRoulette.value.height
  );
  lingrad0.addColorStop(0, "rgba(204,255,255,0.1)");
  lingrad0.addColorStop(0.5, "rgba(204,255,255,0.5)");
  lingrad0.addColorStop(1, "rgba(204,255,255,0.1)");

  const lingrad1 = timeRouletteCtx.value.createLinearGradient(
    timeRoulette.value.width / 2,
    0,
    timeRoulette.value.width / 2,
    timeRoulette.value.height
  );
  lingrad1.addColorStop(0, "rgba(153,204,255,0.1)");
  lingrad1.addColorStop(0.5, "rgba(153,204,255,0.5)");
  lingrad1.addColorStop(1, "rgba(153,204,255,0.1)");

  const lingrad2 = timeRouletteCtx.value.createLinearGradient(
    timeRoulette.value.width / 2,
    0,
    timeRoulette.value.width / 2,
    timeRoulette.value.height
  );
  lingrad2.addColorStop(0, "rgba(204,204,255,0.1)");
  lingrad2.addColorStop(0.5, "rgba(204,204,255,0.5)");
  lingrad2.addColorStop(1, "rgba(204,204,255,0.1)");

  const lingradList = [lingrad0, lingrad1, lingrad2];

  let i = 0;
  habitStore.habitList.forEach((habit) => {
    const yestodayHabitStartHour = habit.startHour - 24;
    let yestodayHabitEndHour = habit.endHour - 24;
    if (habit.endHour < habit.startHour) {
      yestodayHabitEndHour = habit.endHour;
    }

    const todayHabitStartHour = habit.startHour;
    let todayHabitEndHour = habit.endHour;
    if (habit.endHour < habit.startHour) {
      todayHabitEndHour = habit.endHour + 24;
    }

    const tomorrowHabitStartHour = habit.startHour + 24;
    let tomorrowHabitEndHour = habit.endHour + 24;
    if (habit.endHour < habit.startHour) {
      tomorrowHabitEndHour = habit.endHour + 48;
    }

    const yestodayHabitStartHeight =
      hourStartHeight +
      (yestodayHabitStartHour - hourStart + habit.startMinute / 60) *
        hourHeight;
    const yestodayHabitEndHeight =
      hourStartHeight +
      (yestodayHabitEndHour - hourStart + habit.endMinute / 60) * hourHeight;

    const todayHabitStartHeight =
      hourStartHeight +
      (todayHabitStartHour - hourStart + habit.startMinute / 60) * hourHeight;
    const todayHabitEndHeight =
      hourStartHeight +
      (todayHabitEndHour - hourStart + habit.endMinute / 60) * hourHeight;

    const tomorrowHabitStartHeight =
      hourStartHeight +
      (tomorrowHabitStartHour - hourStart + habit.startMinute / 60) *
        hourHeight;
    const tomorrowHabitEndHeight =
      hourStartHeight +
      (tomorrowHabitEndHour - hourStart + habit.endMinute / 60) * hourHeight;

    timeRouletteCtx.value!.fillStyle = lingradList[i % 3];
    i++;
    timeRouletteCtx.value!.fillRect(
      leftX + 1,
      yestodayHabitStartHeight,
      rightX - leftX - 2,
      yestodayHabitEndHeight - yestodayHabitStartHeight
    );

    timeRouletteCtx.value!.fillRect(
      leftX + 1,
      todayHabitStartHeight,
      rightX - leftX - 2,
      todayHabitEndHeight - todayHabitStartHeight
    );

    timeRouletteCtx.value!.fillRect(
      leftX + 1,
      tomorrowHabitStartHeight,
      rightX - leftX - 2,
      tomorrowHabitEndHeight - tomorrowHabitStartHeight
    );

    timeRouletteCtx.value!.fillStyle = "#000";

    timeRouletteCtx.value!.fillText(
      habit.name,
      leftX + 5,
      yestodayHabitStartHeight + 50
    );

    timeRouletteCtx.value!.fillText(
      habit.name,
      leftX + 5,
      todayHabitStartHeight + 50
    );

    timeRouletteCtx.value!.fillText(
      habit.name,
      leftX + 5,
      tomorrowHabitStartHeight + 50
    );
  });

  const lingrad = timeRouletteCtx.value.createLinearGradient(
    timeRoulette.value.width / 2,
    0,
    timeRoulette.value.width / 2,
    timeRoulette.value.height
  );
  lingrad.addColorStop(0, "rgba(0,0,0,0.3)");
  lingrad.addColorStop(0.5, "#000");
  lingrad.addColorStop(1, "rgba(0,0,0,0.3)");
  timeRouletteCtx.value.strokeStyle = lingrad;
  timeRouletteCtx.value.fillStyle = lingrad;

  for (
    let { height, hour } = { height: hourStartHeight, hour: hourStart };
    height < bottomY;
    height += hourHeight
  ) {
    timeRouletteCtx.value.beginPath();
    timeRouletteCtx.value.moveTo(leftX, height);
    timeRouletteCtx.value.lineTo(rightX - 35, height);

    timeRouletteCtx.value.moveTo(rightX - 10, height);
    timeRouletteCtx.value.lineTo(rightX, height);

    timeRouletteCtx.value.lineWidth = 1;
    timeRouletteCtx.value.stroke();

    timeRouletteCtx.value.font = "16px Arial";
    timeRouletteCtx.value.fillText(
      hour.toString().padStart(2, "0"),
      rightX - 30,
      height + 5
    );
    hour = (hour + 1) % 24;
  }

  timeRouletteCtx.value.beginPath();
  timeRouletteCtx.value.moveTo(leftX, topY);
  timeRouletteCtx.value.lineTo(leftX, bottomY);
  timeRouletteCtx.value.lineWidth = 2;
  timeRouletteCtx.value.stroke();

  timeRouletteCtx.value.beginPath();
  timeRouletteCtx.value.moveTo(rightX, topY);
  timeRouletteCtx.value.lineTo(rightX, bottomY);
  timeRouletteCtx.value.lineWidth = 2;
  timeRouletteCtx.value.stroke();

  timeRouletteCtx.value.beginPath();
  timeRouletteCtx.value.moveTo(leftX + 2, middleY);
  timeRouletteCtx.value.lineTo(rightX - 50, middleY);
  timeRouletteCtx.value.lineWidth = 2;
  timeRouletteCtx.value.strokeStyle = "rgba(22, 133, 169, 0.8)";
  timeRouletteCtx.value.stroke();
}
</script>

<template>
  <div class="rounded-xl p-1" style="width: 15vw; height: 73vh">
    <div class="float-right pr-1">
      <button @click="eyeOpen = !eyeOpen" class="btn btn-ghost btn-xs h-6">
        <svg
          v-if="eyeOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <svg
          v-if="!eyeOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </button>
      <button
        @click="componentStateStore.showHabitTableModal = true"
        class="btn btn-ghost btn-xs h-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
    </div>
    <canvas
      v-show="componentStateStore.showTimeRouletteComponent"
      ref="timeRoulette"
      class="w-full h-hull"
      style="background-color: rgba(255, 255, 255, 0.2)"
    >
    </canvas>
  </div>
</template>
