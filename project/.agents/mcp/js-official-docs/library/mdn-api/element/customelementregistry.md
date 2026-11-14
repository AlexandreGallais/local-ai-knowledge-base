---
title: "Element: customElementRegistry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/customelementregistry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: customElementRegistry property

The **`customElementRegistry`** read-only property of the `Element` interface returns the `CustomElementRegistry` object associated with this element, or `null` if one has not been set.

An element's `customElementRegistry` is set when the element is created (for example, via `Document.createElement()` with the `customElementRegistry` option, or when parsed in a context that has a scoped registry). Once set to a `CustomElementRegistry` object, it cannot be changed. The registry determines which custom element definitions are used when the element is upgraded.

## Value

A `CustomElementRegistry` object, or `null`.

## Examples

### Accessing an element's custom element registry

This example creates a scoped registry, attaches it to a shadow root, and then reads back the `customElementRegistry` property from an element inside the shadow tree to confirm it matches the scoped registry.

```js
const myRegistry = new CustomElementRegistry();
myRegistry.define(
  "my-element",
  class extends HTMLElement {
    connectedCallback() {
      this.textContent = "Hello from scoped registry!";
    }
  },
);

const host = document.createElement("div");
document.body.appendChild(host);
const shadow = host.attachShadow({
  mode: "open",
  customElementRegistry: myRegistry,
});
shadow.innerHTML = "<my-element></my-element>";

const el = shadow.querySelector("my-element");
console.log(el.customElementRegistry === myRegistry); // true
```

## See also

- `Document.customElementRegistry`
- `ShadowRoot.customElementRegistry`
- `CustomElementRegistry`
- Scoped custom element registries in Using custom elements
