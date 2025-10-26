import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 443,
    // https: {
    //   key: fs.readFileSync("/etc/ssl/private/localhost.key"),
    //   cert: fs.readFileSync("/etc/ssl/certs/localhost.crt"),
    // },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
