import { defineStore } from "pinia";
import { ref } from "vue";

interface Habit {
  id: string;
  name: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  description: string;
  completeCount: number;
  todyCompleted: boolean;
}

export const useHabitStore = defineStore("Habit", () => {
  const habitList = ref<Habit[]>([
    {
      id: "1",
      name: "Morning Exercise",
      startHour: 16,
      startMin: 0,
      endHour: 17,
      endMin: 30,
      description: "Do some exercise in the morning",
      completeCount: 0,
      todyCompleted: false,
    },
  ]);

  return { habitList };
});
