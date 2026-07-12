export default async function filterOptionsToQualified(plugins, options) {
  const qualificationResults = await Promise.all(
    Object.entries(plugins).map(async ([pluginName, plugin]) => [
      pluginName,
      plugin,
      await plugin.qualify?.(options)
    ])
  );

  return Object.fromEntries(qualificationResults.filter(([, , qualifies]) => qualifies));
}
