import { defineStore } from "pinia";
import { ref } from "vue";

export interface Habit {
  id: number;
  name: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  description: string;
  completeCount: number;
  todyCompleted: boolean;
}

export const useHabitStore = defineStore("Habit", () => {
  const habitList = ref<Habit[]>([]);

  let loaded = false;

  const focusHabit = ref<Habit | null>(null);

  const loadHabitList = () => {
    const habitListJsonStr = localStorage.getItem("habitList");
    if (habitListJsonStr) {
      habitList.value = JSON.parse(habitListJsonStr);
      sortByStartTime();
    }
  };

  const saveHabitList = () => {
    sortByStartTime();
    localStorage.setItem("habitList", JSON.stringify(habitList.value));
  };

  const sortByStartTime = () => {
    habitList.value.sort((a, b) => {
      return (
        a.startHour * 60 + a.startMinute - (b.startHour * 60 + b.startMinute)
      );
    });
  };

  const addHabit = (habit: Habit) => {
    habit.id = habitList.value.length + 1;
    habitList.value.push(habit);
  };

  if (!loaded) {
    loaded = true;
    loadHabitList();
  }
  return { habitList, focusHabit, loadHabitList, saveHabitList, addHabit };
});
