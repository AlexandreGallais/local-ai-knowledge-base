/**
 * Theme "ngrxSignals" (lint): stores of @ngrx/signals used as NgRx advises.
 *
 * The typed Signals config of @ngrx/eslint-plugin: patchState on a protected state, signalMethod
 * and rxMethod used well, no state updated outside the store.
 */
import { FILES } from '../load.mjs';

export const theme = 'ngrxSignals';
export const packages = ['@ngrx/eslint-plugin'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/ngrx-signals',
      files: FILES.typescript,
      extends: [loaded['@ngrx/eslint-plugin'].configs.signalsTypeChecked],
    },
  ];
}
