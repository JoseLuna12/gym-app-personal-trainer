const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const designSystemPath = path.resolve(__dirname, '../design-system');

const config = getDefaultConfig(__dirname);

config.watchFolders = [designSystemPath];
config.resolver.unstable_enableSymlinks = true;
// Let Metro find gympairo's node_modules when resolving deps from design-system
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];
config.resolver.extraNodeModules = {
  '@jlunamena/design-system': designSystemPath,
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react-native-svg': path.resolve(__dirname, 'node_modules/react-native-svg'),
  '@shopify/react-native-skia': path.resolve(__dirname, 'node_modules/@shopify/react-native-skia'),
};

const gympairoModules = path.resolve(__dirname, 'node_modules');
const skiaSourceEntry = path.resolve(
  __dirname,
  'node_modules/@shopify/react-native-skia/src/index.ts'
);
const singletonModules = new Set([
  '@shopify/react-native-skia',
  'react',
  'react-native',
  'react-native-svg',
]);

const expoResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Route design system to SOURCE native entry (avoids web version + prebuilt
  // CJS bundle whose require("react") returns null). Metro bundles the whole
  // graph so React/RN/SVG are a single instance shared with the app.
  if (moduleName === '@jlunamena/design-system' && platform !== 'web') {
    return {
      filePath: path.join(designSystemPath, 'src/index.native.ts'),
      type: 'sourceFile',
    };
  }

  // Skia must resolve to its React Native source entry so Metro respects the
  // package's native codegen path instead of Node's "main" field.
  if (
    context.originModulePath?.startsWith(designSystemPath) &&
    moduleName === '@shopify/react-native-skia'
  ) {
    return {
      filePath: skiaSourceEntry,
      type: 'sourceFile',
    };
  }

  // Keep React/RN/SVG single-instanced, but let Metro resolve relative source
  // files and image assets from design-system normally.
  if (
    context.originModulePath?.startsWith(designSystemPath) &&
    singletonModules.has(moduleName)
  ) {
    return {
      filePath: require.resolve(moduleName, { paths: [gympairoModules] }),
      type: 'sourceFile',
    };
  }

  if (expoResolveRequest) return expoResolveRequest(context, moduleName, platform);
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
