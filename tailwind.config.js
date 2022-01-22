module.exports = {
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          dark: '#7b807e',
          light: '#d7d7d7'
        },
        green: {
          dark: '#1d322b',
          DEFAULT: '#558b78',
          light: '#ebf1e9'
        }
      },
      spacing: {
        '8.5': '34px',
        '18': '72px',
      },
      width: {
        search: '398px'
      },
      maxWidth: {
        base: '1294px'
      },
      aspectRatio: {
        'cover': '91/125'
      }
    }
  },
  plugins: []
}

// npx tailwindcss -o ./styles/global.css -w -m