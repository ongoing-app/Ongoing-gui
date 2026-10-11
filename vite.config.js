import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "OngoingGUI",
      formats: ["es", "cjs"],
      fileName: (f) => `index.${f === "es" ? "js" : "cjs"}`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"]
    }
  }
});