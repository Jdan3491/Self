<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100 relative">
    <!-- Main Header -->
    <MainHeader leftText="Pagamento in Contanti" :showButton="false" />

    <!-- Main Content Section -->
    <main class="flex-grow overflow-auto p-4 flex flex-col items-center justify-center">
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

      <!-- Wallet Section (Coins and Banknotes) -->
      <div class="flex space-x-4 mt-8">
        <!-- Coins -->
        <div class="flex flex-col items-center">
          <h2 class="text-lg font-medium text-gray-700 mb-4">Monete</h2>
          <div class="flex space-x-4">
            <CoinSvg :value="0.50" />
            <CoinSvg :value="1" />
            <CoinSvg :value="2" />
          </div>
        </div>

        <!-- Banknotes -->
        <div class="flex flex-col items-center">
          <h2 class="text-lg font-medium text-gray-700 mb-4">Banconote</h2>
          <div class="flex space-x-4">
            <BanknoteSvg :value="5" />
            <BanknoteSvg :value="10" />
            <BanknoteSvg :value="20" />
            <BanknoteSvg :value="50" />
            <BanknoteSvg :value="100" />
          </div>
        </div>
      </div>

      <!-- Slot for coin insertion -->
      <div
        class="w-40 h-10 border-2 border-yellow-400 rounded-lg mt-8 flex items-center justify-center slot"
        @dragover.prevent
        @drop="onDrop"
      >
        <p class="text-center text-gray-500">Trascina qui monete o banconote</p>
      </div>

      <div v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</div>
    </main>

    <!-- Footer Section (Disappears if a banknote is inserted) -->
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
      Swal.fire({
        title: 'Successo!',
        text: 'Pagamento completato con successo.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push({ name: 'ConfirmationPage' })
      })
    } else if (remainingAmount.value < 0) {
      Swal.fire({
        title: 'Pagamento completato!',
        text: `Resto: ${change.value.toFixed(2)}€`,
        icon: 'info',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        router.push({ name: 'ConfirmationPage' })
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
