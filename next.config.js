// next.config.js
const withSass = require("@zeit/next-sass");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withCSS = require('@zeit/next-css')
const fetch = require("isomorphic-unfetch");

if (
  process.env.npm_package_scripts_build_deploy ==
  "next build && next export && node utility_script/gulp.optimizer.js"
) {
  module.exports = withPlugins(
    [
      // add a plugin with specific configuration
      withSass,
      [
        withImages,
        {
          inlineImageLimit: 16384
        }
      ],
      withCSS
    ],
    {
      async exportPathMap() {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=batman"
        );
        const postList = await response.json();
        const s3path = "/index";
        const shows = postList.map(entry => entry.show);
        const pages = shows.reduce(
          (pages, post) =>
            Object.assign({}, pages, {
              [`/p2/${post.id}${s3path}`]: {
                page: "/post2",
                query: { id: post.id }
              }
            }),
          {}
        );
        return Object.assign({}, pages, {
          "/": { page: "/" },
          [`/fetchData${s3path}`]: { page: "/fetchData" },
          "/post": { page: "/post" },
          "/404/index.html": { page: "404" }
        });
      }
    }
  );
} else {
  module.exports = withPlugins(
    [
      withSass,
      [
        withImages,
        {
          inlineImageLimit: 16384
        }
      ],
      withCSS
    ],
    {
      target: "serverless"
    }
  );
}
