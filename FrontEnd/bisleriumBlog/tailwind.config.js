/** @type {import('tailwindcss').Config} */
// Import withMT from the material-tailwind package
import withMT from "@material-tailwind/react/utils/withMT";

// Define and export the Tailwind configuration using withMT
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
