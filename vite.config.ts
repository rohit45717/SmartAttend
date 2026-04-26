import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  if (mode === "development") {
    // eslint-disable-next-line no-console
    console.log("[AttendEase] Vite loaded env:", {
      VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY ? `${env.VITE_FIREBASE_API_KEY.slice(0, 6)}…` : "",
      VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID || "",
      VITE_SUPABASE_URL: env.VITE_SUPABASE_URL ? "set" : "",
    });
  }

  return {
    base: mode === "production" ? "/attendease-genius-hub/" : "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
  };
});
