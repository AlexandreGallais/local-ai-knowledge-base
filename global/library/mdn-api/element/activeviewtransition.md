---
title: "Element: activeViewTransition property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/activeviewtransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: activeViewTransition property

The **`activeViewTransition`** read-only property of the `Element` interface returns a `ViewTransition` instance representing the view transition currently active on an element. It provides a consistent way to access an active element-scoped view transition without needing to save a reference to it for later.

An element-scoped `ViewTransition` can also be accessed via the return value of `Element.startViewTransition()`.

## Value

A `ViewTransition` or `null` if the element has no active view transition.

## Examples

### Basic usage

This snippet shows how to use `activeViewTransition` to retrieve a reference to an ongoing view transition.

```js
const myElement = document.querySelector(".my-element");

// ...

function handleVT() {
  const vt = myElement.startViewTransition(() => {
    updateDOMSomehow();
  });
}

// Returns a reference to vt if the transition is still ongoing
myElement.activeViewTransition;
```

## See also

- `Element.startViewTransition()`
- `Document.activeViewTransition`
- Using element-scoped view transitions
- View Transition API
- `ViewTransition`
