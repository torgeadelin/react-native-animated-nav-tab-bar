/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { sourceExts, assetExts } } = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    unstable_enablePackageExports: false,
    resolveRequest: function packageExportsResolver(context, moduleImport, platform) {
      // Use the browser version of the package for React Native 
      if (moduleImport === '<package>' || moduleImport.startsWith('<package>/')) {
        return context.resolveRequest(
          {
            ...context,
            unstable_conditionNames: ['browser'],
          },
          moduleImport,
          platform,
        );
      }

      // Fall back to normal resolution
      return context.resolveRequest(context, moduleImport, platform);
    }
  },
  watchFolders: [path.resolve(__dirname, "../")],
};



module.exports = mergeConfig(defaultConfig, config);