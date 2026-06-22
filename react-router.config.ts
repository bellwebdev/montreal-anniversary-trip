import type { Config } from "@react-router/dev/config";

export default {
  // Fully static export: no SSR server, every route is prerendered to HTML
  // so the build can be hosted as a static site on Cloudflare Pages.
  ssr: false,
  prerender: ["/", "/day/1", "/day/2", "/day/3", "/day/4", "/culture", "/reviews"],
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
