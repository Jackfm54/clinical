/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 *
 * @format
 */

module.exports = {
  transformer: {
    assetPlugins: ["react-native-svg-transformer"],
  },
  resolver: {
    assetExts: ["js", "json", "png", "jpg", "svg", "ttf", "otf"],
  },
};
