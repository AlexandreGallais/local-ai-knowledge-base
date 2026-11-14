---
title: "Window: customElements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/customelements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: customElements property

The **`customElements`** read-only property of the `Window` interface returns a reference to the global `CustomElementRegistry` object, which can be used to register new custom elements and get information about previously registered custom elements.

The global registry is used for registering custom elements by default, but a shadow root can choose to use a scoped custom element registry in order to avoid potential clashes in defined element names.

## Value

A `CustomElementRegistry`.

## Examples

### Basic usage

The most common example you'll see of this property being used is to get access to the `CustomElementRegistry.define()` method to define and register a new custom element.

For example:

```js
let customElementRegistry = window.customElements;
customElementRegistry.define("my-custom-element", MyCustomElement);
```

Note that the custom element class is commonly defined directly inside the `define()` call, as shown:

```js
customElements.define(
  "element-details",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("element-details-template");
      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        document.importNode(template.content, true),
      );
    }
  },
);
```

See our web-components-examples repo for more usage examples.
