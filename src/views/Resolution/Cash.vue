<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100 relative">
    <!-- Main Header -->
    <MainHeader leftText="Pagamento in Contanti" :showButton="false" />

    <!-- Main Content Section -->
    <main class="flex-grow p-4 flex flex-col items-center">
      <!-- Subtitle -->
      <h1 class="text-4xl font-medium text-gray-600 mb-8">Inserisci Monete o Banconote</h1>

      <!-- Amount Information Grid -->
      <div class="grid grid-cols-2 gap-6 w-full max-w-lg mb-12">
        <!-- Balance to Pay -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <p class="text-lg text-gray-500 mb-4">Saldo da Pagare:</p>
          <p class="text-2xl text-blue-700 font-bold">{{ totalAmount?.toFixed(2) || '0.00' }}€</p>
        </div>

        <!-- Amount Already Inserted -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <p class="text-lg text-gray-500 mb-4">Saldo Inserito:</p>
          <p class="text-2xl text-blue-700 font-bold">{{ insertedAmount.toFixed(2) }}€</p>
        </div>

        <!-- Amount Remaining -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <p class="text-lg text-gray-500 mb-4">Restante da Pagare:</p>
          <p class="text-2xl text-red-600 font-bold">{{ remainingAmount?.toFixed(2) || '0.00' }}€</p>
        </div>

        <!-- Change to be Given -->
        <div class="p-6 border-2 border-yellow-400 rounded-lg bg-white shadow-md">
          <p class="text-lg text-gray-500 mb-4">Resto:</p>
          <p class="text-2xl text-green-600 font-bold">{{ change?.toFixed(2) || '0.00' }}€</p>
        </div>
      </div>

      <!-- Sezione Drag-and-Drop e monete/banconote, visibile solo se l'hardware NON è installato -->
      <template v-if="!testModeStore.isHardwareInstalled">
        <!-- Drag-and-Drop Area -->
        <div
          class="w-full max-w-lg h-24 border-2 border-yellow-400 rounded-lg mt-8 flex items-center justify-center slot"
          @dragover.prevent
          @drop="onDrop"
        >
          <p class="text-center text-gray-500">Trascina qui monete o banconote</p>
        </div>

        <!-- Coins and Banknotes Section -->
        <div class="flex flex-col space-y-6 w-full max-w-lg mt-8">
          <!-- Coins Row -->
          <div class="flex justify-center space-x-6">
            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-lg border-2 border-yellow-400">
              <h2 class="text-xl font-semibold mb-4">Monete</h2>
              <div class="flex space-x-4">
                <CoinSvg :value="0.50" />
                <CoinSvg :value="1" />
                <CoinSvg :value="2" />
              </div>
            </div>
          </div>

          <!-- Banknotes Row -->
          <div class="flex justify-center space-x-6">
            <div class="flex flex-col items-center p-4 bg-white shadow-md rounded-lg border-2 border-yellow-400">
              <h2 class="text-xl font-semibold mb-4">Banconote</h2>
              <div class="flex space-x-4">
                <BanknoteSvg :value="5" class="w-32 h-16" />
                <BanknoteSvg :value="10" class="w-32 h-16" />
                <BanknoteSvg :value="20" class="w-32 h-16" />
                <BanknoteSvg :value="50" class="w-32 h-16" />
                <BanknoteSvg :value="100" class="w-32 h-16" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</div>
    </main>

    <!-- Footer Section -->
    <footer v-if="showFooter" class="flex-shrink-0 bg-white p-4 border-t border-gray-200 flex justify-between">
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
import CoinSvg from './CoinSvg.vue'
import BanknoteSvg from './BanknoteSvg.vue'
import { useProductStore } from '@/stores/productStore'
import { useDiscountStore } from '@/stores/discountStore'
import { useTestModeStore } from '@/stores/testModeStore'

// Access the product and test mode stores
const productStore = useProductStore()
const discountStore = useDiscountStore()
const testModeStore = useTestModeStore()

// Total amount to be paid
const totalAmount = ref(
  discountStore.discountedTotal > 0
    ? discountStore.discountedTotal + productStore.bagsCost
    : productStore.totalAmountWithBags
)

// Reactive variable for inserted amount
const insertedAmount = ref(0.0)

// Error message for invalid coin or banknote
const errorMessage = ref("")

// Compute the remaining amount and change
const remainingAmount = computed(() => Math.max(0, (totalAmount.value ?? 0) - insertedAmount.value))
const change = computed(() => Math.max(0, insertedAmount.value - (totalAmount.value ?? 0)))

// Footer visibility (disappears when a banknote is inserted)
const showFooter = ref(true)

// Function to handle drag-and-drop simulation of coins or banknotes
const onDrop = (event) => {
  const moneyAmount = parseFloat(event.dataTransfer.getData('money'))
  if (moneyAmount) {
    insertedAmount.value += moneyAmount

    // Hide the footer if a banknote is inserted
    if (moneyAmount >= 5) {
      showFooter.value = false
    }

    if (remainingAmount.value === 0) {
      localStorage.clear();
      Swal.fire({
        title: 'Successo!',
        text: 'Pagamento completato con successo.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push({ name: 'welcome' })
      })
    } else if (remainingAmount.value < 0) {
      Swal.fire({
        title: 'Pagamento completato!',
        text: `Resto: ${change.value.toFixed(2)}€`,
        icon: 'info',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        router.push({ name: 'welcome' })
      })
    }
  } else {
    errorMessage.value = "Errore nel riconoscimento della moneta o banconota."
  }
}

// Router instance
const router = useRouter()

// Cancel action
const cancel = () => {
  router.back()
}

// Lifecycle hook for page load
onMounted(() => {
  console.log('Tot Spesa: ', productStore.totalAmount?.toFixed(2) || '0.00')
  console.log('Tot Borse: ', productStore.totalAmountWithBags?.toFixed(2) || '0.00')
})
</script>

<style scoped>
@keyframes slideCoin {
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
}

.coin,
.banknote {
  animation: slideCoin 0.3s ease-out;
  cursor: grab;
}

.coin:active,
.banknote:active {
  cursor: grabbing;
}

/* Slot styling */
.slot {
  transition: background-color 0.3s ease;
}
.slot:hover {
  background-color: #fef9c3; /* Light yellow on hover */
}
</style>
