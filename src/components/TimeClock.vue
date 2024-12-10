<script setup lang="ts">
import { useComponentStateStore } from "../stores/component-state";
import { useCurrentTimeStore } from "../stores/current-time";
import { useHabitStore } from "../stores/habit";

const habitStore = useHabitStore();

const currentTimeStore = useCurrentTimeStore();

const componentStateStore = useComponentStateStore();
</script>

<template>
  <div
    v-show="componentStateStore.showTimeClockComponent"
    class="bg-slate-100 rounded-xl p-8 md:p-0"
  >
    <div class="h-full p-5 select-none">
      <p class="text-center">专注事项:</p>
      <p class="text-center">
        {{ habitStore.focusHabit === null ? "无" : habitStore.focusHabit.name }}
      </p>
      <p class="text-center">
        {{ currentTimeStore.dateTimeStr }}
      </p>
    </div>
  </div>
</template>
