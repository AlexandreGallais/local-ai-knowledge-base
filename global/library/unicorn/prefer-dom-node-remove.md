---
title: "prefer-dom-node-remove"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-dom-node-remove.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-dom-node-remove

📝 Prefer `childNode.remove()` over `parentNode.removeChild(childNode)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`Node#remove()` is a cleaner and more direct way to remove an element from the DOM. It's simpler, more readable, and doesn't require a reference to the parent node.

The autofix does not preserve the error that `parent.removeChild(child)` throws when `child` is not a child of `parent`. When evaluating the parent can have side effects, such as a call, the rule offers a suggestion instead.

## Examples

```js
// ❌ - Requires knowing the parent and using the indirect method
const element = document.querySelector('.banner');
element.parentNode.removeChild(element);

// ✅ - Direct, straightforward removal
const element = document.querySelector('.banner');
element.remove();
```

```js
// ❌
const button = document.getElementById('close-btn');
button.parentNode.removeChild(button);

// ✅
const button = document.getElementById('close-btn');
button.remove();
```

```js
// ❌
class Modal {
	close() {
		this.parentNode.removeChild(this);
	}
}

// ✅
class Modal {
	close() {
		this.remove();
	}
}
```
