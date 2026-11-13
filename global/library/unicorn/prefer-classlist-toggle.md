---
title: "prefer-classlist-toggle"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-classlist-toggle.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-classlist-toggle

📝 Prefer using `Element#classList.toggle()` to toggle class names.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer using `Element#classList.toggle()` instead of conditionally calling `classList.add()` and `classList.remove()`.

`toggle()` expresses the boolean intent in one operation and avoids keeping separate add and remove branches in sync.

## Examples

```js
// ❌
if (element.classList.contains('className')) {
	element.classList.remove('className');
} else {
	element.classList.add('className');
}

// ❌
element.classList.contains('className')
	? element.classList.remove('className')
	: element.classList.add('className');

// ❌
element.classList[element.classList.contains('className') ? 'remove' : 'add']('className');

// ✅
element.classList.toggle('className');
```

```js
// ❌
if (condition) {
	element.classList.add('className');
} else {
	element.classList.remove('className');
}

// ❌
condition
	? element.classList.add('className')
	: element.classList.remove('className');

// ❌
element.classList[condition ? 'add' : 'remove']('className');

// ✅
element.classList.toggle('className', condition);
```
