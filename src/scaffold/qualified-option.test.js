import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import filterOptionsToQualified from '../qualify/qualified-options-filter.js';
import scaffoldQualifiedOption from './qualified-option.js';

vi.mock('../qualify/qualified-options-filter.js');

describe('scaffold qualified plugin option', () => {
  const plugins = any.simpleObject();
  const options = any.simpleObject();

  it('should scaffold the qualified plugin', async () => {
    const qualifiedScaffold = vi.fn();
    const qualifiedPlugin = [any.word(), {scaffold: qualifiedScaffold}];
    const qualifiedPluginsMap = Object.fromEntries([qualifiedPlugin]);
    const scaffoldResults = any.simpleObject();
    when(filterOptionsToQualified).calledWith(plugins, options).thenResolve(qualifiedPluginsMap);
    when(qualifiedScaffold).calledWith(options).thenResolve(scaffoldResults);

    expect(await scaffoldQualifiedOption(plugins, options)).toEqual(scaffoldResults);
  });

  it('should return empty results if no plugins qualify', async () => {
    const qualifiedPluginsMap = Object.fromEntries([]);
    when(filterOptionsToQualified).calledWith(plugins, options).thenResolve(qualifiedPluginsMap);

    expect(await scaffoldQualifiedOption(plugins, options)).toEqual({});
  });

  it('should throw an error if multiple plugins qualify', async () => {
    const qualifiedPlugins = any.listOf(
      () => ([any.word(), any.simpleObject()]),
      {size: any.integer({min: 2, max: 10})}
    );
    const qualifiedPluginsMap = Object.fromEntries(qualifiedPlugins);
    when(filterOptionsToQualified).calledWith(plugins, options).thenResolve(qualifiedPluginsMap);

    await expect(scaffoldQualifiedOption(plugins, options))
      .rejects.toThrow(`No more than one qualified plugin expected, but ${qualifiedPlugins.length} were found`);
  });
});
