declare module './utils/speechSynthesis' {
  export const SpeechSynthesis: {
    init(): void;
    speak(text: string, options?: {
      lang?: string;
      pitch?: number;
      rate?: number;
      volume?: number;
      voiceName?: string;
    }): void;
    stop(): void;
    setVolume(volume: number): void;
  };
}
