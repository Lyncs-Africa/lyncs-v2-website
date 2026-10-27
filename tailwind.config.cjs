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
        eminence: '#F9FAFB',
        light: '#E5E7EB',
      },
      borderRadius: {
        'large': '16px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '2xs': '0 1px 1px 0 rgba(0, 0, 0, 0.03)',
      },
      fontSize: {
        '11px': ['11px', '14px'],
        '12px': ['12px', '16px'],
        '13px': ['13px', '18px'],
        '14px': ['14px', '20px'],
        '15px': ['15px', '22px'],
        '16px': ['16px', '24px'],
        '18px': ['18px', '26px'],
        '20px': ['20px', '28px'],
        '22px': ['22px', '30px'],
        '24px': ['24px', '32px'],
        '32px': ['32px', '40px'],
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
