module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A2747',
        secondary: '#1D293D',
        accent: '#6584F6',
        highlight: '#FC7C35',
        muted: '#969AAC',
        surface: '#F1F1F8',
        night: '#0B1120',
      },
      fontFamily: {
        Satoshi: ['Satoshi', 'sans-serif'],
        Quicksand: ['var(--font-quicksand)', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
