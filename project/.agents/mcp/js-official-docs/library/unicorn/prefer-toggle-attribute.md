---
title: "prefer-toggle-attribute"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-toggle-attribute.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-toggle-attribute

📝 Prefer using `Element#toggleAttribute()` to toggle attributes.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer using `Element#toggleAttribute()` instead of conditionally calling `setAttribute()` and `removeAttribute()` for boolean-style attributes.

Only `setAttribute(name, '')` patterns are autofixed. Non-empty static string values may get suggestions when safe.

`data-*` attributes are ignored so `dom-node-dataset` remains responsible for dataset-specific style.

Only direct `hasAttribute()` toggles are autofixed. Condition-driven `toggleAttribute(name, force)` replacements are suggestions when safe, because `toggleAttribute(name, true)` preserves existing non-empty values.

Optional receivers are fixed or suggested only for direct `hasAttribute()` toggles. Generic condition-driven optional receivers are reported without fixes because `element?.toggleAttribute(name, condition)` would skip evaluating `condition` when `element` is nullish.

Property assignments like `element.hidden = condition` are intentionally not checked. They only match `toggleAttribute()` for reflected boolean attributes (for example, `input.checked` does not change the `checked` attribute), and the rule cannot know that the receiver is an element.

## Examples

```js
// ❌
if (element.hasAttribute('hidden')) {
	element.removeAttribute('hidden');
} else {
	element.setAttribute('hidden', '');
}

// ❌
element.hasAttribute('hidden')
	? element.removeAttribute('hidden')
	: element.setAttribute('hidden', '');

// ✅
element.toggleAttribute('hidden');
```

```js
// ❌
if (condition) {
	element.setAttribute('hidden', '');
} else {
	element.removeAttribute('hidden');
}

// ❌
condition
	? element.setAttribute('hidden', '')
	: element.removeAttribute('hidden');

// ✅
element.toggleAttribute('hidden', condition);
```
