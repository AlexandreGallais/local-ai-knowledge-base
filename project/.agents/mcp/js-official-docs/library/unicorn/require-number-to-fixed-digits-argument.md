---
title: "require-number-to-fixed-digits-argument"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-number-to-fixed-digits-argument.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-number-to-fixed-digits-argument

📝 Enforce using the digits argument with `Number#toFixed()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When calling `Number#toFixed()`, always explicitly specify the `digits` argument. While the default is `0`, explicitly stating it makes the code clearer and less ambiguous about the intended behavior.

## Examples

```js
// ❌
const string = number.toFixed();

// ✅
const string = number.toFixed(0);
```

```js
// ❌
const price = 19.99;
const displayPrice = price.toFixed(); // Unclear intent

// ✅
const price = 19.99;
const displayPrice = price.toFixed(2); // Currency, 2 decimal places
```

```js
// ❌
const average = 95.667;
const rounded = average.toFixed();

// ✅
const average = 95.667;
const rounded = average.toFixed(0); // Round to integer, intention is clear
```

```js
// ✅
const percentage = 87.567;
const display = percentage.toFixed(1); // Display with 1 decimal place
```
