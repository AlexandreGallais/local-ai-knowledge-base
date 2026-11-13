---
title: "max-params"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/max-params.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# max-params

It adds support for TypeScript `this` parameters so they won't be counted as a parameter.

## Options

This rule adds the following options:

```ts
interface Options extends BaseMaxParamsOptions {
  countVoidThis?: boolean;
}

const defaultOptions: Options = {
  ...baseMaxParamsOptions,
  countVoidThis: false,
};
```

### `countVoidThis`

Example of a code when `countVoidThis` is set to `false` and `max` is `1`:

**❌ Incorrect**

```ts
function hasNoThis(this: void, first: string, second: string) {
  // ...
}
```

**✅ Correct**

```ts
function hasNoThis(this: void, first: string) {
  // ...
}
```
