---
title: "no-unnecessary-array-flat-map"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-array-flat-map.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-array-flat-map

📝 Disallow unnecessary use of `Array#flatMap()`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`Array#flatMap()` is useful when one input item can become multiple output items. When a callback only returns `[item]` or `condition ? [item] : []`, `.map()`, `.filter()`, or `.filter().map()` is clearer.

Method replacements only check simple arrow callbacks.

The rule also removes `[item]` wrappers from inline callbacks, including conditional and block-body returns, when syntax, primitive TypeScript annotations, or optional type information establish that `item` is not an array. Async callbacks, generators, and callbacks with explicit return types are ignored.

In TypeScript files, including Vue SFC `<script>` blocks with `lang="ts"` or `lang="tsx"`, conditional callbacks like `value ? [value] : []` are not rewritten to `.filter()` or `.filter().map()` because that can lose TypeScript control-flow narrowing and change the inferred type. Wrapper removal is suggested because it can narrow the inferred element type. Direct one-item callbacks like `value => [value.id]` are still reported.

## Examples

```js
// ❌
const ids = array.flatMap(value => [value.id]);

// ✅
const ids = array.map(value => value.id);
```

```js
// ❌
const ids = array.filter(value => value.active).flatMap(value => [value.id]);

// ✅
const ids = array.filter(value => value.active).map(value => value.id);
```

```js
// ❌
const active = array.flatMap(value => value.active ? [value] : []);

// ✅
const active = array.filter(value => value.active);
```

```js
// ❌
const ids = array.flatMap(value => value.active ? [value.id] : []);

// ✅
const ids = array.filter(value => value.active).map(value => value.id);
```

```js
// ✅
const descendants = array.flatMap(value => value.children);
```

```js
// ✅
const values = array.flatMap(value => [value, value * 2]);
```

```js
// ❌
const values = array.flatMap(() => Math.random() ? [1] : [2, 3]);

// ✅
const values = array.flatMap(() => Math.random() ? 1 : [2, 3]);
```

```ts
declare const value: string;

// ❌
array.flatMap(() => condition ? [value] : []);

// ✅
array.flatMap(() => condition ? value : []);
```

## Related rules

- unicorn/prefer-array-flat-map
