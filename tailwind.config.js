/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // light theme
        "frist-primary-bg": "var(--frist-primary-bg)",
        "second-primary-bg": "var(--second-primary-bg)",
        "third-primary-bg": "var(--third-primary-bg)",

        "frist-primary-text": "var(--frist-primary-text)",
        "second-primary-text": "var(--second-primary-text)",
        "third-primary-text": "var(--third-primary-text)",
        "fourth-primary-text": "var(--fourth-primary-text)",
        "fifth-primary-text": "var(--fifth-primary-text)",
        "sixth-primary-text": "var(--sixth-primary-text)",

        "first-primary-icon-btn": "var(--first-primary-icon-btn)",
        "second-primary-icon-btn": "var(--second-primary-icon-btn)",
        "third-primary-icon-btn": "var(--third-primary-icon-btn)",
        "fourth-primary-icon-btn": "var(--fourth-primary-icon-btn)",

        "first-primary-icon-color": "var(--first-primary-icon-color)",
        "second-primary-icon-color": "var(--second-primary-icon-color)",
        "third-primary-icon-color": "var(--third-primary-icon-color)",

        "first-primary-btn": "var(--first-primary-btn)",
        "first-primary-hover-btn": "var(--first-primary-hover-btn)",
        "second-primary-btn": "var(--second-primary-btn)",
        "second-primary-hover-btn": "var(--second-primary-hover-btn)",
        "third-primary-btn": "var(--third-primary-btn)",
        "third-primary-hover-btn": "var(--third-primary-hover-btn)",
        "fourth-primary-btn": "var(--fourth-primary-btn)",
        "fourth-primary-hover-btn": "var(--fourth-primary-hover-btn)",


        "first-primary-border": "var(--first-primary-border)",
        "second-primary-border": "var(--second-primary-border)",
        "third-primary-border": "var(--third-primary-border)",
        "fourth-primary-border": "var(--fourth-primary-border)",
        "fifth-primary-border": "var(--fifth-primary-border)",

        "first-primary-shadow": "var(--first-primary-shadow)",



        // dark theme
        "dark-frist-primary-bg": "var(--dark-frist-primary-bg)",
        "dark-second-primary-bg": "var(--dark-second-primary-bg)",
        "dark-third-primary-bg": "var(--dark-third-primary-bg)",

        "dark-frist-primary-text": "var(--dark-frist-primary-text)",
        "dark-second-primary-text": "var(--dark-second-primary-text)",
        "dark-third-primary-text": "var(--dark-third-primary-text)",
        "dark-fourth-primary-text": "var(--dark-fourth-primary-text)",
        "dark-fifth-primary-text": "var(--dark-fifth-primary-text)",
        "dark-sixth-primary-text": "var(--dark-sixth-primary-text)",

        "dark-first-primary-icon-btn": "var(--dark-first-primary-icon-btn)",
        "dark-second-primary-icon-btn": "var(--dark-second-primary-icon-btn)",
        "dark-third-primary-icon-btn": "var(--dark-third-primary-icon-btn)",
        "dark-fourth-primary-icon-btn": "var(--dark-fourth-primary-icon-btn)",

        "dark-first-primary-icon-color": "var(--dark-first-primary-icon-color)",
        "dark-second-primary-icon-color": "var(--dark-second-primary-icon-color)",
        "dark-third-primary-icon-color": "var(--dark-third-primary-icon-color)",

        "dark-first-primary-btn": "var(--dark-first-primary-btn)",
        "dark-first-primary-hover-btn": "var(--dark-first-primary-hover-btn)",
        "dark-second-primary-btn": "var(--dark-second-primary-btn)",
        "dark-second-primary-hover-btn": "var(--dark-second-primary-hover-btn)",
        "dark-third-primary-btn": "var(--dark-third-primary-btn)",
        "dark-third-primary-hover-btn": "var(--dark-third-primary-hover-btn)",
        "dark-fourth-primary-btn": "var(--dark-fourth-primary-btn)",
        "dark-fourth-primary-hover-btn": "var(--dark-fourth-primary-hover-btn)",

        "dark-first-primary-border": "var(--dark-first-primary-border)",
        "dark-second-primary-border": "var(--dark-second-primary-border)",
        "dark-third-primary-border": "var(--dark-third-primary-border)",
        "dark-fourth-primary-border": "var(--dark-fourth-primary-border)",
        "dark-fifth-primary-border": "var(--dark-fifth-primary-border)",

        "dark-first-primary-shadow": "var(--dark-first-primary-shadow)"
      },

      keyframes: {
        rotate: {
          'from': {
            transform: 'rotate(0deg)',
          },

          'to': {
            transform: 'rotate(360deg)',
          }
        },
      }, animation: {
        rotate: 'rotate 5s linear infinite',
      },
    },
    screens: {
      'ssm': { 'max': '400px' },
      'smmd': { 'max': '478px' },
      'sm': { 'max': '640px' },
      'md': { 'max': '768px' },
      'lg': { 'max': '1075px' },
      'xl': { 'max': '1280px' },
      '2xl': { 'max': '1536px' },
      '3xl': { 'max': '1919px' },

      'mssm': { 'min': '400px' },
      'mmmd': { 'min': '478px' },
      'msm': { 'min': '640px' },
      'mmd': { 'min': '769px' },
      'mlg': { 'min': '1075px' },
      'mxl': { 'min': '1280px' },
      'm2xl': { 'min': '1536px' },
    },
    fontFamily: {
      'sans': ['TikTokFont', 'Arial', 'Tahoma', 'PingFangSC', 'sans-serif']
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}



