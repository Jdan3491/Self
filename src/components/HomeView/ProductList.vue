<template>
  <div class="product-list bg-gray-100 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] flex flex-col">
    <el-card class="h-full flex flex-col">
      <h2 class="text-2xl mb-4">Prodotti Aggiunti</h2>

      <!-- Product List -->
      <div class="flex-1 overflow-y-auto">
        <ul>
          <li v-for="(item, index) in productStore.paginatedItems" :key="item.id" class="p-4 border-b last:border-b-0 flex justify-between items-center">
            <span class="font-bold text-lg">{{ item.name }}</span> - <span class="text-blue-500">€{{ item.price.toFixed(2) }}</span>
            <el-button @click="removeItem(index)" type="danger" size="small" class="ml-4">Rimuovi</el-button>
          </li>
        </ul>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4">
        <el-button @click="productStore.previousPage" :disabled="productStore.currentPage === 1" size="small">Precedente</el-button>
        <span>Pagina {{ productStore.currentPage }} di {{ productStore.totalPages }}</span>
        <el-button @click="productStore.nextPage" :disabled="productStore.currentPage === productStore.totalPages" size="small">Successivo</el-button>
      </div>
      
      <!-- Total Amount Section -->
      <div class="pt-4 border-t flex justify-between items-center">
        <span class="text-lg font-semibold">Totale:</span>
        <span class="text-lg font-semibold">€{{ productStore.totalAmount.toFixed(2) }}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useProductStore } from '../../stores/productStore';
import { ref, onMounted } from 'vue';
const productStore = useProductStore();


onMounted(() => {
  console.log('Items aggiunti nel carrello:', productStore.items);
});


const removeItem = (index) => {
  productStore.removeItem(index);
};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}
.product-list {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}
.el-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.font-bold {
  font-weight: 700;
}
.text-lg {
  font-size: 1.125rem;
}
.text-blue-500 {
  color: #3182ce;
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
</style>
