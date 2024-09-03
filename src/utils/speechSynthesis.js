// utils/speechSynthesis.js
const SpeechSynthesis = {
  init() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported in this browser.');
      return;
    }

    this.voices = [];
    this.loadVoices();
  },

  loadVoices() {
    this.voices = window.speechSynthesis.getVoices();

    if (!this.voices.length) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
    }
  },

  speak(text, options = {}) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'it-IT';
    utterance.pitch = options.pitch || 1;
    utterance.rate = options.rate || 0.9;
    utterance.volume = options.volume || 1;

    // Select a voice, if specified in options
    const voiceName = options.voiceName || 'Google italiano';
    utterance.voice = this.voices.find(
      (voice) => voice.name === voiceName && voice.lang === utterance.lang
    );

    window.speechSynthesis.speak(utterance);
  }
};

// Initialize the speech synthesis utility
SpeechSynthesis.init();

export default SpeechSynthesis;
