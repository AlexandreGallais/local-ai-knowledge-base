---
title: "CustomElementRegistry: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: get() method

The **`get()`** method of the
`CustomElementRegistry` interface returns the constructor for a
previously-defined custom element.

## Syntax

```js
get(name)
```

### Parameters

- `name`
    The name of the custom element.

### Return value

The constructor for the named custom element, or `undefined` if there is no custom element defined with the name.

## Examples

```js
customElements.define(
  "my-paragraph",
  class extends HTMLElement {
    constructor() {
      const template = document.getElementById("custom-paragraph");
      super() // returns element this scope
        .attachShadow({ mode: "open" }) // sets AND returns this.shadowRoot
        .append(document.importNode(template.content, true));
    }
  },
);

// Return a reference to the my-paragraph constructor
const ctor = customElements.get("my-paragraph");
```
