module.exports = {
  configureWebpack: {
    externals: {
      moment: 'moment',
    },
  },
  pwa: {
    name: 'MyTerm',
    themeColor: '#72DDF7',
    msTileColor: '#72DDF7',
    appleMobileWebAppCapable: 'no',
    appleMobileWebAppStatusBarStyle: 'default',
    manifestPath: 'manifest.json',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
    },
  },
};
