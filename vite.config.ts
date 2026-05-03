import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from '@netlify/remix-adapter/plugin'

export default defineConfig({
  plugins: [remix({
    ignoredRouteFiles: ["**/*.css"],
  }), tsconfigPaths(), netlifyPlugin(), sentryVitePlugin({
    org: "haider-yf",
    project: "javascript-remix"
  })],

  build: {
    sourcemap: true
  }
});
