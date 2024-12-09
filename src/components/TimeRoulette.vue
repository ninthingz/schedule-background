<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { useCurrentTimeStore } from "../stores/current-time";
import { Habit, useHabitStore } from "../stores/habit";

const currentTimeStore = useCurrentTimeStore();
const habitStore = useHabitStore();

const timeRoulette = ref<HTMLCanvasElement>();

const timeRouletteCtx = ref<CanvasRenderingContext2D>();

onMounted(() => {
  if (timeRoulette.value) {
    const dpr = window.devicePixelRatio;
    timeRoulette.value.width = window.innerWidth * 0.15 * dpr;
    timeRoulette.value.height = window.innerHeight * 0.7 * dpr;
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
        currentTimeStore.min < habit.startMin
      ) {
        return;
      }
      if (
        currentTimeStore.hour === habit.endHour &&
        currentTimeStore.min >= habit.endMin
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
          currentTimeStore.min < habit.startMin
        ) {
          return;
        }
        if (
          currentTimeStore.hour === habit.endHour &&
          currentTimeStore.min >= habit.endMin
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
  const leftX = 40;
  const rightX = timeRoulette.value.width - 10;
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
      (yestodayHabitStartHour - hourStart + habit.startMin / 60) * hourHeight;
    const yestodayHabitEndHeight =
      hourStartHeight +
      (yestodayHabitEndHour - hourStart + habit.endMin / 60) * hourHeight;

    const todayHabitStartHeight =
      hourStartHeight +
      (todayHabitStartHour - hourStart + habit.startMin / 60) * hourHeight;
    const todayHabitEndHeight =
      hourStartHeight +
      (todayHabitEndHour - hourStart + habit.endMin / 60) * hourHeight;

    const tomorrowHabitStartHeight =
      hourStartHeight +
      (tomorrowHabitStartHour - hourStart + habit.startMin / 60) * hourHeight;
    const tomorrowHabitEndHeight =
      hourStartHeight +
      (tomorrowHabitEndHour - hourStart + habit.endMin / 60) * hourHeight;

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

  timeRouletteCtx.value.beginPath();
  timeRouletteCtx.value.moveTo(leftX + 2, middleY);
  timeRouletteCtx.value.lineTo(rightX - 50, middleY);
  timeRouletteCtx.value.lineWidth = 2;
  timeRouletteCtx.value.strokeStyle = "rgba(22, 133, 169, 0.8)";
  timeRouletteCtx.value.stroke();
}
</script>

<template>
  <div style="width: 15vw; height: 70vh">
    <canvas ref="timeRoulette" class="w-full h-hull"> </canvas>
  </div>
</template>
