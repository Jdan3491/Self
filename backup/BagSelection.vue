<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">
    <!-- Header Section -->
    <header class="flex-shrink-0 text-gray-800 p-4 bg-yellow-400">
      <h2 class="text-2xl font-bold">Seleziona e Regola la Quantità del Sacchetto</h2>
      <h1 class="text-3xl text-center"><span>Totale Articoli del carrello:</span> <span>€{{ tot.toFixed(2) }}</span></h1>
    </header>

    <!-- Main Content Section -->
    <main class="flex-grow overflow-auto p-4 lg:flex lg:gap-8">
      <!-- Bag Selection Section -->
      <div class="flex flex-col lg:flex-row lg:w-2/3 gap-4">
        <div
          v-for="(type, index) in bagTypes"
          :key="type.value"
          class="card w-full lg:w-1/4 h-auto p-4 border rounded-lg shadow-md bg-white cursor-pointer transition-transform duration-300 ease-in-out"
          :class="{ 'border-blue-600 bg-blue-50': form.selectedBags[type.value] }"
          @click="toggleBagSelection(type.value)"
        >
          <img :src="getIcon(type.value)" alt="Bag Type" class="icon" />
          <h3>{{ type.label }}</h3>
          <p>{{ type.description }}</p>
          <p class="price">€{{ type.cost.toFixed(2) }}</p>
        </div>
      </div>

      <!-- Summary Section -->
      <div class="lg:w-1/3 mt-4 lg:mt-0">
        <div class="summary-container bg-white p-4 rounded-lg shadow-md h-full">
          <h3 class="text-lg font-semibold mb-2">Riepilogo Selezioni</h3>
          <div v-if="Object.keys(form.selectedBags).length === 0" class="empty-selection text-center text-gray-500">
            Nessun sacchetto selezionato
          </div>
          <div v-else>
            <div
              v-for="(bag, bagType) in form.selectedBags"
              :key="bagType"
              class="summary-item flex justify-between mt-2 border-b border-gray-300 pb-2"
            >
              <div class="flex flex-col w-full">
                <div class="flex justify-between items-center">
                  <span>{{ bagTypes.find(b => b.value === bagType).label }}</span>
                  <span>€{{ (bagTypes.find(b => b.value === bagType).cost * bag.quantity).toFixed(2) }}</span>
                </div>
                <div class="quantity-controls mt-2">
                  <button @click="changeQuantity(bagType, -1)" style="width:60px; heigth:60px"><span style="font-size:2rem">-</span></button>
                  <input
                    type="number"
                    v-model.number="form.selectedBags[bagType].quantity"
                    class="w-50"
                  />
                  <button @click="changeQuantity(bagType, 1)" style="width:60px; heigth:60px"><span style="font-size:2rem">+</span></button>
                </div>
              </div>
            </div>
            <div class="totals mt-4 pt-2 border-t border-gray-300">
              <p><span>Totale Sacchetti:</span> <span>€{{ totalBagsCost.toFixed(2) }}</span></p>
              <p><span>Totale Spesa:</span> <span>€{{ totalItemsCost.toFixed(2) }}</span></p>
              <p class="final-total"><span>Totale Finale:</span> <span>€{{ totalFinalCost.toFixed(2) }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="flex-shrink-0 bg-white p-4 border-t border-gray-200 flex justify-between">
      <button
        class="cancel-button text-2xl p-4 rounded-lg shadow-md transition duration-200 ease-in-out"
        @click="cancel"
        aria-label="Annulla"
      >
        Annulla
      </button>
      <button
        class="animated-button text-2xl p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out"
        @click="confirmSelection"
        aria-label="Avanti"
      >
      Avanti
      </button>
    </footer>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'; // Import onMounted for lifecycle hook
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import Swal from 'sweetalert2';
import { useImgStore } from '@/stores/imgStore';
import { useProductStore } from '@/stores/productStore'; // Import the product store

const imgStore = useImgStore();
const productStore = useProductStore(); // Initialize the product store

const bagTypes = ref([
  { value: 'bigBag', label: 'Grande', description: 'Sacchetto grande.', cost: 0.50 },
  { value: 'ecologicBag', label: 'Ecologico', description: 'Sacchetto ecologico.', cost: 0.30 },
  { value: 'plasticBag', label: 'Plastica', description: 'Sacchetto di plastica.', cost: 1.00 }
]);

const form = ref({ selectedBags: {} }); // Reactive object to store user-selected bags

const tot = ref(productStore.totalAmount);

const totalItemsCost = computed(() => productStore.totalAmount); // Total cost of items from the product store

const totalBagsCost = computed(() => {
  // Calculate the total cost of selected bags
  return Object.values(form.value.selectedBags).reduce((total, bag) => {
    const bagType = bagTypes.value.find(b => b.value === bag.type);
    return total + (bagType.cost * bag.quantity);
  }, 0);
});

const totalFinalCost = computed(() => totalItemsCost.value + totalBagsCost.value); // Total cost including bags and items

const router = useRouter();

const getIcon = (type) => imgStore.getIcon(type); // Function to get icon based on bag type

// Toggle bag selection in the UI and update the reactive form
const toggleBagSelection = (type) => {
  if (form.value.selectedBags[type]) {
    delete form.value.selectedBags[type];
  } else {
    form.value.selectedBags[type] = { type, quantity: 1 };
  }
};

// Adjust the quantity of selected bags and ensure valid values
const changeQuantity = (bagType, change) => {
  if (form.value.selectedBags[bagType]) {
    const newQuantity = form.value.selectedBags[bagType].quantity + change;
    if (newQuantity > 0) {
      form.value.selectedBags[bagType].quantity = newQuantity;
    } else {
      delete form.value.selectedBags[bagType];
    }
  }
};

// Function to confirm bag selection and update the store
const confirmSelection = () => {
  const totalBagsCostValue = totalBagsCost.value;
  const selectedBags = form.value.selectedBags;
  productStore.updateBagsCost(totalBagsCostValue); // Update store with the total bags cost
  productStore.BagsSelected = Object.keys(selectedBags).map(key => {
        return {
          type: 'bag',
          value: key,
          quantity: selectedBags[key].quantity,
          cost: bagTypes.value.find(bag => bag.value === key).cost
        };
      });
    
  // Navigate to the payment page
  router.push({ name: 'Payment' });
};

// Function to handle cancelation and reset bag selection in store
const cancel = () => {
  productStore.resetBagsCost(); // Reset the bags cost in store
  productStore.BagsSelected = productStore.BagsSelected.filter(item => item.type !== 'bag'); // Remove all bag items from store
  router.back(); // Navigate back
};

// Ensure store is reset when navigating away from the component
onBeforeRouteLeave((to, from) => {
  if (from.path === '/home') {
    productStore.resetBagsCost();
    productStore.BagsSelected = productStore.BagsSelected.filter(item => item.type !== 'bag'); // Remove all bag items from store
  }
});

// Initialize the component and load any pre-selected bags from the store
onMounted(() => {
  // Fetch pre-selected bags from the store
  const storedBags = productStore.BagsSelected.filter(item => item.type === 'bag');
  // Initialize the selected bags in the form based on stored data
  storedBags.forEach(bag => {
    form.value.selectedBags[bag.type] = {
      type: bag.type,
      quantity: bag.quantity,
    };
  });
});
</script>



<style scoped>
/* Stili base per le carte */
.card {
  width: 200px; /* Larghezza aumentata per una forma quadrata più grande */
  height: 200px; /* Altezza aumentata per una forma quadrata più grande */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Mantieni il colore di sfondo bianco */
  border: 4px solid #ffd814; /* Bordo dello stesso colore del background */
  border-radius: 8px; /* Raggio del bordo arrotondato */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Ombra leggera */
  text-align: center;
  padding: 1.5rem; /* Spaziatura interna */
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; /* Transizione per interazioni */
}

.card:hover {
  transform: translateY(-2px); /* Leggero movimento verso l'alto al passaggio del mouse */
  box-shadow: 0 6px 12px rgba(0,0,0,0.15); /* Ombra più profonda al passaggio del mouse */
}

.card:focus {
  outline: none;
  border: 2px solid #ffd814; /* Mantieni il bordo dello stesso colore del background */
}

/* Stili per le icone */
.icon {
  width: 60px; /* Dimensione dell'icona */
  height: 60px;
  margin-bottom: 0.75rem; /* Maggiore spazio tra l'icona e il testo */
}

/* Stili per i testi */
.card h3 {
  font-size: 1.5rem; /* Dimensione del testo del titolo */
  font-weight: 500; /* Peso del testo del titolo */
  color: #333333; /* Colore del testo */
  margin-bottom: 0.5rem; /* Spazio sotto il titolo */
}

.card p {
  font-size: 1rem; /* Dimensione del testo della descrizione e costo */
  color: #666666; /* Colore del testo */
}

.card p.price {
  font-size: 1.25rem; /* Dimensione del testo per il costo */
  color: #1d4ed8; /* Colore del testo per il costo */
  font-weight: bold; /* Peso del testo per il costo */
}

/* Stili per le classi condizionali */
.border-blue-600 {
  border-color: #1d4ed8; /* Colore del bordo quando selezionato */
}

.bg-blue-50 {
  background-color: #ebf2ff; /* Colore di sfondo quando selezionato */
}

/* Improved styles for the quantity controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between buttons and input */
}

.quantity-controls button {
  background-color: #1d4ed8; /* Blue background */
  color: #ffffff; /* White text */
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem; /* Button padding */
  cursor: pointer;
  font-size: 1rem; /* Larger font size for better visibility */
  transition: background-color 0.2s ease;
}

.quantity-controls button:hover {
  background-color: #2563eb; /* Darker blue on hover */
}

.quantity-controls input {
  width: 100px;
  text-align: center;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.25rem;
}

/* Fixed styles for the Totals Section */
.totals {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #d1d5db; /* Light gray border on top */
  display: flex;
  flex-direction: column; /* Arrange totals vertically */
  gap: 0.5rem; /* Space between total lines */
}

.totals p {
  font-size: 1rem;
  color: #333;
  display: flex;
  justify-content: space-between; /* Align text and values */
  margin: 0; /* Remove default margin */
}

.totals .final-total {
  font-size: 1.25rem; /* Larger font for final total */
  font-weight: bold;
  color: #1d4ed8; /* Blue color for emphasis */
  display: flex;
  justify-content: space-between; /* Align text and values */
}

</style>
