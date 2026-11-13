---
title: "triple-slash-reference"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/triple-slash-reference.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# triple-slash-reference

TypeScript's `///` triple-slash references are a way to indicate that types from another module are available in a file.
Use of triple-slash reference type directives is generally discouraged in favor of ECMAScript Module `import`s.
This rule reports on the use of `/// <reference lib="..." />`, `/// <reference path="..." />`, or `/// <reference types="..." />` directives.

## Options

Any number of the three kinds of references can be specified as an option.
Specifying `'always'` disables this lint rule for that kind of reference.

### `lib`

When set to `'never'`, bans `/// <reference lib="..." />` and enforces using an `import` instead:

**❌ Incorrect**

```ts
/// <reference lib="code" />

globalThis.value;
```

**✅ Correct**

```ts
import { value } from 'code';
```

### `path`

When set to `'never'`, bans `/// <reference path="..." />` and enforces using an `import` instead:

**❌ Incorrect**

```ts
/// <reference path="code" />

globalThis.value;
```

**✅ Correct**

```ts
import { value } from 'code';
```

### `types`

When set to `'never'`, bans `/// <reference types="..." />` and enforces using an `import` instead:

**❌ Incorrect**

```ts
/// <reference types="code" />

globalThis.value;
```

**✅ Correct**

```ts
import { value } from 'code';
```

The `types` option may alternately be given a `"prefer-import"` value.
Doing so indicates the rule should only report if there is already an `import` from the same location:

**❌ Incorrect**

```ts
/// <reference types="code" />

import { valueA } from 'code';

globalThis.valueB;
```

**✅ Correct**

```ts
import { valueA, valueB } from 'code';
```

## When Not To Use It

Most modern TypeScript projects generally use `import` statements to bring in types.
It's rare to need a `///` triple-slash reference outside of auto-generated code.
If your project is a rare one with one of those use cases, this rule might not be for you.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## When Not To Use It

If you want to use all flavors of triple slash reference directives.
