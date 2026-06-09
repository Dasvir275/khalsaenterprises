/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        punjabi: ['Noto Sans Gurmukhi', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#f97316',
          amber:  '#fbbf24',
          deep:   '#0a0a12',
        },
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'pulse-ring':    'pulseRing 2s ease-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'spin-slow':     'spin 12s linear infinite',
        'glow':          'glow 2s ease-in-out infinite',
        'slide-up':      'slideUp 0.7s ease forwards',
      },
      keyframes: {
        float:         { '0%,100%': { transform: 'translateY(0px) rotate(0deg)' }, '33%': { transform: 'translateY(-15px) rotate(2deg)' }, '66%': { transform: 'translateY(-8px) rotate(-2deg)' } },
        pulseRing:     { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        shimmer:       { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        bounceGentle:  { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        glow:          { '0%,100%': { boxShadow: '0 0 20px rgba(249,115,22,0.4)' }, '50%': { boxShadow: '0 0 40px rgba(249,115,22,0.8), 0 0 60px rgba(249,115,22,0.3)' } },
        slideUp:       { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
