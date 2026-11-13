---
title: "prefer-global-number-constants"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-global-number-constants.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-global-number-constants

📝 Prefer global numeric constants over `Number` static properties.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`NaN`, `Infinity`, and `-Infinity` are shorter and easier to read than their equivalent `Number` static properties.

The `Number.NaN` and `Number.POSITIVE_INFINITY` cases are automatically fixed when the replacement global is not shadowed. `Number.NEGATIVE_INFINITY` is reported without an autofix to avoid changing parsing in statement-leading and chained expressions.

## Examples

```js
// ❌
const foo = Number.NaN;

// ✅
const foo = NaN;
```

```js
// ❌
const foo = Number.POSITIVE_INFINITY;

// ✅
const foo = Infinity;
```

```js
// ❌
const foo = Number.NEGATIVE_INFINITY;

// ✅
const foo = -Infinity;
```

> **Caution:**
> This rule enforces the opposite of the `checkNaN` and `checkInfinity` options of `prefer-number-properties`. If you prefer the `Number.NaN`, `Number.POSITIVE_INFINITY`, and `Number.NEGATIVE_INFINITY` forms instead, disable this rule and enable those options.
