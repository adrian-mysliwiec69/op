<script setup>
import { ref } from 'vue';
import { comparer } from '@/utils/sort.js';

import ButtonGet from '@/components/ButtonGet.vue';
import CardView from '@/components/CardView.vue';
import { useCounterStore } from '../stores/employeestore.js';
const store = useCounterStore();
store.getAll();
// import employeesData from '@/assets/json/employees';
let employees = ref([]);
let update = ref(false);

const laden = () => {
  window.location.reload();
};
const fetchEmployees = () =>
  (employees.value = store.employees.sort(({ name: objA }, { name: objB }) =>
    comparer(objA.last, objB.last),
  ));
const removeEmployee = (id) =>
  (employees.value = employees.value.filter((el) => el.id !== id));

const vla = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed!');
    return;
  }
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  // window.location.reload();
  registration.addEventListener('updatefound', () => (update.value = true));
  if (registration.waiting) update.value = true;
};
vla();
</script>

<template>
  <div
    id="app"
    class="
      container
      d-flex
      flex-column
      justify-content-center
      align-items-center
      mt-3
      text-center
    "
  >
    <div class="alert alert-danger" v-if="update" role="alert">
      New update is availible!<br />
      <button @click="laden()" class="btn btn-outline-dark">Refresh</button>
    </div>
    <ButtonGet @getEmployees="fetchEmployees"></ButtonGet>
    <CardView :employees="employees" @remove="removeEmployee"></CardView>
  </div>
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Montserrat'),
    url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

* {
  font-family: 'Montserrat', sans-serif;
}

a {
  text-decoration: none;
}
</style>
