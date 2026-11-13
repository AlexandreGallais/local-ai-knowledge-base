---
title: "no-require-imports"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-require-imports.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-require-imports

Depending on your TSConfig settings and whether you're authoring ES Modules or CommonJS, TS may allow both `import` and `require()` to be used, even within a single file.

This rule enforces that you use the newer ES Module `import` syntax over CommonJS `require()`.

## Examples

**❌ Incorrect**

```ts
const lib1 = require('lib1');
const { lib2 } = require('lib2');
import lib3 = require('lib3');
```

**✅ Correct**

```ts
import * as lib1 from 'lib1';
import { lib2 } from 'lib2';
import * as lib3 from 'lib3';
```

## Options

### `allow`

These strings will be compiled into regular expressions with the `u` flag and be used to test against the imported path. A common use case is to allow importing `package.json`. This is because `package.json` commonly lives outside of the TS root directory, so statically importing it would lead to root directory conflicts, especially with `resolveJsonModule` enabled. You can also use it to allow importing any JSON if your environment doesn't support JSON modules, or use it for other cases where `import` statements cannot work.

With `{ allow: ['/package\\.json$'] }`:

**❌ Incorrect**

```ts
console.log(require('../data.json').version);
```

**✅ Correct**

```ts
console.log(require('../package.json').version);
```

### `allowAsImport`

When set to `true`, `import ... = require(...)` declarations won't be reported.
This is beneficial if you use certain module options that require strict CommonJS interop semantics, such as verbatimModuleSyntax.

With `{ allowAsImport: true }`:

**❌ Incorrect**

```ts
var foo = require('foo');
const foo = require('foo');
let foo = require('foo');
```

**✅ Correct**

```ts
import foo = require('foo');
import foo from 'foo';
```

## Usage with CommonJS

While this rule is primarily intended to promote ES Module syntax, it still makes sense to enable this rule when authoring CommonJS modules.

If you prefer to use TypeScript's built-in `import ... from ...` ES Module syntax, which is transformed to `require()` calls during transpilation when outputting CommonJS, you can use the rule's default behavior.

If you prefer to instead use `require()` syntax, we recommend you use this rule with `allowAsImport` enabled.
That way, you still enforce usage of `import ... = require(...)` rather than bare `require()` calls, which are not statically analyzed by TypeScript.
We don't directly provide a way to _prohibit_ ES Module syntax from being used; consider instead using TypeScript's `verbatimModuleSyntax` option if you find yourself in a situation where you would want this.

## When Not To Use It

If you are authoring CommonJS modules _and_ your project frequently uses dynamic `require`s, then this rule might not be applicable to you.
Otherwise, the `allowAsImport` option probably suits your needs.

If only a subset of your project uses dynamic `require`s then you might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- `no-var-requires`
