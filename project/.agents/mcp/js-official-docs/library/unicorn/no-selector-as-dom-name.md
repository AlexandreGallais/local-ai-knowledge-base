---
title: "no-selector-as-dom-name"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-selector-as-dom-name.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-selector-as-dom-name

📝 Disallow selector syntax in DOM names.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Disallow selector syntax in DOM APIs that expect raw names.

Some DOM APIs accept raw class names or IDs rather than CSS selectors. For example, use `'active'` with `classList.add()` and `getElementsByClassName()`, not `'.active'`. Use `'app'` with `getElementById()`, not `'#app'`.

This also applies when the selector prefix starts a template literal, like `` `.${className}` `` or `` `#${id}` ``.

Only simple selector prefixes that match the API are autofixed, like `'.active'` for class-name APIs, `'#app'` for `getElementById()`, and simple dynamic templates like `` `.${className}` ``. More complex selector-looking values are reported without autofix.

With `prefer-query-selector` enabled, this rule fixes the DOM name first. `prefer-query-selector` may then rewrite the DOM query method.

## Examples

```js
// ❌
element.classList.add('.active');
element.classList.remove('.hidden');
element.classList.contains('.selected');
element.classList.toggle('.expanded');
element.classList.replace('.old', '.new');
document.getElementsByClassName('.item');
document.getElementById('#app');

// ✅
element.classList.add('active');
element.classList.remove('hidden');
element.classList.contains('selected');
element.classList.toggle('expanded');
element.classList.replace('old', 'new');
document.getElementsByClassName('item');
document.getElementById('app');
```
