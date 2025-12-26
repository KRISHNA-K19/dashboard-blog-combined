/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f766e',
          50: '#f0fdfa'
        },
        accent: {
          DEFAULT: '#fb923c'
        },
        muted: {
          DEFAULT: '#6b7280'
        }
      },
      borderRadius: {
        lg: '0.75rem'
      },
      boxShadow: {
        card: '0 4px 12px rgba(2,6,23,0.06)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};