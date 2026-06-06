const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const designSystemPath = path.resolve(__dirname, '../pt-design-system');

const config = getDefaultConfig(__dirname);

config.watchFolders = [designSystemPath];
config.resolver.unstable_enableSymlinks = true;
// Let Metro find gympairo's node_modules when resolving deps from pt-design-system
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];
config.resolver.extraNodeModules = {
  '@jlunamena/design-system': designSystemPath,
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react-native-svg': path.resolve(__dirname, 'node_modules/react-native-svg'),
};

const gympairoModules = path.resolve(__dirname, 'node_modules');

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

  // Any require() originating from pt-design-system resolves via gympairo's
  // node_modules so React/RN/SVG are always the same instance as the app.
  if (context.originModulePath?.startsWith(designSystemPath)) {
    try {
      return {
        filePath: require.resolve(moduleName, { paths: [gympairoModules] }),
        type: 'sourceFile',
      };
    } catch {
      // not in gympairo node_modules — fall through
    }
  }

  if (expoResolveRequest) return expoResolveRequest(context, moduleName, platform);
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
