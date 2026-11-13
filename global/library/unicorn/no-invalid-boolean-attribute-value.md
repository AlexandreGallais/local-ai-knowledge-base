---
title: "no-invalid-boolean-attribute-value"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-boolean-attribute-value.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-boolean-attribute-value

📝 Disallow invalid values for HTML boolean attributes.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

HTML boolean attributes are true whenever they are present, regardless of their value. For example, `button.setAttribute('disabled', 'false')` still disables the button.

The HTML Standard permits only the empty string or the attribute's own name as its value, matched ASCII case-insensitively without leading or trailing whitespace. To represent false, remove the attribute.

This rule checks statically known primitive values passed to `setAttribute()` on identifiable native HTML elements. Non-string primitives are checked after conversion to strings, so both `false` and `'false'` are reported.

## Examples

```js
const button = document.createElement('button');

// ❌
button.setAttribute('disabled', 'false');
button.setAttribute('disabled', false);
button.setAttribute('disabled', 'true');
button.setAttribute('disabled', ' disabled ');

// ✅
button.removeAttribute('disabled');
button.setAttribute('disabled', '');
button.setAttribute('disabled', 'disabled');
button.setAttribute('disabled', 'DISABLED');
```

```js
// ❌
const input = document.querySelector('input.required');
input?.setAttribute('required', 'false');

// ✅
input?.removeAttribute('required');
input?.setAttribute('required', '');
```

## Attribute and receiver detection

Only boolean attributes applicable to the element are checked, per the HTML attribute index. ARIA, `data-*`, and enumerated attributes such as `hidden` are excluded.

Receivers are recognized through the global document's `createElement()`, HTML-namespace `createElementNS()`, or `querySelector()` with one tag and optional class/ID selectors. Simple `const` aliases are supported. Creation options, other documents/containers, and queries for SVG-ambiguous tags (`a`, `script`, `style`, `title`) are excluded.

Concrete native TypeScript annotations and assertions are supported. Type information also enables inferred types and JavaScript JSDoc annotations. Generic `Element`/`HTMLElement` types, subclasses, and structural lookalikes alone are insufficient. Input-state and document-tree restrictions are not analyzed.

## Suggestions

For `false` or ASCII case-insensitive `'false'` strings, the rule suggests `removeAttribute()`. Other invalid values get a suggestion to use `''`. Suggestions that would remove or relocate comments are omitted. There is no autofix because behavior or attribute reads could change.

See also `prefer-toggle-attribute` for paired set/remove patterns.
