<script setup lang="ts">
import { ref } from "vue";
import { useComponentStateStore } from "../stores/component-state";
import { Habit, useHabitStore } from "../stores/habit";

const componentStateStore = useComponentStateStore();

const habitStore = useHabitStore();

const showEditHabitModal = ref(false);

const habitEditing = ref<Habit>({
  id: 0,
  name: "",
  startHour: 0,
  startMinute: 0,
  endHour: 0,
  endMinute: 0,
  description: "",
  completeCount: 0,
  todyCompleted: false,
});

function newHabit() {
  habitEditing.value = {
    id: 0,
    name: "",
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
    description: "",
    completeCount: 0,
    todyCompleted: false,
  };
  showEditHabitModal.value = true;
}

function saveEditHabit() {
  if (habitEditing.value.id === 0) {
    habitStore.addHabit(habitEditing.value);
  }
  showEditHabitModal.value = false;
}

function saveHabitList() {
  habitStore.saveHabitList();
  componentStateStore.showHabitTableModal = false;
}

function modifyHabit(habit: Habit) {
  habitEditing.value = habit;
  showEditHabitModal.value = true;
}

function deleteHabit(habit: Habit) {
  habitStore.habitList.splice(
    habitStore.habitList.findIndex((h) => h.id === habit.id),
    1
  );
}
</script>

<template>
  <dialog class="modal z-50" :class="{ 'modal-open': showEditHabitModal }">
    <div class="modal-box w-1/2 max-w-full">
      <div class="flex flex-col justify-center items-center">
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 w-32 text-end"> Name: </span>
          <input
            v-model="habitEditing.name"
            type="text"
            placeholder="Name"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 text-end w-32"> StartHour: </span>
          <input
            v-model="habitEditing.startHour"
            type="number"
            placeholder="StartTime"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 w-32 text-end"> StartMinute: </span>
          <input
            v-model="habitEditing.startMinute"
            type="number"
            placeholder="StartTime"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 w-32 text-end"> EndHour: </span>
          <input
            v-model="habitEditing.endHour"
            type="number"
            placeholder="StartTime"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center">
          <span class="p-3 w-32 text-end"> EndMinute: </span>
          <input
            v-model="habitEditing.endMinute"
            type="number"
            placeholder="EndTime"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="saveEditHabit"
            class="btn btn-outline btn-primary mr-2"
          >
            Save
          </button>
          <button @click="showEditHabitModal = false" class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  <dialog
    class="modal z-10"
    :class="{ 'modal-open': componentStateStore.showHabitTableModal }"
  >
    <div class="modal-box w-3/4 max-w-full">
      <div>
        <button class="btn btn-outline btn-primary" @click="newHabit">
          New
        </button>
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Opration</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="habit in habitStore.habitList"
              :key="habit.id"
              class="hover"
            >
              <th>{{ habit.id }}</th>
              <td>{{ habit.name }}</td>
              <td>
                {{
                  habit.startHour.toString().padStart(2, "0") +
                  ":" +
                  habit.startMinute.toString().padStart(2, "0")
                }}
              </td>
              <td>
                {{
                  habit.endHour.toString().padStart(2, "0") +
                  ":" +
                  habit.endMinute.toString().padStart(2, "0")
                }}
              </td>
              <td>
                <button
                  @click="modifyHabit(habit)"
                  class="btn btn-outline btn-secondary mr-2"
                >
                  Modify
                </button>
                <button
                  @click="deleteHabit(habit)"
                  class="btn btn-outline btn-warning"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="saveHabitList"
            class="btn btn-outline btn-primary mr-2"
          >
            Save
          </button>
          <button
            @click="
              habitStore.loadHabitList();
              componentStateStore.showHabitTableModal = false;
            "
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
