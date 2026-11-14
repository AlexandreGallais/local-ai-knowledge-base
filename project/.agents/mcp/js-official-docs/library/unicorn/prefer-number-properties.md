---
title: "prefer-number-properties"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-number-properties.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-number-properties

📝 Prefer `Number` static methods over global functions and optionally static properties over global constants.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

ECMAScript 2015 moved global number functions onto the `Number` constructor for consistency and to slightly improve them. This rule enforces their usage to limit the usage of globals:

- `Number.parseInt()` over global `parseInt` references, except no-radix and base-10 calls *(fixable)*
- `Number.parseFloat()` over global `parseFloat` references *(fixable)*
- `Number.isNaN()` over `isNaN()` *(they have slightly different behavior, so this is only auto-fixed when the argument is known to be a number, otherwise it's a suggestion)*
- `Number.isFinite()` over `isFinite()` *(they have slightly different behavior, so this is only auto-fixed when the argument is known to be a number, otherwise it's a suggestion)*
- `Number.NaN` over `NaN` when `checkNaN` is enabled *(fixable)*
- `Number.POSITIVE_INFINITY` over `Infinity` when `checkInfinity` is enabled *(fixable)*
- `Number.NEGATIVE_INFINITY` over `-Infinity` when `checkInfinity` is enabled *(fixable)*

Use `prefer-global-number-constants` if you want to enforce the shorter global forms for `NaN`, `Infinity`, and `-Infinity`.

## Examples

```js
// ❌
const foo = parseInt('10', 2);

// ✅
const foo = Number.parseInt('10', 2);
```

```js
// ❌
const foo = parseFloat('10.5');

// ✅
const foo = Number.parseFloat('10.5');
```

```js
// ❌
const foo = isNaN(10);

// ✅
const foo = Number.isNaN(10);
```

```js
// ❌
const foo = isFinite(10);

// ✅
const foo = Number.isFinite(10);
```

```js
// ✅
const foo = Number.parseInt('10', 2);
```

```js
// ✅
const foo = parseInt('10', 10);
```

Base-10 `parseInt()` calls are handled by `prefer-number-coercion`, which also suggests `Number()` for `parseFloat()` (with slightly different semantics).

```js
// ✅
const {parseInt} = Number;
const foo = parseInt('10', 2);
```

```js
// ✅
const isPositiveZero = value => value === 0 && 1 / value === Infinity;
```

```js
// ✅
const isNegativeZero = value => value === 0 && 1 / value === -Infinity;
```

## Options

Type: `object`

> **Caution:**
> `checkNaN` and `checkInfinity` enforce the opposite of `prefer-global-number-constants`, which is enabled in the `recommended` and `unopinionated` configs. If you prefer the `Number.*` constant forms, disable `prefer-global-number-constants` to avoid conflicting reports.

### checkInfinity

Type: `boolean`\
Default: `false`

Pass `checkInfinity: true` to enable check on `Infinity`.

```js
/* eslint unicorn/prefer-number-properties: ["error", {"checkInfinity": true}] */

// ❌
const foo = Infinity;

// ✅
const foo = Number.POSITIVE_INFINITY;
```

```js
// ❌
const foo = -Infinity;

// ✅
const foo = Number.NEGATIVE_INFINITY;
```

### checkNaN

Type: `boolean`\
Default: `false`

Pass `checkNaN: true` to enable check on `NaN`.

```js
/* eslint unicorn/prefer-number-properties: ["error", {"checkNaN": true}] */

// ❌
const foo = NaN;

// ✅
const foo = Number.NaN;
```
