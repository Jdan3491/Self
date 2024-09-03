import './assets/main.css';
import { createApp, h, ref, onMounted, defineComponent } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/tailwind.css';
import 'swiper/swiper-bundle.css';
import { RouterView } from 'vue-router';
import router from './router';
import UnsupportedDevice from './views/UnsupportedDevice/UnsupportedDevice.vue'; // Ensure the path is correct
import SpeechSynthesis from './utils/speechSynthesis'; // Import the speech synthesis utility

// Define the main application component
const App = defineComponent({
  setup() {
    // State to determine if the screen size is large enough
    const isScreenLargeEnough = ref<boolean>(false);

    // Function to check screen size
    const checkScreenSize = (): void => {
      isScreenLargeEnough.value = window.innerWidth >= 768; // Show the app only if the screen width is 768px or greater
    };

    // Lifecycle hook to run when the component is mounted
    onMounted(() => {
      checkScreenSize(); // Initial check of screen size
      window.addEventListener('resize', checkScreenSize); // Add event listener for screen resize
    });

    return { isScreenLargeEnough };
  },
  render() {
    // Render the main router view or the unsupported device component based on screen size
    return this.isScreenLargeEnough
      ? h(RouterView) // Render pages based on the router
      : h(UnsupportedDevice); // Show UnsupportedDevice if the screen is too small
  },
});

// Create the Vue application instance
const app = createApp(App);

// Use Pinia for state management
app.use(createPinia());

// Use router for navigation
app.use(router);

// Use Element Plus UI framework
app.use(ElementPlus);

// Provide the speech synthesis utility globally
app.config.globalProperties.$speakItem = SpeechSynthesis.speak.bind(SpeechSynthesis);

// Initialize the SpeechSynthesis utility
SpeechSynthesis.init();

// Mount the app to the DOM
app.mount('#app');
