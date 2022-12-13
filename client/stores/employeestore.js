import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCounterStore = defineStore('employee', () => {
  const employees = ref([]);
  // const doubleCount = computed(() => count.value * 2)
  const getAll = async () => {
    const res = await axios.get('/employees');
    employees.value = res.data;
  };

  return { employees, getAll };
});
