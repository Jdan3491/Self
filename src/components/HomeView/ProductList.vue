<template>
  <div class="product-list bg-gray-100 flex flex-col h-full">
    <el-card class="flex flex-col h-full">
      <!-- Product List -->
      <div class="content-scrollable flex-1 p-4 overflow-y-auto">
        <h2 class="text-2xl font-semibold mb-4">Prodotti Aggiunti</h2>

        <ul class="divide-y divide-gray-200">
          <!-- Utilizza l'indice `index` per identificare l'elemento da rimuovere -->
          <li
            v-for="(item, index) in productStore.paginatedItems"
            :key="index"
            :class="[
              {
                'bg-green-500': index === 0,
                'bg-yellow-300': item === productStore.highlightItem && index !== 0
              },
              'flex justify-between items-center p-2'
            ]"
            class="py-4 flex justify-between items-center"
          >
            <span class="font-medium text-lg truncate w-2/3">
              <h2>
                <strong>{{ item.name }}</strong>
              </h2>
            </span>
            <div class="flex items-center w-1/3 justify-end">
              <span class="text-blue-600 font-semibold mr-4">€{{ item.price.toFixed(2) }}</span>
              <!-- Passa l'indice dell'elemento nella pagina corrente per rimuoverlo -->
              <el-button @click="removeItem(index)" type="danger" size="small" class="px-4 py-1">
                Rimuovi
              </el-button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer Section -->
      <div class="footer bg-white border-t border-gray-200 p-4 flex flex-col">
        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mb-4">
          <el-button
            @click="productStore.previousPage"
            :disabled="productStore.currentPage === 1"
            size="small"
            class="px-4 py-2 text-xl"
          >
            Precedente
          </el-button>
          <span class="font-medium text-lg">
            Pagina {{ productStore.currentPage }} di {{ productStore.totalPages }}
          </span>
          <el-button
            @click="productStore.nextPage"
            :disabled="productStore.currentPage === productStore.totalPages"
            size="small"
            class="text-xl px-4 py-2"
          >
            Successivo
          </el-button>
        </div>

        <!-- Total Section -->
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold">Totale:</span>
          <span class="text-3xl font-bold text-blue-800">
            €{{ productStore.totalAmount.toFixed(2) }}
          </span>
        </div>

        <!-- Discount Section -->
        <div v-if="discountStore.isDiscountApplied" class="flex flex-col">
          <div class="flex justify-between items-center">
            <span class="text-xl font-medium">Sconto Applicato:</span>
            <h1
              v-if="discountStore.discountDetails.discount_type === 'percentage'"
              class="text-xl text-red-600"
            >
              -{{ discountStore.discountDetails.value }}%
            </h1>
            <p
              v-if="discountStore.discountDetails.discount_type === 'fixed'"
              class="text-xl text-red-600"
            >
              - €{{ discountStore.discountDetails.value }}
            </p>
          </div>

          <!-- Final Price Calculation with Discount -->
          <div class="flex justify-between items-center">
            <span class="text-xl font-medium">Prezzo Finale:</span>
            <span class="text-3xl font-bold text-green-800">
              €{{ discountStore.discountedTotal.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../../stores/productStore'
import { useDiscountStore } from '../../stores/discountStore' // Importa il discountStore

// Accedi allo store per gestire gli articoli e la paginazione
const productStore = useProductStore()
const discountStore = useDiscountStore() // Accedi al discountStore

// Funzione per rimuovere un elemento utilizzando l'indice nella pagina corrente
const removeItem = (indexInPage) => {
  productStore.removeItem(indexInPage)
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.el-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content-scrollable {
  overflow-y: auto;
}

.footer {
  background-color: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer > .flex {
  margin-bottom: 1rem;
}

.footer > .flex:last-child {
  margin-bottom: 0;
}
</style>
