import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  server: {
    open: "/src/index.html",
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "src/index.html"),
      },
    },
  },
});
