<template>
  <div class="product-list bg-gray-100 relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] flex flex-col">
    <el-card class="flex flex-col h-full">
      <!-- Product List -->
      <div class="content-scrollable flex-1 overflow-y-auto p-6">
        <h2 class="text-2xl font-semibold mb-4">Prodotti Aggiunti</h2>

        <ul class="divide-y divide-gray-200">
          <!-- Utilizza l'indice `index` per identificare l'elemento da rimuovere -->
          <li v-for="(item, index) in productStore.paginatedItems" :key="index"
              :class="{'bg-yellow-300': item === productStore.highlightItem}" 
              class="py-4 flex justify-between items-center">
            <span class="font-medium text-lg truncate w-2/3">{{ item.name }}</span>
            <div class="flex items-center w-1/3 justify-end">
              <span class="text-blue-600 font-semibold mr-4">€{{ item.price.toFixed(2) }}</span>
              <!-- Passa l'indice dell'elemento nella pagina corrente per rimuoverlo -->
              <el-button @click="removeItem(index)" type="danger" size="small" class="px-4 py-1">Rimuovi</el-button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Fixed Footer Section -->
      <div class="fixed-footer bg-white border-t border-gray-200 p-6">
        <div class="flex justify-between items-center mb-4">
          <el-button @click="productStore.previousPage" :disabled="productStore.currentPage === 1" size="small" class="px-4 py-2">Precedente</el-button>
          <span class="font-medium text-lg">Pagina {{ productStore.currentPage }} di {{ productStore.totalPages }}</span>
          <el-button @click="productStore.nextPage" :disabled="productStore.currentPage === productStore.totalPages" size="small" class="px-4 py-2">Successivo</el-button>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold">Totale:</span>
          <span class="text-2xl font-bold text-blue-800">€{{ productStore.totalAmount.toFixed(2) }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useProductStore } from '../../stores/productStore';
import { onMounted } from 'vue';

// Accedi allo store per gestire gli articoli e la paginazione
const productStore = useProductStore();

// Log per debug
onMounted(() => {
  console.log('Items aggiunti nel carrello:', productStore.items);
});

// Funzione per rimuovere un elemento utilizzando l'indice nella pagina corrente
const removeItem = (indexInPage) => {
  productStore.removeItem(indexInPage);
};
</script>

<style scoped>
/* Stili personalizzati per il componente */
.bg-gray-100 {
  background-color: #f7fafc;
}
.product-list {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: relative;
}
.el-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.font-medium {
  font-weight: 500;
}
.font-bold {
  font-weight: 700;
}
.text-lg {
  font-size: 1.125rem;
}
.text-xl {
  font-size: 1.25rem;
}
.text-2xl {
  font-size: 1.5rem;
}
.text-blue-600 {
  color: #2b6cb0;
}
.text-blue-800 {
  color: #2b2d8a;
}
.bg-yellow-300 {
  background-color: #ffd814; /* Colore di evidenziazione */
}
.ml-4 {
  margin-left: 1rem;
}
.pt-4 {
  padding-top: 1rem;
}
.border-t {
  border-top: 1px solid #e2e8f0;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content-scrollable {
  overflow-y: auto;
}
.fixed-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
