import './assets/main.css';
import { createApp, h, ref, onMounted, defineComponent } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/tailwind.css';
import 'swiper/swiper-bundle.css';
import { RouterView } from 'vue-router';
import router from './router';
import UnsupportedDevice from './views/UnsupportedDevice/UnsupportedDevice.vue'; // Assicurati che il percorso sia corretto

const App = defineComponent({
  setup() {
    const isScreenLargeEnough = ref(false);

    const checkScreenSize = () => {
      isScreenLargeEnough.value = window.innerWidth >= 768; // Mostra l'app solo se la larghezza dello schermo è maggiore o uguale a 768px (tablet e superiori)
    };

    onMounted(() => {
      checkScreenSize(); // Controlla inizialmente la dimensione dello schermo
      window.addEventListener('resize', checkScreenSize); // Aggiunge un listener per controllare le dimensioni dello schermo al ridimensionamento
    });

    return { isScreenLargeEnough };
  },
  render() {
    return this.isScreenLargeEnough
      ? h(RouterView) // Utilizza RouterView per il rendering delle pagine basate sul router
      : h(UnsupportedDevice); // Mostra UnsupportedDevice se lo schermo è troppo piccolo
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
