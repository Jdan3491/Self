// src/types/speechSynthesis.d.ts
declare module './utils/speechSynthesis' {
  interface SpeechSynthesisOptions {
    lang?: string;
    pitch?: number;
    rate?: number;
    volume?: number;
    voiceName?: string;
  }
  
  const SpeechSynthesis: {
    init(): void;
    speak(text: string, options?: SpeechSynthesisOptions): void;
    stop(): void;
    setVolume(volume: number): void;
  };
  
  export default SpeechSynthesis;
}
