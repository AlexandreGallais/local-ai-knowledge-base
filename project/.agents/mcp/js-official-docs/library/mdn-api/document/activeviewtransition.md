---
title: "Document: activeViewTransition property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/activeviewtransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: activeViewTransition property

The **`activeViewTransition`** read-only property of the `Document` interface returns a `ViewTransition` instance representing the view transition currently active on the document.

The current `ViewTransition` can be accessed in other ways:

- The return value of `Document.startViewTransition()` in the case of same-document view transitions.
- The `viewTransition` property of the `pagereveal` and `pageswap` event objects in the case of cross-document view transitions.

However, the `activeViewTransition` property provides a consistent way to access the active view transition in any context, without having to worry about saving a reference to it for later.

## Value

A `ViewTransition` or `null` if there is no active view transition.

## Examples

```js
// Start a view transition
document.startViewTransition(() => {
  // Update the UI to reflect the new state
  updateUI();
});

// Check if a view transition is currently active
if (document.activeViewTransition) {
  console.log("A view transition is currently active");
}

// Respond to view transition finishing
document.activeViewTransition.finished.then(() => {
  console.log("View transition finished");
});
```

## See also

- `Document.startViewTransition()`
- `Element.activeViewTransition`
- `pagereveal` event
- `pageswap` event
- View Transition API
- `ViewTransition`
