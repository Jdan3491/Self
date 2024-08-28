import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductStore = defineStore('productStore', () => {
  const items = ref([]);
  const highlightItem = ref(null);
  const currentPage = ref(1);
  const pageSize = ref(5);


  function removeItemById(id) {
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) {
      items.value.splice(index, 1); // Remove the item from the array
    } else {
      throw new Error('Item not found');
    }
  }


  const addItem = (item) => {
    if (item && item.price !== undefined) {
      items.value.unshift(item); // Add new item to the top of the list
      highlightItem.value = item; // Highlight the newly added product
    } else {
      console.error('Invalid item:', item);
    }
  };

  const removeItem = (index) => {
    if (index >= 0 && index < items.value.length) {
      items.value.splice(index, 1);
      console.log('Item Removed at Index:', index);
      console.log('All Items:', items.value); // Log all items after removal
    } else {
      console.error('Invalid index:', index);
    }
  };

  // Pagination logic
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize.value));
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return items.value.slice(start, start + pageSize.value);
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

  return {
    items,
    highlightItem,
    currentPage,
    pageSize,
    paginatedItems,
    totalAmount,
    totalPages,
    addItem,
    removeItem,
    previousPage,
    nextPage,
    removeItemById
  };
});
