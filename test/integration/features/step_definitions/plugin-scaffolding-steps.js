import assert from 'node:assert';
import {Given, Then, When} from '@cucumber/cucumber';
import any from '@travi/any';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {scaffold} from '@form8ion/plugins-core';

Given('one of the plugins qualifies from the provided options', async function () {
  this.qualifiedScaffolderCalled = false;

  this.plugins = Object.fromEntries([
    ...any.listOf(() => ([any.word(), {...any.simpleObject(), qualify: async () => false}])),
    [
      any.word(),
      {
        ...any.simpleObject(),
        qualify: async () => true,
        scaffold: async () => {
          this.qualifiedScaffolderCalled = true;
        }
      }
    ],
    ...any.listOf(() => ([any.word(), any.simpleObject()]))
  ]);
});

Given('none of the plugins qualify from the provided options', async function () {
  this.plugins = Object.fromEntries([
    ...any.listOf(() => ([any.word(), {...any.simpleObject(), qualify: async () => false}])),
    ...any.listOf(() => ([any.word(), any.simpleObject()]))
  ]);
});

Given('multiple plugins qualify from the provided options', async function () {
  this.plugins = Object.fromEntries([
    ...any.listOf(() => ([any.word(), {...any.simpleObject(), qualify: async () => false}])),
    [any.word(), {...any.simpleObject(), qualify: async () => true}],
    [any.word(), {...any.simpleObject(), qualify: async () => true}],
    ...any.listOf(() => ([any.word(), any.simpleObject()]))
  ]);
});

Given('no plugins are provided', async function () {
  this.plugins = {};
});

When('scaffolding the qualified plugin from options', async function () {
  try {
    await scaffold.qualifiedOption(this.plugins);
  } catch (error) {
    this.resultError = error;
  }
});

Then('the qualified plugin is scaffolded', async function () {
  assert.strictEqual(this.qualifiedScaffolderCalled, true);
});

Then('no scaffolding is performed', async function () {
  return undefined;
});

Then('an error is thrown indicating multiple options qualify', async function () {
  assert.equal(this.resultError.message, 'No more than one qualified plugin expected, but 2 were found');
});
