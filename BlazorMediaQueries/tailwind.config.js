/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './Components/**/*.razor',
    './Components/**/*.razor.css',
    './Components/**/*.cshtml',
    './wwwroot/**/*.html',
    './wwwroot/**/*.js'
  ],
  theme: {
    extend: {
      // Preserve any custom design tokens here
      screens: {
        // Tailwind defaults: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
        // Previous breakpoint was 641px, now using Tailwind's md: 768px
      },
      keyframes: {
        'reconnect-slide-up': {
          '0%': { transform: 'translateY(30px) scale(0.95)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        'reconnect-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'reconnect-fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'reconnect-show': 'reconnect-slide-up 1.5s cubic-bezier(.05, .89, .25, 1.02) 0.3s both, reconnect-fade-in 0.5s ease-in-out 0.3s both',
        'reconnect-fade-in': 'reconnect-fade-in 0.5s ease-in-out both',
        'reconnect-fade-out': 'reconnect-fade-out 0.5s both',
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'light', // Default theme
      'dark',
      // Add more themes as needed: 'cupcake', 'bumblebee', 'emerald', 'corporate', etc.
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  }
}
