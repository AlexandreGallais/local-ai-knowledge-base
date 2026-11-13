---
title: "HTMLLinkElement: sheet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/sheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: sheet property

The **`sheet`** read-only property of the `HTMLLinkElement` interface
contains the stylesheet associated with that element.

A stylesheet is associated to an `HTMLLinkElement` if `rel="stylesheet"` is used with `<link>`.

## Value

A `CSSStyleSheet` object, or `null` if none is associated with the element.

## Examples

```html
<link rel="stylesheet" href="styles.css" />
```

The `sheet` property of the `HTMLLinkElement` object will return the `CSSStyleSheet` object describing `styles.css`.
