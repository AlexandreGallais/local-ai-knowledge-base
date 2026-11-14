---
title: "no-unreadable-iife"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unreadable-iife.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unreadable-iife

📝 Disallow unreadable IIFEs.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

IIFE with parenthesized arrow function body is considered unreadable.

Parenthesized arrow bodies make an IIFE look like a grouped expression and obscure where the function body begins.

## Examples

```js
// ❌
const foo = (bar => (bar ? bar.baz : baz))(getBar());

// ✅
const bar = getBar();
const foo = bar ? bar.baz : baz;

// ✅
const getBaz = bar => (bar ? bar.baz : baz);
const foo = getBaz(getBar());
```

```js
// ❌
const foo = ((bar, baz) => ({bar, baz}))(bar, baz);
```

```js
// ✅
const foo = {bar, baz};
```

```js
// ✅
const foo = (bar => {
	return bar ? bar.baz : baz;
})(getBar());
```
