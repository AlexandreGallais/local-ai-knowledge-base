/**
 * The format of the TypeScript, JavaScript and Angular templates of this project.
 *
 * Prettier lays out the code (.prettierrc.json, .editorconfig). This config adds what Prettier does
 * not do, with rules that all fix themselves: no one has to think about the layout of the code.
 * `npm run format:js` runs it, then Prettier; OpenCode runs both on each file the AI writes.
 * eslint.config.mjs imports it, so the lint checks the format too.
 *
 * Its themes, each switched on or off in lint/settings.mjs, each described in lint/eslint/<theme>.mjs:
 * - sort            imports, exports, types and class members sorted
 * - blankLines      blank lines before return, after declarations, around blocks
 * - braces          braces around every body of if, else, for and while
 * - copyright       the copyright comment at the top of each file of src/
 * - templateFormat  Angular templates: attributes sorted, self-closing tags
 *
 * eslint-config-prettier comes first: it switches off every rule that would fight Prettier, and the
 * themes after it only add rules that agree with Prettier.
 */
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import { parser as typescriptParser } from 'typescript-eslint';

import * as blankLines from './lint/eslint/blank-lines.mjs';
import * as braces from './lint/eslint/braces.mjs';
import * as copyright from './lint/eslint/copyright.mjs';
import * as sort from './lint/eslint/sort.mjs';
import * as templateFormat from './lint/eslint/template-format.mjs';
import { FILES, useThemes } from './lint/load.mjs';
import { IGNORES } from './lint/settings.mjs';

export default defineConfig([
  globalIgnores(IGNORES),
  {
    name: 'format/prettier',
    ...prettier,
  },
  // An eslint-disable comment for a lint rule is not "unused" here: the format must not remove it.
  {
    name: 'format/disable-comments',
    linterOptions: { reportUnusedDisableDirectives: 'off' },
  },
  {
    name: 'format/typescript-parser',
    files: FILES.typescript,
    languageOptions: { parser: typescriptParser },
  },
  ...(await useThemes([sort, blankLines, braces, copyright, templateFormat])),
]);
