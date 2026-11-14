/**
 * Theme "templateFormat" (format): what the format pass adds to Prettier in Angular templates.
 *
 * Attributes sorted, self-closing tags for elements without content, an @else or @empty block
 * instead of a second @if, @for variables taken from the loop context. Rules of angular-eslint that
 * fix themselves.
 */
import { FILES } from '../load.mjs';

export const theme = 'templateFormat';
export const packages = ['angular-eslint'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  const angular = loaded['angular-eslint'];

  return [
    {
      name: 'format/angular-template',
      files: FILES.templates,
      languageOptions: { parser: angular.templateParser },
      plugins: { '@angular-eslint/template': angular.templatePlugin },
      rules: {
        '@angular-eslint/template/attributes-order': ['error', { alphabetical: true }],
        '@angular-eslint/template/prefer-at-else': 'error',
        '@angular-eslint/template/prefer-at-empty': 'error',
        '@angular-eslint/template/prefer-contextual-for-variables': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
      },
    },
  ];
}
