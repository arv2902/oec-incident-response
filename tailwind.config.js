/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          darkest: '#080C14',
          bg: '#0B0F17',
          surface: '#111827',
          panel: '#151D2C',
          card: '#1A2436',
          border: '#2A374D',
          hover: '#222F46',
        },
        marine: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          glow: '#00F0FF',
        },
        alert: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          flash: '#FF2A2A',
        },
        slate: {
          750: '#232E42',
          850: '#141E30',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        'red-flash': {
          '0%, 100%': { backgroundColor: 'rgba(220, 38, 38, 0.05)', borderColor: 'rgba(239, 68, 68, 0.3)' },
          '50%': { backgroundColor: 'rgba(220, 38, 38, 0.28)', borderColor: 'rgba(255, 42, 42, 0.95)', boxShadow: '0 0 35px rgba(239, 68, 68, 0.6)' },
        },
        'screen-flash': {
          '0%': { opacity: '0.85' },
          '15%': { opacity: '0.3' },
          '30%': { opacity: '0.7' },
          '50%': { opacity: '0.2' },
          '100%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.03)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'red-flash': 'red-flash 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'screen-flash': 'screen-flash 0.9s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
      }
    },
  },
  plugins: [],
}
