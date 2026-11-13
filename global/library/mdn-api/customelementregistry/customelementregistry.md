---
title: "CustomElementRegistry: CustomElementRegistry() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/customelementregistry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: CustomElementRegistry() constructor

The **`CustomElementRegistry()`** constructor creates a new `CustomElementRegistry` object for scoped usage.

The constructor is specifically used for creating scoped custom element registries that limit custom element definitions to a particular scope, such as an element or `ShadowRoot`.

> **Note:**
> The global `CustomElementRegistry` object associated with a `Window` is not created using this constructor; it is automatically created when the window is set up, and is accessible via the `window.customElements` property.

## Syntax

```js
new CustomElementRegistry()
```

### Parameters

None.

### Return value

A new `CustomElementRegistry` object.

## Description

When you construct a `CustomElementRegistry` using `new CustomElementRegistry()`, the resulting registry is considered _scoped_. This means:

- Custom element definitions added to it using `define()` are not globally available. They only apply to nodes that have been associated with this registry.
- It does not support the `extends` option in `define()` (for creating customized built-in elements). Attempting to use `extends` with a scoped registry throws a `NotSupportedError` `DOMException`.

To associate a scoped registry with a DOM subtree, you can use the `initialize()` method, pass it to `Element.attachShadow()`, or use the `Document.createElement()` method's `customElementRegistry` option.

## Examples

### Creating a scoped custom element registry

This example creates a scoped registry, defines a custom element on it, and passes the registry to `Element.attachShadow()`. When HTML containing `<my-element>` is added to the shadow root, the element is upgraded using the scoped registry's definition.

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

console.log(shadow.querySelector("my-element").textContent);
// "Hello from scoped registry!"
```

## See also

- Scoped custom element registries in Using custom elements
- `CustomElementRegistry.initialize()`
- `CustomElementRegistry.define()`
