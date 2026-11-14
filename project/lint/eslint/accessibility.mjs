/**
 * Theme "accessibility" (lint): templates that a keyboard and a screen reader can use.
 *
 * The accessibility config of angular-eslint: labels, alt texts, roles and their attributes,
 * interactive elements that take the focus, no positive tabindex.
 */
import { FILES } from '../load.mjs';

export const theme = 'accessibility';
export const packages = ['angular-eslint'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/accessibility',
      files: FILES.templates,
      extends: [loaded['angular-eslint'].configs.templateAccessibility],
    },
  ];
}
