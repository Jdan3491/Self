declare module '@/utils/speechSynthesis' {
  interface SpeechOptions {
    lang?: string;
    pitch?: number;
    rate?: number;
    volume?: number;
    voiceName?: string;
  }

  const SpeechSynthesis: {
    init(): void;
    loadVoices(): void;
    speak(text: string, options?: SpeechOptions): void;
    stop(): void;
    setVolume(volume: number): void;
  };

  export default SpeechSynthesis;
}
