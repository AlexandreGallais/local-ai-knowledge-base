---
title: "prefer-identifier-import-export-specifiers"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-identifier-import-export-specifiers.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-identifier-import-export-specifiers

📝 Prefer identifiers over string literals in import and export specifiers.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer identifier syntax over string-literal syntax in import and export specifiers and import attribute keys when the string is a valid identifier name.

This rule does not require all specifiers to use the same style. Use string literals when the imported or exported name cannot be written as an identifier.

## Examples

```js
// ❌
import {'foo' as foo} from 'foo';

// ✅
import {foo as foo} from 'foo';
```

```js
// ❌
export {foo as 'bar'};

// ✅
export {foo as bar};
```

```js
// ❌
export {'foo' as bar} from 'foo';

// ✅
export {foo as bar} from 'foo';
```

```js
// ❌
import foo from 'foo' with {'type': 'json'};

// ✅
import foo from 'foo' with {type: 'json'};
```

```js
// ✅
import {'a string' as aString} from 'foo';
```
