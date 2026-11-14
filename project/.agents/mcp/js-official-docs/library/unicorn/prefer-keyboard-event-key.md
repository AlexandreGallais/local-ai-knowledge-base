---
title: "prefer-keyboard-event-key"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-keyboard-event-key.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-keyboard-event-key

📝 Prefer `KeyboardEvent#key` over deprecated keyboard event properties.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Enforces the use of `KeyboardEvent#key` over deprecated keyboard event properties like `KeyboardEvent#keyCode`, `.charCode`, and `.which`. The `.key` property is also more semantic and readable.

This rule is partly fixable. It can only fix direct property access. A comparison of `.keyCode` or `.which` with a character key, like `65` for `A`, is only suggested, because the character also depends on Shift, CapsLock, and the keyboard layout.

## Examples

```js
// ❌
window.addEventListener('keydown', event => {
	if (event.keyCode === 8) {
		console.log('Backspace was pressed');
	}
});

// ✅
window.addEventListener('keydown', event => {
	if (event.key === 'Backspace') {
		console.log('Backspace was pressed');
	}
});
```

```js
// ❌
window.addEventListener('keydown', event => {
	console.log(event.keyCode);
});
```

```js
// ✅
window.addEventListener('click', event => {
	console.log(event.key);
});
```
