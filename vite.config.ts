import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Base path matches the GitHub Pages URL: https://saefmajed-del.github.io/sanad-portal/
export default defineConfig({
  plugins: [react()],
  base: "/Sanad-Portal/",
});
