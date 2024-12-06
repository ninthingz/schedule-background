<script setup lang="ts">
import { useCurrentTimeStore } from "../stores/current-time";

const currentTimeStore = useCurrentTimeStore();
</script>

<template>
  <div class="bg-slate-100 rounded-xl p-8 md:p-0">
    <span class="text-center h-full p-5 select-none">
      {{ currentTimeStore.dateTimeStr }}
    </span>
  </div>
</template>
