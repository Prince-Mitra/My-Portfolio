/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#0F1115',
        surface: '#171A21',
        surface2: '#1E222B',
        border: '#2A2F3A',
        ink: '#E7E5E1',
        muted: '#8B909C',
        accent: '#FFB454',
        accent2: '#5EEAD4',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,180,84,0.15), 0 8px 30px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
