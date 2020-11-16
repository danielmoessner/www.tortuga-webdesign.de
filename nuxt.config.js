const path = require("path");

export default {
  target: "static",
  /*
   ** Headers of the page
   */
  head: {
    title: "Tortuga Webdesign",
    htmlAttrs: {
      lang: "de",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Generate
   */
  generate: {
    fallback: "404.html",
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/styles/tailwind.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/lazysizes.client.js" },
    { src: "@/directives/animateonscroll.js", mode: "client" },
  ],
  /*
   ** Nuxt.js build-modules
   */
  buildModules: ["@nuxtjs/gtm", "@aceforth/nuxt-optimized-images"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxt/content"],
  /*
   ** Nuxt Optimized Images Config
   */
  optimizedImages: {
    optimizeImages: true,
  },
  /*
   ** Google Tag Manager Config
   */
  gtm: {
    id: "GTM-TQM6M58",
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: false,
    postcss: {
      plugins: {
        "postcss-import": {},
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
        "@fullhuman/postcss-purgecss":
          process.env.NODE_ENV === "production"
            ? {
                content: [
                  "./components/**/*.vue",
                  "./layouts/**/*.vue",
                  "./pages/**/*.vue",
                ],
                safelist: [
                  "body",
                  "html",
                  "nuxt-progress",
                  "__nuxt",
                  "__layout",
                  /-(leave|enter|appear)(|-(to|from|active))$/, // Normal transitions
                  /^nuxt-link(|-exact)-active$/, // Nuxt link classes
                  /^(?!cursor-move).+-move$/, // Move transitions
                  /data-v-.*/, // Keep scoped styles
                  "aos-init", // aos stuff
                  "aos-animate",
                  "data-aos-delay",
                  "data-aos-duration",
                  "fade-up",
                  "zoom-in", // end aos stuff
                ],
                defaultExtractor: (content) => {
                  const broadMatches =
                    content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
                  const innerMatches =
                    content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
                  return broadMatches.concat(innerMatches);
                },
              }
            : false,
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ["data-src", "src"];
        vue.transformAssetUrls.source = ["data-srcset", "srcset"];
      }
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue|ts)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
      config.module.rules.unshift({
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: "responsive-loader",
          options: {
            adapter: require("responsive-loader/sharp"),
          },
        },
      });
    },
  },
};
