---
title: "CustomElementRegistry: initialize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/initialize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: initialize() method

The **`initialize()`** method of the `CustomElementRegistry` interface associates this registry with a DOM subtree, setting the `customElementRegistry` of each inclusive descendant that doesn't already have one, and attempting to upgrade any custom elements found.

## Syntax

```js
initialize(root)
```

### Parameters

- `root`
    A `Node` object (typically a `Document`, `ShadowRoot`, or `Element`) whose inclusive descendants will be associated with this registry.

### Return value

None (`undefined`).

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if this `CustomElementRegistry` is not scoped (i.e., not created with `new CustomElementRegistry()`) and either `root` is a `Document` node or `root`'s node document's `customElementRegistry` is not this `CustomElementRegistry`.

## Description

When `initialize()` is called, it walks through the inclusive descendants of `root` in tree order. For each element (or `Document`/`ShadowRoot` at the root) that has a `null` `customElementRegistry`, it sets that registry to this `CustomElementRegistry`. It then attempts to upgrade each element whose `customElementRegistry` matches this registry.

Once a node's `customElementRegistry` is set to a `CustomElementRegistry` object, it cannot be changed. This means `initialize()` can only set the registry on nodes where it is still `null`. However, it will still attempt to upgrade any element whose `customElementRegistry` already matches this registry, not just elements that were freshly assigned.

Nodes have a `null` custom element registry in several situations, including:

- Documents created by `DOMImplementation.createHTMLDocument()`, whose custom element registry is `null` by default. Elements created within such documents also have `null` registries.
- Shadow roots created with `customElementRegistry` set to `null` via `Element.attachShadow()`.
- Declarative shadow roots created from a `<template>` element with the `shadowrootcustomelementregistry` attribute, which instructs the HTML parser to leave the shadow root's custom element registry as `null`.

## Examples

### Initializing a shadow root with a scoped registry

This example creates a shadow root without a custom element registry, adds HTML containing a custom element, and then calls `initialize()` to associate a scoped registry. The `<my-element>` element is upgraded when `initialize()` sets the registry on the shadow root and its descendants.

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

// Create the shadow DOM structure without a registry
const shadow = host.attachShadow({
  mode: "open",
  customElementRegistry: null,
});
shadow.innerHTML = "<my-element></my-element>";

// Later, associate the scoped registry and upgrade custom elements
myRegistry.initialize(shadow);

console.log(shadow.querySelector("my-element").textContent);
// "Hello from scoped registry!"
```

## See also

- Using custom elements
- `CustomElementRegistry()` constructor
- `CustomElementRegistry.define()`
- `CustomElementRegistry.upgrade()`
