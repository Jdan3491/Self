
declare module '@/directives/playSound' {
  const playSound: {
    beforeMount(el: HTMLElement, binding: any): void;
    unmounted(el: HTMLElement): void;
  };

  export default playSound;
}
