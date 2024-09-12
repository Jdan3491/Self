// src/types/playSound.d.ts
declare module './directives/playSound' {
  const playSound: {
    beforeMount(el: HTMLElement, binding: { value: string }): void;
    unmounted(el: HTMLElement): void;
  };

  export default playSound;
}
