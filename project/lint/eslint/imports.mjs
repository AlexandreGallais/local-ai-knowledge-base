/**
 * Theme "imports" (lint): what goes wrong between modules.
 *
 * The recommended and TypeScript configs of eslint-plugin-import-x, resolved by
 * eslint-import-resolver-typescript (paths of tsconfig.json included), and:
 * - no-cycle: two modules that import each other, directly or through others;
 * - no-extraneous-dependencies: an import of a package that package.json does not declare;
 * - no-duplicates, no-self-import, no-mutable-exports, no-useless-path-segments.
 */
import { FILES } from '../load.mjs';

export const theme = 'imports';

export const packages = ['eslint-plugin-import-x', 'eslint-import-resolver-typescript'];

/** Rules beyond the recommended config. */
const RULES = {
  // A cycle makes the order of loading matter, and one module sees the other half built.
  'import-x/no-cycle': 'error',
  // A package used but not declared works on one machine only. Tests and tool configs may use
  // the devDependencies.
  'import-x/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.{spec,test}.{ts,mts}',
        '**/*.config.{ts,mts,js,mjs}',
        '**/*.stories.ts',
        'lint/**',
        'e2e/**',
      ],
    },
  ],
  // let exported can change under the feet of the modules that import it.
  'import-x/no-mutable-exports': 'error',
  // A module that imports itself.
  'import-x/no-self-import': 'error',
  // './a/../b' is './b'.
  'import-x/no-useless-path-segments': 'error',
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  const importX = loaded['eslint-plugin-import-x'];
  const { createTypeScriptImportResolver } = loaded['eslint-import-resolver-typescript'];

  return [
    {
      name: 'lint/imports',
      files: FILES.scripts,
      extends: [importX.flatConfigs.recommended, importX.flatConfigs.typescript],
      rules: RULES,
      settings: {
        'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })],
      },
    },
  ];
}
