import filterOptionsToQualified from '../qualify/qualified-options-filter.js';

export default async function scaffoldQualifiedOption(plugins, options) {
  const qualifiedPlugins = Object.values(await filterOptionsToQualified(plugins, options));

  if (0 === qualifiedPlugins.length) {
    return {};
  }

  if (1 < qualifiedPlugins.length) {
    throw new Error(`No more than one qualified plugin expected, but ${qualifiedPlugins.length} were found`);
  }

  const [qualifiedPlugin] = qualifiedPlugins;

  return qualifiedPlugin.scaffold(options);
}
