import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductStore = defineStore('productStore', () => {
  const items = ref([]);  // Array per memorizzare gli articoli
  const currentPage = ref(1);  // Pagina corrente
  const pageSize = ref(3);  // Numero di articoli per pagina

  // Aggiungi un articolo all'inizio dell'array
  const addItem = (item) => {
    if (item && item.price !== undefined) {
      items.value.unshift(item);  // Inserisci all'inizio dell'array
    } else {
      console.error('Invalid item:', item);
    }
  };

  // Rimuovi un articolo in base all'indice della pagina
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

  return {
    items,
    currentPage,
    pageSize,
    paginatedItems,
    totalAmount,
    totalPages,
    addItem,
    removeItem,
    previousPage,
    nextPage
  };
});
