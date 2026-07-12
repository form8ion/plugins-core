import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';

import any from '@travi/any';
import filterOptionsToQualified from './qualified-options-filter.js';

describe('qualified options filter', () => {
  it('should filter the provided plugins to qualified options', async () => {
    const qualifiedPluginName = any.word();
    const qualifiedPlugin = {qualify: vi.fn()};
    const unqualifiedPlugins = any.listOf(() => ([any.word(), {qualify: vi.fn()}]));
    const moreUnqualifiedPlugins = any.listOf(() => ([any.word(), {qualify: vi.fn()}]));
    const pluginsWithoutQualify = any.listOf(() => ([any.word(), any.simpleObject()]));
    const options = any.simpleObject();
    const plugins = Object.fromEntries([
      ...unqualifiedPlugins,
      [qualifiedPluginName, qualifiedPlugin],
      ...pluginsWithoutQualify,
      ...moreUnqualifiedPlugins
    ]);
    when(qualifiedPlugin.qualify).calledWith(options).thenResolve(true);
    [...unqualifiedPlugins, ...moreUnqualifiedPlugins].forEach(([, plugin]) => {
      when(plugin.qualify).calledWith(options).thenResolve(false);
    });

    expect(await filterOptionsToQualified(plugins, options)).toEqual({[qualifiedPluginName]: qualifiedPlugin});
  });
});
