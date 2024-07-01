import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    modulePreload: false,
    lib: {
      entry: "./src/main.js",
      name: "my-lib",
    },
  },
});
