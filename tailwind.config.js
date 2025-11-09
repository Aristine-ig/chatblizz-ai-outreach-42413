/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'glass-white': 'hsl(var(--glass-white) / <alpha-value>)',
        'glass-gray': 'hsl(var(--glass-gray) / <alpha-value>)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
};
