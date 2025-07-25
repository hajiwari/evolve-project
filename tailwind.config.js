/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        primary: "#FF7A00", 
        secondary: "#FFE4CC",
        accent: "#0073E6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444"
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
      fontFamily: {
        'display': ['Pacifico', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}