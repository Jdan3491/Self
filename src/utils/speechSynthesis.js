const SpeechSynthesis = {
  init() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported in this browser.');
      return;
    }

    this.voices = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
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
    if (!text) {
      console.warn('No text provided for speech synthesis.');
      return;
    }

    if (options.volume === 0) {
      this.stop();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'it-IT';
    utterance.pitch = options.pitch || 1;
    utterance.rate = options.rate || 0.9;
    utterance.volume = options.volume || 1;

    const voiceName = options.voiceName || 'Google italiano';
    utterance.voice = this.voices.find(
      (voice) => voice.name === voiceName && voice.lang === utterance.lang
    );

    if (!utterance.voice) {
      console.warn(`Voice "${voiceName}" not found.`);
    }

    this.currentUtterance = utterance;
    this.isSpeaking = true;

    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      this.isSpeaking = false;
    };
  },

  stop() {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.isSpeaking = false;
    }
  },

  setVolume(volume) {
    volume = Math.min(Math.max(volume, 0), 1);

    if (volume === 0) {
      this.stop();
    } else if (this.currentUtterance) {
      if (this.isSpeaking) {
        const { text, lang, pitch, rate, voice } = this.currentUtterance;
        this.stop();
        this.speak(text, { lang, pitch, rate, volume, voiceName: voice?.name });
      } else {
        this.currentUtterance.volume = volume;
      }
    }
  }
};

SpeechSynthesis.init();

export default SpeechSynthesis;
