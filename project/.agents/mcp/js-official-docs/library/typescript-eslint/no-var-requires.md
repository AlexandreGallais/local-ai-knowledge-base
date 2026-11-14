---
title: "no-var-requires"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-var-requires.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-var-requires

**Deprecated**

This rule has been deprecated in favour of the `@typescript-eslint/no-require-imports` rule.

In other words, the use of forms such as `var foo = require("foo")` are banned. Instead use ES6 style imports or `import foo = require("foo")` imports.

## Examples

**❌ Incorrect**

```ts
var foo = require('foo');
const foo = require('foo');
let foo = require('foo');
```

**✅ Correct**

```ts
import foo = require('foo');
require('foo');
import foo from 'foo';
```

## Options

### `allow`

A array of strings. These strings will be compiled into regular expressions with the `u` flag and be used to test against the imported path. A common use case is to allow importing `package.json`. This is because `package.json` commonly lives outside of the TS root directory, so statically importing it would lead to root directory conflicts, especially with `resolveJsonModule` enabled. You can also use it to allow importing any JSON if your environment doesn't support JSON modules, or use it for other cases where `import` statements cannot work.

With `{allow: ['/package\\.json$']}`:

**❌ Incorrect**

```ts
const foo = require('../data.json');
```

**✅ Correct**

```ts
const foo = require('../package.json');
```

## When Not To Use It

If your project frequently uses older CommonJS `require`s, then this rule might not be applicable to you.
If only a subset of your project uses `require`s then you might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- `no-require-imports`
