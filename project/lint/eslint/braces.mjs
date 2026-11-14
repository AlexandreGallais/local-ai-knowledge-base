/**
 * Theme "braces" (format): braces around the body of every if, else, for, while and do.
 *
 * A body without braces is a classic bug when a second line is added to it. The core rule curly,
 * with "all": the only setting that never fights Prettier (eslint-config-prettier).
 */
import { FILES } from '../load.mjs';

export const theme = 'braces';
export const packages = [];

/** @returns {object[]} The configs of the theme. */
export function configs() {
  return [
    {
      name: 'format/braces',
      files: FILES.scripts,
      rules: {
        curly: ['error', 'all'],
      },
    },
  ];
}
