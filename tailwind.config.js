/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['node_modules/preline/dist/*.js'],
  plugins: [require('preline/plugin')],
  theme: {
    fontFamily: {
      en: ["'Archivo Black'", 'sans-serif'],
      body: ["'Noto Sans JP'", 'sans-serif'],
    },

    extend: {
      colors: {
        fore1: '#0d2b13',
        back: '#FFF',
        main1: '#293729',
        main2: '#404C01',
        main3: '#514C4C',
      },
    },
  },
};
