/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired color palette
        'apple': {
          white: '#ffffff',
          black: '#000000',
          'gray-100': '#f5f5f7',
          'gray-200': '#e5e5e7',
          'gray-300': '#d2d2d7',
          'gray-400': '#c7c7cc',
          'gray-500': '#a1a1aa',
          'gray-600': '#737375',
          'gray-700': '#525254',
          'gray-800': '#3a3a3c',
          'gray-900': '#202022',
          'gray-950': '#121213',
          blue: '#0066cc',
          'blue-light': '#4da6ff',
        },
        // Custom colors from CSS variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        // Apple uses SF Pro, but we'll use system fonts as fallback
        'sans': ['SF Pro Display', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'apple-md': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'apple-lg': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'apple-xl': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
      },
      borderRadius: {
        'apple': '12px',
      },
    },
  },
  plugins: [],
}