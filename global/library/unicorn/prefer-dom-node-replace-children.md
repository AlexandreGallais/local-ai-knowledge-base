---
title: "prefer-dom-node-replace-children"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-dom-node-replace-children.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-dom-node-replace-children

📝 Prefer `.replaceChildren()` when replacing DOM children.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Use `.replaceChildren()` to empty DOM parent nodes. It is a direct DOM operation: remove the current children and insert no replacements.

`.innerHTML = ''` has the same visible result in many cases, but it uses an HTML string API for a tree operation. That is less clear, goes through HTML parsing semantics, and normalizes code around an injection sink when no HTML is needed.

This rule reports empty `.innerHTML` assignments, simple `.removeChild()` loops, and an empty `.replaceChildren()` call immediately followed by `.append()` or `.prepend()` on the same node.

Combining the calls performs one DOM replacement instead of separate removal and insertion operations. Cases whose argument evaluation, DOM conversion, or insertion validation cannot be proven safe are offered as a suggestion because `.replaceChildren()` performs those steps before removing the existing children.

It ignores HTML template elements because `template.innerHTML = ''` clears template content, while `template.replaceChildren()` clears direct children.

Non-empty `.innerHTML` assignments are handled by `prefer-dom-node-html-methods` and `no-unsafe-dom-html`.

Older insertion APIs are normalized by `prefer-dom-node-append` and `prefer-modern-dom-apis`. Later ESLint passes can then report the resulting `.append()` or `.prepend()` combination, automatically fixing it only when the combination is provably safe.

## Examples

```js
// ❌
element.innerHTML = '';

// ✅
element.replaceChildren();
```

```js
// ❌
element.replaceChildren();
element.append(child);

// ✅
element.replaceChildren(child);
```

```js
// ❌
element.replaceChildren();
element.prepend(firstChild, secondChild);

// ✅
element.replaceChildren(firstChild, secondChild);
```

```js
// ❌
while (element.firstChild) {
	element.removeChild(element.firstChild);
}

// ✅
element.replaceChildren();
```

```js
// ❌
while (element.lastChild) {
	element.removeChild(element.lastChild);
}

// ✅
element.replaceChildren();
```
