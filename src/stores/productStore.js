import {
  defineStore
} from 'pinia';
import {
  ref,
  computed
} from 'vue';

export const useProductStore = defineStore('productStore', () => {
  const items = ref([]);
  const BagsSelected = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(5);
  const bagsCost = ref(0);

  const addItem = (item) => {
    if (item && item.price !== undefined) {
      items.value.unshift(item);
    } else {
      console.error('Invalid item:', item);
    }
  };

  const removeItemById = (id) => {
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) {
      items.value.splice(index, 1);
    } else {
      console.error('Item with id not found:', id);
    }
  };

  const removeItem = (indexInPage) => {
    const start = (currentPage.value - 1) * pageSize.value;
    const indexInArray = start + indexInPage;
    if (indexInArray >= 0 && indexInArray < items.value.length) {
      items.value.splice(indexInArray, 1);
    } else {
      console.error('Invalid index:', indexInArray);
    }
  };

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize.value));

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return items.value.slice(start, end);
  });

  const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const totalAmount = computed(() =>
    items.value.reduce((sum, item) => sum + (item.price || 0), 0)
  );

  const totalAmountWithBags = computed(() => totalAmount.value + bagsCost.value);

  const updateBagsCost = (cost) => {
    bagsCost.value = cost;
  };

  const resetBagsCost = () => {
    bagsCost.value = 0;
  };

  // Save selected bags to localStorage
  const saveSelectedBags = () => {
    localStorage.setItem('selectedBags', JSON.stringify(BagsSelected.value));
  };

  // Retrieve selected bags from localStorage
  const loadSelectedBags = () => {
    const savedBags = localStorage.getItem('selectedBags');
    if (savedBags) {
      BagsSelected.value = JSON.parse(savedBags);
    }
  };

  // Clear saved selected bags
  const clearSavedBags = () => {
    localStorage.removeItem('selectedBags');
  };

  return {
    items,
    BagsSelected,
    currentPage,
    pageSize,
    paginatedItems,
    totalAmount,
    totalAmountWithBags,
    totalPages,
    bagsCost,
    addItem,
    removeItemById,
    removeItem,
    previousPage,
    nextPage,
    updateBagsCost,
    resetBagsCost,
    saveSelectedBags, // Save selected bags
    loadSelectedBags, // Load selected bags
    clearSavedBags // Clear saved bags
  };
});