---
title: "prefer-scoped-selector"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-scoped-selector.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-scoped-selector

📝 Prefer `:scope` when using element query selector methods.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

When calling `querySelector()` or `querySelectorAll()` on an element, use `:scope` to make selector matching explicit.

Without `:scope`, browser selector matching can consider ancestors outside the element and only filter the final matched element to the element subtree.

This only matters for selectors with a combinator (descendant `.outer .inner`, child `>`, or sibling `+`/`~`). A simple selector like `.a`, or a list of simple selectors like `.a, b`, is left alone because `:scope` would only add noise.

## Examples

```js
// ❌
element.querySelectorAll('.outer .inner');

// ✅
element.querySelectorAll(':scope .outer .inner');
```

```js
// ✅
element.querySelector('.a, b');
```

```js
// ✅
document.querySelectorAll('.outer .inner');
```

A query on a shadow root, document fragment, or document is also left alone, because `:scope` cannot match a non-element root and would make the query match nothing. The rule recognizes the `shadowRoot`, `contentDocument`, and `ownerDocument` properties and the results of `attachShadow()`, `createShadowRoot()`, `createDocumentFragment()`, `createContextualFragment()`, `extractContents()`, `cloneContents()`, `parseFromString()`, and `getRootNode()`.

```js
// ✅
element.shadowRoot.querySelectorAll('.outer .inner');
```

## Limitations

The rule only checks selectors written as a string literal or a template literal without expressions. Dynamic selectors are ignored.

Other non-element roots are not recognized, so queries on them are reported. This includes a shadow root or fragment stored in a variable (`const root = element.attachShadow(…)`), a `<template>` element's `content`, and the results of `cloneNode()` and `document.importNode()`, which can also be elements.

It does not look inside functional pseudo-classes like `:is()`, `:where()`, `:not()`, and `:has()`, so a branch counts as scoped as long as it contains `:scope` somewhere. For example, `:scope div:is(.a, div b)` is accepted even though `div b` is not scoped.
