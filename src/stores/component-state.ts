import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentStateStore = defineStore("componentState", () => {
  const showHabitTableModal = ref(false);
  const showTimeClockComponent = ref(true);
  const showTimeRouletteComponent = ref(true);

  return {
    showHabitTableModal,
    showTimeClockComponent,
    showTimeRouletteComponent,
  };
});
