// productStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductStore = defineStore('productStore', () => {
  const items = ref([]);  // Array per memorizzare gli articoli
  const BagsSelected = ref([]); // Array per memorizzare Bags
  const currentPage = ref(1);  // Pagina corrente
  const pageSize = ref(5);  // Numero di articoli per pagina
  const bagsCost = ref(0);  // Costo totale delle buste

  // Aggiungi un articolo all'inizio dell'array
  const addItem = (item) => {
    if (item && item.price !== undefined) {
      items.value.unshift(item);  // Inserisci all'inizio dell'array
    } else {
      console.error('Invalid item:', item);
    }
  };

  // Rimuovi un articolo in base all'id
  const removeItemById = (id) => {
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) {
      items.value.splice(index, 1); // Rimuovi l'elemento trovato
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

  // Calcola il numero totale di pagine
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize.value));

  // Calcola gli articoli per la pagina corrente
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return items.value.slice(start, end);  // Prendi gli articoli per la pagina corrente
  });

  // Cambia alla pagina precedente
  const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  // Cambia alla pagina successiva
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  // Calcola l'importo totale degli articoli
  const totalAmount = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price || 0), 0)
  );

  // Calcola l'importo totale con il costo delle buste
  const totalAmountWithBags = computed(() => totalAmount.value + bagsCost.value);

  // Imposta il costo totale delle buste
  const updateBagsCost = (cost) => {
    bagsCost.value = cost;
  };

  // Resetta il costo delle buste
  const resetBagsCost = () => {
    bagsCost.value = 0;
  };

  return {
    items,
    BagsSelected,
    currentPage,
    pageSize,
    paginatedItems,
    totalAmount,
    totalAmountWithBags,  // Include il totale con buste
    totalPages,
    addItem,
    removeItemById,
    removeItem,
    previousPage,
    nextPage,
    updateBagsCost, // Aggiungi il metodo per aggiornare il costo delle buste
    resetBagsCost  // Aggiungi il metodo per resettare il costo delle buste
  };
});
