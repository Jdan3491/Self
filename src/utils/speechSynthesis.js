const SpeechSynthesis = {
  init() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported in this browser.');
      return;
    }

    this.voices = [];
    this.currentUtterance = null;
    this.isSpeaking = false; // Nuovo flag per tenere traccia se sta parlando
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

    // Se il volume è 0, non parlare
    if (options.volume === 0) {
      this.stop();
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

    // Marca come parlando
    this.isSpeaking = true;

    // Avvia la sintesi vocale
    window.speechSynthesis.speak(utterance);

    // Quando l'utterance è completata, aggiorna lo stato
    utterance.onend = () => {
      this.isSpeaking = false;
    };
  },

  stop() {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.isSpeaking = false; // Marca come non parlando
    }
  },

  setVolume(volume) {
    if (volume === 0) {
      this.stop(); // Ferma la sintesi se il volume è 0
    } else if (this.currentUtterance) {
      if (this.isSpeaking) {
        // Cancelliamo l'utterance corrente e ricreiamo il parlato con il nuovo volume
        const text = this.currentUtterance.text;
        const options = {
          lang: this.currentUtterance.lang,
          pitch: this.currentUtterance.pitch,
          rate: this.currentUtterance.rate,
          volume: Math.min(Math.max(volume, 0), 1), // Limita il volume tra 0 e 1
          voiceName: this.currentUtterance.voice?.name,
        };
        this.stop(); // Ferma l'attuale sintesi
        this.speak(text, options); // Ricomincia con il nuovo volume
      } else {
        // Solo aggiorna il volume senza ripetere se non si sta parlando
        if (this.currentUtterance) {
          this.currentUtterance.volume = Math.min(Math.max(volume, 0), 1);
        }
      }
    }
  }
};

// Inizializza l'utilità di sintesi vocale
SpeechSynthesis.init();

export default SpeechSynthesis;
