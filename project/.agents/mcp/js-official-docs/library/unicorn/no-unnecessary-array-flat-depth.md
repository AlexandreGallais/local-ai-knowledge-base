---
title: "no-unnecessary-array-flat-depth"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-array-flat-depth.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-array-flat-depth

📝 Disallow using `1` as the `depth` argument of `Array#flat()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

The default depth for `Array#flat()` is `1`, so explicitly passing `1` is redundant.

## Examples

```js
const nested = [1, [2, 3], [4, [5]]];

// ❌ - Explicit 1 is unnecessary
nested.flat(1);
// → [1, 2, 3, 4, [5]]

// ✅ - Default depth is 1
nested.flat();
// → [1, 2, 3, 4, [5]]
```

```js
// ❌
const rows = [[1, 2], [3, 4]];
rows.flat(1);

// ✅
const rows = [[1, 2], [3, 4]];
rows.flat();
```

```js
// ✅ - Use depth > 1 when you need deeper flattening
const deeplyNested = [1, [2, [3, [4]]]];
deeplyNested.flat(2);
// → [1, 2, 3, [4]]
```

```js
// ❌
array?.flat(1);

// ✅
array?.flat();
```
