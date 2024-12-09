<script setup lang="ts">
import { ref } from "vue";
import { useComponentStateStore } from "../stores/component-state";
import { useHabitStore } from "../stores/habit";

const componentStateStore = useComponentStateStore();

const habitStore = useHabitStore();

const showEditHabitModal = ref(false);
</script>

<template>
  <dialog class="modal z-50" :class="{ 'modal-open': showEditHabitModal }">
    <div class="modal-box w-1/2 max-w-full">
      <div class="flex flex-col justify-center items-center">
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 w-24 text-end"> ID: </span>
          <input
            type="text"
            placeholder="ID"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 w-24 text-end"> Name: </span>
          <input
            type="text"
            placeholder="Name"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center mb-2">
          <span class="p-3 w-24 text-end"> StartTime: </span>
          <input
            type="text"
            placeholder="StartTime"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="flex w-full justify-center">
          <span class="p-3 w-24 text-end"> EndTime: </span>
          <input
            type="text"
            placeholder="EndTime"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="showEditHabitModal = false"
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
        <button
          class="btn btn-outline btn-primary"
          @click="showEditHabitModal = true"
        >
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
                  habit.startMin.toString().padStart(2, "0")
                }}
              </td>
              <td>
                {{
                  habit.endHour.toString().padStart(2, "0") +
                  ":" +
                  habit.endMin.toString().padStart(2, "0")
                }}
              </td>
              <td>
                <button class="btn btn-outline btn-secondary mr-2">
                  Modify
                </button>
                <button class="btn btn-outline btn-warning">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="componentStateStore.showHabitTableModal = false"
            class="btn btn-outline btn-primary mr-2"
          >
            Save
          </button>
          <button
            @click="componentStateStore.showHabitTableModal = false"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
