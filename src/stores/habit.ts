import { defineStore } from "pinia";
import { ref } from "vue";

interface Habit {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  completeCount: number;
  todyCompleted: boolean;
}

export const useHabitStore = defineStore("Habit", () => {
  const habitList = ref<Habit[]>([]);

  return { habitList };
});
