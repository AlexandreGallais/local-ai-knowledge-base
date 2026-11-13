---
title: "no-array-constructor"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-array-constructor.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-array-constructor

It adds support for the generically typed `Array` constructor (`new Array<Foo>()`).

**❌ Incorrect**

```ts
Array(0, 1, 2);
new Array(0, 1, 2);
```

**✅ Correct**

```ts
Array<number>(0, 1, 2);
new Array<Foo>(x, y, z);

Array(500);
new Array(someOtherArray.length);
```
