---
title: "no-incorrect-query-selector"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-incorrect-query-selector.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-incorrect-query-selector

📝 Disallow incorrect `querySelector()` and `querySelectorAll()` usage.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule catches common incorrect or inefficient `querySelector()` and `querySelectorAll()` usage.

Using the appropriate query method avoids retrieving a collection when only one element is needed and makes empty and no-match checks explicit.

## Examples

```js
// ❌
document.querySelectorAll('form')[0];

// ✅
document.querySelector('form');
```

```js
// ❌
document.querySelectorAll('form').at(0);

// ✅
document.querySelector('form');
```

```js
// ❌
document.querySelectorAll('#foo');

// ✅
document.querySelector('#foo');
```

```js
// ❌
if (document.querySelectorAll('.item')) {}

// ✅
if (document.querySelectorAll('.item').length > 0) {}
```

```js
// ❌
const elements = document.querySelectorAll('.item');
if (elements) {}

// ✅
const elements = document.querySelectorAll('.item');
if (elements.length > 0) {}
```

```js
// ❌
document.querySelectorAll('.item') === null;

// ✅
// If you meant "no matches":
document.querySelectorAll('.item').length === 0;
```

```js
// ❌
document.querySelector('.item') === undefined;

// ✅
// If you meant "no match":
document.querySelector('.item') === null;
```

## Limitations

This rule intentionally only checks simple, common cases. It does not validate CSS selectors, simplify selectors, or enforce `:scope`.

When fixing first-match access, no-match results change from `undefined` to `null`, matching `querySelector()` behavior.
