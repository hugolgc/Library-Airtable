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
      aspectRatio: {
        '2/3': '16 / 20'
      }
    }
  },
  plugins: []
}

// npx tailwindcss -o ./styles/global.css -w -m