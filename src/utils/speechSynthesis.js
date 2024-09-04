// utils/speechSynthesis.js

const SpeechSynthesis = {
  init() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported in this browser.');
      return;
    }

    this.voices = [];
    this.currentUtterance = null;
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

    // Verifica se il volume è 0 e non avviare la sintesi vocale
    if (options.volume === 0) {
      console.warn('Volume è impostato su 0. La sintesi vocale non verrà avviata.');
      return;
    }

    // Ferma eventuale parlato precedente
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'it-IT';
    utterance.pitch = options.pitch || 1;
    utterance.rate = options.rate || 0.9;
    utterance.volume = options.volume || 1;

    // Seleziona una voce, se specificata nelle opzioni
    const voiceName = options.voiceName || 'Google italiano';
    utterance.voice = this.voices.find(
      (voice) => voice.name === voiceName && voice.lang === utterance.lang
    );

    // Assegna l'utterance corrente
    this.currentUtterance = utterance;

    // Avvia la sintesi vocale
    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  },

  setVolume(volume) {
    if (this.currentUtterance) {
      // Imposta solo il volume sull'utterance corrente senza ricreare una nuova
      this.currentUtterance.volume = Math.min(Math.max(volume, 0), 1); // Limita il volume tra 0 e 1
      // Non riavviare l'utterance, evitando di ripetere la frase
    }
  }
};

// Inizializza l'utilità di sintesi vocale
SpeechSynthesis.init();

export default SpeechSynthesis;
