// utils/audioAmplifier.js
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

gainNode.gain.value = 1; // Imposta il volume iniziale (1 = 100%)
gainNode.connect(audioContext.destination); // Collega il nodo di guadagno all'uscita audio

const AudioAmplifier = {
  setVolume(volume) {
    // Imposta il valore del volume del GainNode (0 = muto, 1 = volume normale, >1 = amplificato)
    gainNode.gain.value = Math.max(0, Math.min(volume, 2)); // Limita il volume tra 0 e 2
  },

  playAudioBuffer(buffer) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode); // Collega il buffer di origine al nodo di guadagno
    source.start();
  },

  async loadAndPlayAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    this.playAudioBuffer(audioBuffer);
  }
};

export default AudioAmplifier;
