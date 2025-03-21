import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // o specifica l'IP del tuo computer, ad esempio "192.168.1.100"
    port: 3000 // oppure la porta che preferisci
  }
});
