import {scaffold} from './lib/index.js';

async function runExample() {
  await scaffold.qualifiedOption(
    {
      'qualified-plugin': {
        qualify: async () => true,
        scaffold: () => {}
      },
      'unqualified-plugin': {
        qualify: async () => false,
        scaffold: () => {}
      }
    },
    {projectRoot: process.cwd()}
  );
}

runExample();
