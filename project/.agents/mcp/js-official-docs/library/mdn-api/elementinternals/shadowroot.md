---
title: "ElementInternals: shadowRoot property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/shadowroot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: shadowRoot property

The **`shadowRoot`** read-only property of the `ElementInternals` interface returns the `ShadowRoot` for this element.

## Value

A `ShadowRoot` if the element has a shadow root, otherwise `null`.

## Examples

The following example prints the value of `shadowRoot` to the console, immediately after calling `HTMLElement.attachInternals()`. At this point the value is `null`. After calling `Element.attachShadow()` the element has a Shadow Root, and `shadowRoot` returns the object representing it.

```js
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.internals_ = this.attachInternals();

    console.log(this.internals_.shadowRoot); // null

    this.attachShadow({ mode: "open" });

    console.log(this.internals_.shadowRoot); // a ShadowRoot object
  }
}
```
