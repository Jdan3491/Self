/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Se stai usando un file HTML root
    './src/**/*.{vue,js,ts,jsx,tsx}', // Include tutti i componenti Vue e file JS/TS
  ],
  theme: {
    extend: {
      colors: {
        // Esempio di colori personalizzati
        primary: '#1D4ED8',
        secondary: '#F59E0B',
        accent: '#10B981',
      },
      fontFamily: {
        // Esempio di aggiunta di font personalizzati
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    // Puoi aggiungere plugin qui, ad esempio:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
