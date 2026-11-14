/**
 * Theme "rxjs" (lint): observables used without leaks nor lost errors.
 *
 * The recommended config of eslint-plugin-rxjs-x, with the types: subscriptions inside
 * subscriptions, ignored errors, unsafe operators after takeUntil, deprecated operators.
 */
import { FILES } from '../load.mjs';

export const theme = 'rxjs';
export const packages = ['eslint-plugin-rxjs-x'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/rxjs',
      files: FILES.typescript,
      extends: [loaded['eslint-plugin-rxjs-x'].configs.recommended],
    },
  ];
}
