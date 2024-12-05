<script setup lang="ts">
import { onMounted, ref } from "vue";

const timeRoulette = ref<HTMLCanvasElement>();

const timeRouletteCtx = ref<CanvasRenderingContext2D>();

onMounted(() => {
  if (timeRoulette.value) {
    timeRoulette.value.width = 240;
    timeRoulette.value.height = 640;
    timeRouletteCtx.value = timeRoulette.value.getContext("2d")!;
    draw();
  }
});

function draw() {
  if (!timeRouletteCtx.value) {
    return;
  }
  timeRouletteCtx.value.beginPath();
  timeRouletteCtx.value.arc(310, 320, 300, 0, 2 * Math.PI);
  timeRouletteCtx.value.strokeStyle = "gray";
  timeRouletteCtx.value.lineWidth = 5;
  timeRouletteCtx.value.stroke();

  timeRouletteCtx.value.beginPath();
  timeRouletteCtx.value.arc(310, 320, 220, 0, 2 * Math.PI);
  timeRouletteCtx.value.strokeStyle = "gray";
  timeRouletteCtx.value.lineWidth = 5;
  timeRouletteCtx.value.stroke();
}
</script>

<template>
  <div style="width: 240px; height: 640px" class="bg-slate-300">
    <canvas ref="timeRoulette" class="w-full h-hull"> </canvas>
  </div>
</template>
