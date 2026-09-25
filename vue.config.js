// Vue CLI has loaded the .env files by the time this runs. Without the value
// every canonical and og:url would point at "undefined".
if (!process.env.VUE_APP_SITE_URL) {
  throw new Error("VUE_APP_SITE_URL is not set -- see .env.example");
}

module.exports = {
  //change if true to '/waktu-solat/' if the intended domain is foo.github.io/waktu-solat
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "Waktu Solat";

          // scripts/prerender.js keys off the <!--SEO--> and <!--PRERENDER-->
          // markers in index.html. html-webpack-plugin defaults to minify:'auto',
          // which strips comments in production, so spell the options out here.
          if(process.env.NODE_ENV === 'production') {
            args[0].minify = {
              collapseWhitespace: true,
              keepClosingSlash: true,
              removeComments: false,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            };
          }

          return args;
      })
  }


}
