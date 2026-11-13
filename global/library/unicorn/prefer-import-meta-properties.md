---
title: "prefer-import-meta-properties"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-import-meta-properties.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-import-meta-properties

📝 Prefer `import.meta.{dirname,filename}` over legacy techniques for getting file paths.

🚫 Disabled by default.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Starting with Node.js 20.11, `import.meta.dirname` and `import.meta.filename` have been introduced in ES modules.

These built-in properties avoid converting `import.meta.url` and calling path helpers, so file-path code is shorter and clearer.

> `import.meta.filename` is the same as the `url.fileURLToPath()` of the `import.meta.url`.\
> `import.meta.dirname` is the same as the `path.dirname()` of the `import.meta.filename`.

This rule replaces legacy patterns with `import.meta.{dirname,filename}`.

## Examples

```js
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// ❌
const filename = fileURLToPath(import.meta.url);

// ✅
const filename = import.meta.filename;
```

```js
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// ❌
const dirname = path.dirname(fileURLToPath(import.meta.url));
const dirname = path.dirname(import.meta.filename);
const dirname = fileURLToPath(new URL('.', import.meta.url));

// ✅
const dirname = import.meta.dirname;
```
