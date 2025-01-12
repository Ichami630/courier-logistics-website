export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#1E90FF', // Light blue
          200: '#007BFF', // Vibrant blue
        },
        secondary: {
          100: '#343A40', // Dark gray
          200: '#6C757D', // Muted gray
        },
        accent: {
          100: '#FF5733', // Vibrant orange for buttons or highlights
          200: '#28A745', // Green for success indicators
        },
      },
    },
    
  },
  plugins: [],
}
