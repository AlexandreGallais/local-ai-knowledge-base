---
title: "prefer-dom-node-text-content"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-dom-node-text-content.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-dom-node-text-content

📝 Prefer `.textContent` over `.innerText`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Enforces the use of `.textContent` over `.innerText` for DOM nodes.

There are some advantages of using `.textContent`, like performance and more predictable behavior when updating it.

Note that there are differences between them.

## Examples

```js
// ❌
const text = foo.innerText;

// ✅
const text = foo.textContent;
```

```js
// ❌
const {innerText} = foo;

// ✅
const {textContent} = foo;
```

```js
// ❌
foo.innerText = '🦄';

// ✅
foo.textContent = '🦄';
```
