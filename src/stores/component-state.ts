import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentStateStore = defineStore("componentState", () => {
  const showHabitTableModal = ref(false);
  const showTimeClockComponent = ref(false);
  const showTimeRouletteComponent = ref(false);

  return {
    showHabitTableModal,
    showTimeClockComponent,
    showTimeRouletteComponent,
  };
});
