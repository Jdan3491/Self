// src/stores/testModeStore.js
import { defineStore } from 'pinia';

export const useTestModeStore = defineStore('testMode', {
  state: () => ({
    isHardwareInstalled: false,
  }),
  actions: {
    toggleTestMode() {
      this.isHardwareInstalled = !this.isHardwareInstalled;
    },
    setTestMode(status) {
      this.isHardwareInstalled = status;
    },
  },
});
