<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">

        <!-- Include Header Component -->
        <MainHeader
        leftText="Pagamento in Contanti"
        :showButton="false"
      />
    

    <!-- Main Content Section -->
    <main class="flex-grow overflow-auto p-4 flex flex-col items-center justify-center">
      <!-- Subtitle -->
      <h1 class="text-4xl font-medium text-gray-600 mb-8">Inserisci Monete</h1>
      <!-- Increased text size -->

      <!-- Amount Information Grid -->
      <div class="grid grid-cols-2 gap-6 w-full max-w-lg mb-12">
        <!-- Adjusted gap and margin -->
        <!-- Balance to Pay -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <!-- Increased padding -->
          <p class="text-lg text-gray-500 mb-4">Saldo da Pagare:</p>
          <!-- Increased text size -->
          <p class="text-2xl text-blue-700 font-bold">{{ totalAmount?.toFixed(2) || '0.00' }}€</p>
          <!-- Increased text size -->
        </div>

        <!-- Amount Already Inserted -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <!-- Increased padding -->
          <p class="text-lg text-gray-500 mb-4">Saldo Inserito:</p>
          <!-- Increased text size -->
          <p class="text-2xl text-blue-700 font-bold">{{ insertedAmount.toFixed(2) }}€</p>
          <!-- Increased text size -->
        </div>

        <!-- Amount Remaining -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <!-- Increased padding -->
          <p class="text-lg text-gray-500 mb-4">Restante da Pagare:</p>
          <!-- Increased text size -->
          <p class="text-2xl text-red-600 font-bold">
            {{ remainingAmount?.toFixed(2) || '0.00' }}€
          </p>
          <!-- Increased text size -->
        </div>

        <!-- Change to be Given -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <!-- Increased padding -->
          <p class="text-lg text-gray-500 mb-4">Resto:</p>
          <!-- Increased text size -->
          <p class="text-2xl text-green-600 font-bold">{{ change?.toFixed(2) || '0.00' }}€</p>
          <!-- Increased text size -->
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="flex-shrink-0 bg-white p-4 border-t border-gray-200 flex justify-between">
      <AnimatedButton
        class="cancel-button text-4xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out"
        title="Annulla"
        :onClick="cancel"
        aria-label="Annulla"
      />
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import MainHeader from '../../components/MainHeader.vue'
import AnimatedButton from '../../components/AnimatedButton.vue'
import { useProductStore } from '@/stores/productStore'
import { useDiscountStore } from '@/stores/discountStore'

// Access the product store
const productStore = useProductStore()
const discountStore = useDiscountStore() // Accedi al discountStore

// Total amount to be paid
const totalAmount = ref(
  discountStore.discountedTotal > 0
    ? discountStore.discountedTotal + productStore.bagsCost
    : productStore.totalAmountWithBags
)

// Reactive variable for inserted amount
const insertedAmount = ref(0.0)

// Compute the remaining amount and change
const remainingAmount = computed(() => Math.max(0, (totalAmount.value ?? 0) - insertedAmount.value))
const change = computed(() =>
  Math.max(0, insertedAmount.value - (productStore.totalAmountWithBags ?? 0))
)

// Router instance
const router = useRouter()

/*
// Confirm payment
const confirmPayment = () => {
  if (remainingAmount.value > 0) {
    Swal.fire({
      title: 'Errore!',
      text: 'Non hai inserito abbastanza denaro.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: 'Successo!',
      text: 'Pagamento completato con successo.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Navigate to a confirmation page or receipt screen
      router.push({ name: 'ConfirmationPage' });
    });
  }
};

*/
// Cancel action
const cancel = () => {
  router.back() // Navigate back to the previous page
}

// Lifecycle hook for page load
onMounted(() => {
  console.log('Tot Spesa: ', productStore.totalAmount?.toFixed(2) || '0.00')
  console.log('Tot Borse: ', productStore.totalAmountWithBags?.toFixed(2) || '0.00') // Corrected typo
})
</script>


<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem; /* Increased padding */
  border: 2px solid #ffd814;
  border-radius: 12px; /* Slightly more rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px; /* Increased width */
  height: 300px; /* Increased height */
  background-color: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px); /* Slightly more elevation on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
</style>
