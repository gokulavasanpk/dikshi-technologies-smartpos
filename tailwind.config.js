/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dikshi: {
          blue: '#0456DD',
          dark: '#090D1A',
          navy: '#0B1528',
          slate: '#1E293B',
          bg: '#FAFAFB',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        barlow: ['"Plus Jakarta Sans"', 'sans-serif'], // Remap legacy Barlow references to modern Plus Jakarta Sans
        archivo: ['"Plus Jakarta Sans"', 'sans-serif'] // Remap legacy Archivo references to modern Plus Jakarta Sans
      }
    },
  },
  plugins: [],
}
