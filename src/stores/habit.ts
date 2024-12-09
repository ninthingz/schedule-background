import { defineStore } from "pinia";
import { ref } from "vue";

export interface Habit {
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
      name: "上班",
      startHour: 8,
      startMin: 0,
      endHour: 12,
      endMin: 0,
      description: "上班",
      completeCount: 0,
      todyCompleted: false,
    },
    {
      id: "2",
      name: "午休",
      startHour: 12,
      startMin: 0,
      endHour: 13,
      endMin: 30,
      description: "午休",
      completeCount: 0,
      todyCompleted: false,
    },
    {
      id: "3",
      name: "上班",
      startHour: 13,
      startMin: 30,
      endHour: 17,
      endMin: 30,
      description: "上班",
      completeCount: 0,
      todyCompleted: false,
    },
  ]);

  const focusHabit = ref<Habit | null>(null);

  return { habitList, focusHabit };
});
