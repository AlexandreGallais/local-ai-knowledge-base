---
title: "prefer-module"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-module.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-module

📝 Prefer JavaScript modules (ESM) over CommonJS.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer using the JavaScript module format over the legacy CommonJS module format. Together with other changes, this helps the ecosystem migrate to a single, native module format.

1. Disallows `'use strict'` directive.

	JavaScript modules use “Strict Mode” by default.

1. Disallows “Global Return”.

	This is a CommonJS-only feature.

1. Disallows the global variables `__dirname` and `__filename`.

	They are not available in JavaScript modules.

	Starting with Node.js 20.11, `import.meta.dirname` and `import.meta.filename` have been introduced in ES modules, providing identical functionality to `__dirname` and `__filename` in CommonJS (CJS).

	For most cases in Node.js 20.11 and later:

	```js
	const __dirname = import.meta.dirname;
	const __filename = import.meta.filename;
	```

	Replacements for older versions:

	```js
	import {fileURLToPath} from 'node:url';
	import path from 'node:path';

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	```

	However, in most cases, this is better:

	```js
	import {fileURLToPath} from 'node:url';

	const foo = fileURLToPath(new URL('foo.js', import.meta.url));
	```

	And many Node.js APIs accept `URL` directly, so you can just do this:

	```js
	const foo = new URL('foo.js', import.meta.url);
	```

1. Disallows `require(…)`.

	`require(…)` can be replaced by `import …` or `import(…)`.

1. Disallows `exports` and `module.exports`.

	`export …` should be used in JavaScript modules.

*`.cjs` files are ignored.*

## Examples

```js
// ❌
'use strict';

// …

// ✅
// (Remove the 'use strict' directive. JavaScript modules are in strict mode by default)

// …
```

```js
// ❌
if (foo) {
	return;
}

// …

// ✅
function run() {
	if (foo) {
		return;
	}

	// …
}

run();
```

```js
// ❌
const file = path.join(__dirname, 'foo.js');
```

```js
// ✅
const file = path.join(import.meta.dirname, 'foo.js');
```

```js
// ✅
const file = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'foo.js');
```

```js
// ❌
const content = fs.readFileSync(__filename, 'utf8');
```

```js
// ✅
const content = fs.readFileSync(import.meta.filename, 'utf8');
```

```js
// ❌
const {fromPairs} = require('lodash');

// ✅
import {fromPairs} from 'lodash-es';
```

```js
// ❌
module.exports = foo;

// ✅
export default foo;
```

```js
// ❌
exports.foo = foo;

// ✅
export {foo};
```

## Resources

- Get Ready For ESM by @sindresorhus
