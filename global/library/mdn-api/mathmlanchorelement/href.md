---
title: "MathMLAnchorElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: href property

The **`href`** property of the `MathMLAnchorElement` interface is a stringifier that returns the absolute URL corresponding to the `` element's `href` attribute (or an empty string if `href` is unset). Setting this property updates the element's `href` attribute to the provided value.

## Value

A string.

- If the `href` attribute is absent, the value is an empty string (`""`).
- If the `href` attribute is present but is not a valid relative or absolute URL, the value is the attribute's value as-is.
- If the `href` attribute is present and is a valid relative or absolute URL, the value is the absolute URL, resolved relative to the document's base URL. The empty string (`""`) is considered a valid relative URL, resolving to the document's base URL.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com#examples"> ... </a>
</math>
```

you can get the `href` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.href; // returns 'https://example.com#examples'
```

## See also

- The MathML `` element
