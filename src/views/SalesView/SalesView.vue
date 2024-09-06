<template>
  <div class="flex flex-col h-screen w-screen bg-gray-100">
    <!-- Header Section (Full Width) -->
    <MainHeader
      leftText="Gestione Codici Sconto"
      :showButton="false"
    />
    <!-- Main Content Section -->
    <main class="flex-grow p-6 gap-4 grid grid-cols-1 lg:grid-cols-2">
      <!-- Left Column: Instructions -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-col">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Istruzioni</h2>
        <p class="text-gray-600">
          Inserisci o scansiona un codice sconto. Se un codice è già applicato, sarà rimosso quando
          ne viene inserito uno nuovo. Solo un codice sconto può essere valido alla volta.
        </p>
      </div>

      <!-- Right Column: Input Field -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-col items-center">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Inserisci il Codice Sconto</h2>
        <div class="w-full max-w-md">
          <el-input
            v-model="discountCode"
            placeholder="Inserisci il codice sconto"
            clearable
            class="w-full"
          ></el-input>
        </div>

        <!-- Sezione Dettagli del Codice Sconto -->
        <div v-if="discountDetails" class="mt-6 bg-blue-50 p-6 rounded-lg shadow-md w-full max-w-md">
          <h3 class="font-bold text-xl text-blue-600 mb-3">Dettagli del Codice Sconto</h3>
          <p class="text-gray-700"><strong>Codice:</strong> {{ discountDetails.code }}</p>
          <el-divider />
          <p class="text-gray-800">
            <h1 v-if="discountDetails.discount_type === 'percentage'" class="text-5xl">
              - {{ discountDetails.value }}%
            </h1>
            <h1 class="text-5xl" v-else>
              - €{{ discountDetails.value }}
            </h1>
          </p>
          <el-divider />
          <p class="text-gray-700"><strong>Descrizione:</strong> {{ discountDetails.description }}</p>
          <el-button @click="removeDiscount" type="danger" size="small" class="mt-4">
            Rimuovi Codice Sconto
          </el-button>
        </div>
      </div>
    </main>

    <!-- Footer Section (Full Width) -->
    <FooterComponent
  :button1="{
    title: 'Indietro',
    onClick: goBack,
    ariaLabel: 'Indietro',
    className: 'bg-gray-700 hover:bg-gray-800 text-white rounded-md'
  }"
  button1Align="left"
  :button2="{
    title: 'Applica Codice',
    onClick: applyDiscount,
    ariaLabel: 'Applica Codice',
    className: 'bg-green-700 hover:bg-green-800 text-white rounded-md'
  }"
  button2Align="right"
/>

  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import MainHeader from '../../components/MainHeader.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { useDiscountStore } from '../../stores/discountStore';
import { ElInput, ElDivider, ElButton } from 'element-plus';
import supabase from '../../config/supabaseClient.js';

const router = useRouter();
const store = useDiscountStore();

const discountCode = ref(store.discountCode);
const discountDetails = ref(store.discountDetails);

watch(() => store.discountDetails, (newDetails) => {
  discountDetails.value = newDetails;
});

const applyDiscount = async () => {
  if (discountCode.value.trim() === '') return;

  const code = discountCode.value.trim();

  const { data: discount, error: discountError } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('code', code)
    .eq('is_active', true)
    .single();

  if (discountError) {
    Swal.fire({
      title: 'Errore!',
      text: 'Si è verificato un errore durante la verifica del codice sconto.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    console.error('Errore Supabase:', discountError);
  } else if (discount) {
    store.setDiscountDetails(discount);
    Swal.fire({
      title: 'Successo!',
      text: `Codice sconto "${code}" applicato correttamente.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: 'Errore!',
      text: 'Il codice sconto inserito non è valido o non è più attivo.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  discountCode.value = '';
};

const removeDiscount = () => {
  store.clearDiscount();
  Swal.fire({
    title: 'Successo!',
    text: 'Codice sconto rimosso e pronto per una nuova scansione.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Due colonne di larghezza uguale */
  gap: 1rem; /* Spazio tra le colonne */
  padding: 1rem;
  overflow: auto;
  margin-bottom: 60px; /* Altezza del footer */
}

@media (max-width: 1024px) {
  main {
    grid-template-columns: 1fr; /* Una sola colonna su schermi piccoli */
  }
}
</style>

