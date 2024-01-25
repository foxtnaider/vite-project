import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    // Cargar las variables de entorno en el objeto import.meta.env
    'import.meta.env': JSON.stringify(process.env),
    base: "/converti-file/",
    plugins: [vue()],
});
