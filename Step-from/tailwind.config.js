/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{html,ts,vue}"
  ],
   theme: {
    extend: {
      colors: {
        blue: {
          50: '#E5F2FF',
          100: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
}

