---
title: "ViewTransition: transitionRoot property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/viewtransition/transitionroot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ViewTransition: transitionRoot property

The **`transitionRoot`** read-only property of the `ViewTransition` interface is a reference to the root `Element` of the view transition scope.

## Value

An `Element`.

- For document-scoped view transitions, `transitionRoot` is a reference to the `Document.documentElement` property, which for standard web documents is a reference to the `<html>` element.
- For element-scoped view transitions, `transitionRoot` is a reference to the `Element` that `startViewTransition()` was called on to create the view transition.

## Examples

### Basic usage

This snippet shows how to use `transitionRoot` to retrieve a reference to the element the view transition was created on.

```js
const myElement = document.querySelector(".my-element");

// ...

function handleVT() {
  const vt = myElement.startViewTransition(() => {
    updateDOMSomehow();
  });

  // ...

  // Returns reference to myElement
  vt.transitionRoot;
}
```

## See also

- `ViewTransitionTypeSet`
- View Transition API
- Using the View Transition API
- Using element-scoped view transitions
