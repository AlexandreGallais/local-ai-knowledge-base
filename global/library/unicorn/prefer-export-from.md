---
title: "prefer-export-from"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-export-from.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-export-from

📝 Prefer `export…from` when re-exporting.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

When re-exporting from a module, it's unnecessary to import and then export. It can be done in a single `export…from` declaration.

`export default importedValue` and `export const alias = importedValue` capture the current value, while `export…from` is a live binding. The fix only changes behavior if the source module reassigns the exported binding later, which is not supported.

Single-const re-export assignments with an attached JSDoc comment are left unchanged to preserve the documentation.

## Examples

```js
// ❌
import defaultExport from './foo.js';
export default defaultExport;

// ✅
export {default} from './foo.js';
```

```js
// ❌
import {named} from './foo.js';
export {named};

// ✅
export {named} from './foo.js';
```

```js
// ❌
import * as namespace from './foo.js';
export {namespace};

// ✅
export * as namespace from './foo.js';
```

```js
// ❌
import defaultExport, {named} from './foo.js';
export default defaultExport;
export {
	defaultExport as renamedDefault,
	named,
	named as renamedNamed,
};

// ✅
export {
	default,
	default as renamedDefault,
	named,
	named as renamedNamed,
} from './foo.js';
```

```js
// ✅
// There is no substitution
import * as namespace from './foo.js';
export default namespace;
```

## Options

### checkUsedVariables

Type: `boolean`\
Default: `true`

When `false`, if an import is used in other places than just a re-export, all variables in the import declaration will be ignored.

```js
/* eslint unicorn/prefer-export-from: ["error", {"checkUsedVariables": true}] */
// ❌
import {named1, named2} from './foo.js';

use(named1);

export {named1, named2};
```

```js
/* eslint unicorn/prefer-export-from: ["error", {"checkUsedVariables": false}] */
// ✅
import {named1, named2} from './foo.js';

use(named1);

export {named1, named2};
```
