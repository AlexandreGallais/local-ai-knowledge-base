---
title: "ShadowRoot: customElementRegistry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/customelementregistry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: customElementRegistry property

The **`customElementRegistry`** read-only property of the `ShadowRoot` interface returns the `CustomElementRegistry` object associated with this shadow root, or `null` if one has not been set.

A shadow root's `customElementRegistry` determines which custom element definitions are used for upgrading elements within that shadow tree. It can be set when the shadow root is created via the `customElementRegistry` option of `Element.attachShadow()`, or later using `CustomElementRegistry.initialize()`. Once set to a `CustomElementRegistry` object, it cannot be changed.

This property is also available on `Document` objects via the same `customElementRegistry` property name.

## Value

A `CustomElementRegistry` object, or `null`.

## Examples

### Setting a scoped registry on a shadow root

This example creates a scoped registry with a custom element definition and passes it to `Element.attachShadow()`. The `customElementRegistry` property on the resulting shadow root reflects the scoped registry.

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

console.log(shadow.customElementRegistry === myRegistry); // true
console.log(shadow.querySelector("my-element").textContent);
// "Hello from scoped registry!"
```

## See also

- `Document.customElementRegistry`
- `Element.customElementRegistry`
- `CustomElementRegistry`
- `CustomElementRegistry()` constructor
- `Element.attachShadow()`
- Scoped custom element registries in Using custom elements
- Using shadow DOM
