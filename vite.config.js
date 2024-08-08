import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3333,
    strictPort: true,
    proxy: {
      "/png": {
        target: "https://logo-maker-alpha.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/png/, "/png"),
        // Ensure CORS headers are handled correctly
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("Origin", "https://logo-maker-alpha.vercel.app/");
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            const corsHeaders = {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            };
            Object.keys(corsHeaders).forEach((key) => {
              proxyRes.headers[key] = corsHeaders[key];
            });
          });
        },
      },
    },
  },
});
