---
title: "no-deprecated"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-deprecated.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-deprecated

The JSDoc `@deprecated` tag can be used to document some piece of code being deprecated.
It's best to avoid using code marked as deprecated.
This rule reports on any references to code marked as `@deprecated`.

**Note:**
TypeScript recognizes the `@deprecated` tag, allowing editors to visually indicate deprecated code — usually with a ~strikethrough~.
However, TypeScript doesn't report type errors for deprecated code on its own.

## Examples

**❌ Incorrect**

```ts
/** @deprecated Use apiV2 instead. */
declare function apiV1(): Promise<string>;

declare function apiV2(): Promise<string>;

await apiV1();
```

```ts
import { parse } from 'node:url';

// 'parse' is deprecated. Use the WHATWG URL API instead.
const url = parse('/foo');
```

**✅ Correct**

```ts
/** @deprecated Use apiV2 instead. */
declare function apiV1(): Promise<string>;

declare function apiV2(): Promise<string>;

await apiV2();
```

```ts
// Modern Node.js API, uses `new URL()`
const url2 = new URL('/foo', 'http://www.example.com');
```

## Options

### `allow`

This option takes the shared `TypeOrValueSpecifier` format.

Examples of code for this rule with:

```json
{
  "allow": [
    { "from": "file", "name": "apiV1" },
    { "from": "lib", "name": "escape" }
  ]
}
```

**❌ Incorrect**

```ts
/** @deprecated */
declare function apiV2(): Promise<string>;

await apiV2();

// `unescape` has been deprecated since ES5.
unescape('...');
```

**✅ Correct**

```ts
import { Bar } from 'bar-lib';
/** @deprecated */
declare function apiV1(): Promise<string>;

await apiV1();

// `escape` has been deprecated since ES5.
escape('...');
```

## When Not To Use It

If portions of your project heavily use deprecated APIs and have no plan for moving to non-deprecated ones, you might want to disable this rule in those portions.

## Related To

- `import/no-deprecated` and `import-x/no-deprecated`: Does not use type information, but does also support TomDoc
- `eslint-plugin-deprecation` (`deprecation/deprecation`): Predecessor to this rule in a separate plugin
