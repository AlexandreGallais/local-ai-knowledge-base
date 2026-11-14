/**
 * Theme "copyright" (format): the copyright comment at the top of each file of src/.
 *
 * Used only when COPYRIGHT is set in lint/settings.mjs. The format writes the comment in a file that
 * has none; the lint, which reads this theme through the format config, asks for it. Any year
 * matches: a file written in 2025 keeps its year. eslint-plugin-headers, rule header-format.
 */
import { COPYRIGHT } from '../settings.mjs';

export const theme = 'copyright';
export const packages = ['eslint-plugin-headers'];

/**
 * The options of header-format: the line, its year matching any year.
 * @param {string} line The copyright line of the settings.
 * @returns {object} The options.
 */
function headerOptions(line) {
  const year = /\b\d{4}\b/u.exec(line)?.[0];
  // A blank line between the comment and the code.
  const options = {
    source: 'string',
    style: 'jsdoc',
    content: line,
    trailingNewlines: 2,
  };

  if (year === undefined) {
    return options;
  }

  // (year) is a pattern of eslint-plugin-headers: any year matches, a new file gets this one.
  return {
    ...options,
    content: line.replace(year, '(year)'),
    patterns: {
      year: {
        pattern: String.raw`\d{4}`,
        defaultValue: year,
      },
    },
  };
}

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  if (COPYRIGHT.trim() === '') {
    return [];
  }

  return [
    {
      name: 'format/copyright',
      files: ['src/**/*.{ts,mts,js,mjs}'],
      ignores: ['**/*.{spec,test}.{ts,mts}'],
      plugins: { headers: loaded['eslint-plugin-headers'] },
      rules: {
        'headers/header-format': ['error', headerOptions(COPYRIGHT.trim())],
      },
    },
  ];
}
