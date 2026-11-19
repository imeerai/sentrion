/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f1f1ef', ink: '#0e0e10', tile: '#0b0c0f',
        lime: '#bdf23c', limeink: '#5f7a12', muted: '#83858c',
        line: '#e2e2de', brick: '#e05a3b', good: '#6fbf73',
      },
      fontFamily: {
        d: ['Archivo', 'sans-serif'],
        m: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
