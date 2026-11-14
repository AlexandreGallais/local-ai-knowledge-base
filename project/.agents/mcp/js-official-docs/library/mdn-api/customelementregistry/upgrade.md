---
title: "CustomElementRegistry: upgrade() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/upgrade/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: upgrade() method

The **`upgrade()`** method of the
`CustomElementRegistry` interface upgrades all shadow-containing custom
elements in a `Node` subtree, even before they are connected to the main
document.

## Syntax

```js
upgrade(root)
```

### Parameters

- `root`
    A `Node` instance with shadow-containing descendant elements to upgrade. If there are no descendant elements that can be upgraded, no error is
    thrown.

### Return value

None (`undefined`).

## Description

When an HTML element is parsed or created, it may use a tag name that corresponds to a custom element (e.g., `<my-element>`). If the custom element's class has not yet been registered with the appropriate `CustomElementRegistry` at the time the element is created, the element exists as an undefined, plain `HTMLElement`. It looks and behaves like any unknown element — it has no special behavior, lifecycle callbacks, or custom prototype methods.

**Upgrading** is the process of retroactively promoting such an element to a full-fledged custom element once its definition becomes available. When an element is upgraded:

1. Its constructor is called, in which the `super()` call swaps the prototype to the custom element class that was registered with `define()`.
2. If the class defines `observedAttributes`, the `attributeChangedCallback()` is called for each attribute that already has a value.
3. If the element is already connected, its `connectedCallback()` is called.
4. The `formAssociatedCallback()` and/or `formDisabledCallback()` callbacks get called if their conditions are satisfied.

Normally, elements are upgraded automatically when their definition is registered via `define()`, but only if they are already connected to the document. The `upgrade()` method is useful when you need to upgrade elements that exist in a disconnected DOM subtree (for example, elements created via `Document.createElement()` or parsed into a `DocumentFragment`) before they are inserted into the document.

## Examples

Taken from the HTML spec:

```js
const el = document.createElement("spider-man");

class SpiderMan extends HTMLElement {}
customElements.define("spider-man", SpiderMan);

console.assert(!(el instanceof SpiderMan)); // not yet upgraded

customElements.upgrade(el);
console.assert(el instanceof SpiderMan); // upgraded!
```
