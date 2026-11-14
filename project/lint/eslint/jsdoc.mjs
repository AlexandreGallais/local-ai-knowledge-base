/**
 * Theme "jsdoc" (lint): a library documents what it exports. Off by default; turn it on in a library.
 *
 * The TypeScript config of eslint-plugin-jsdoc (types come from TypeScript, not from the comment),
 * and a JSDoc with a description on every exported function and class of src/. Tests are left out.
 */
export const theme = 'jsdoc';
export const packages = ['eslint-plugin-jsdoc'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/jsdoc',
      files: ['src/**/*.{ts,mts}'],
      ignores: ['**/*.{spec,test}.{ts,mts}'],
      extends: [loaded['eslint-plugin-jsdoc'].configs['flat/recommended-typescript-error']],
      rules: {
        // A JSDoc on what the module exports, functions and classes alike.
        'jsdoc/require-jsdoc': [
          'error',
          {
            publicOnly: true,
            require: {
              ArrowFunctionExpression: true,
              ClassDeclaration: true,
              FunctionDeclaration: true,
              MethodDefinition: true,
            },
          },
        ],
        // A JSDoc says what the code does, not only its tags.
        'jsdoc/require-description': 'error',
      },
    },
  ];
}
