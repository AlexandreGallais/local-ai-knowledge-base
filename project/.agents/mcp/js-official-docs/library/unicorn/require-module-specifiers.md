---
title: "require-module-specifiers"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-module-specifiers.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-module-specifiers

📝 Require non-empty specifier list in import and export statements.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Enforce non-empty specifier list in `import` and `export` statements. Use a side-effect import if needed, or remove the statement.

A single bare `export {}` is allowed when the file has no runtime import/export declarations. TypeScript uses it to distinguish modules from scripts. This exception ignores explicit type-only imports and exports.

In a declaration file (`.d.ts`), a bare `export {}` is always allowed, because it stops TypeScript from exporting the declarations without `export`.

## Examples

```js
// ❌
import {} from 'foo';

// ✅
import 'foo';
```

```js
// ❌
import foo, {} from 'foo';

// ✅
import foo from 'foo';
```

```js
// ❌
export {} from 'foo';

// ✅
import 'foo';
```

```js
// ❌
import 'foo';
export {};

// ✅
import 'foo';
```
