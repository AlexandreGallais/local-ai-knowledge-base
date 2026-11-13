---
title: "require-css-escape"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-css-escape.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-css-escape

📝 Require `CSS.escape()` for interpolated values in CSS selectors.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When interpolating arbitrary values into CSS selectors, use `CSS.escape()` to make sure the resulting selector remains valid.

By default, this rule only checks interpolations inside attribute selectors to avoid noisy reports for common class and ID selector patterns.

## Examples

```js
// ❌
document.querySelector(`[data-id="${id}"]`);

// ✅
document.querySelector(`[data-id="${CSS.escape(id)}"]`);
```

```js
// ❌
element.querySelectorAll(`a[href^="#${hash}"]`);

// ✅
element.querySelectorAll(`a[href^="#${CSS.escape(hash)}"]`);
```

```js
// ✅
document.querySelector(cssEscape`#${id}`);
```

## Options

### `checkAllSelectors`

Type: `boolean`\
Default: `false`

When set to `true`, checks all selector interpolations instead of only interpolations inside attribute selectors.

```js
// eslint unicorn/require-css-escape: ["error", {"checkAllSelectors": true}]

// ❌
document.querySelector(`#${id}`);

// ✅
document.querySelector(`#${CSS.escape(id)}`);
```
