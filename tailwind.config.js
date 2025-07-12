/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sage-dark': '#5c654f',
        'sage-medium': '#7a8268',
        'sage-light': '#9ca085',
        'cream': '#e5e2dd',
        'warm-beige': '#b4a792',
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'elegant': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};