---
title: "require-module-attributes"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-module-attributes.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-module-attributes

📝 Require non-empty module attributes for imports and exports.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforce non-empty attribute list in `import`/`export` statements and `import()` expressions.

Empty import or export attributes and empty dynamic-import options carry no metadata and can make a module reference look configured when it is not.

## Examples

```js
// ❌
import foo from 'foo' with {};

// ✅
import foo from 'foo';
```

```js
// ❌
export {foo} from 'foo' with {};

// ✅
export {foo} from 'foo';
```

```js
// ❌
const foo = await import('foo', {});

// ✅
const foo = await import('foo');
```

```js
// ❌
const foo = await import('foo', {with: {}});

// ✅
const foo = await import('foo');
```
