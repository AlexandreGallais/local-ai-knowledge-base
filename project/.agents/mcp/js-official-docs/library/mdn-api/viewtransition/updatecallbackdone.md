---
title: "ViewTransition: updateCallbackDone property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/viewtransition/updatecallbackdone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ViewTransition: updateCallbackDone property

The **`updateCallbackDone`** read-only property of the
`ViewTransition` interface is a `Promise` that fulfills when the promise returned by the `document.startViewTransition()` method's callback fulfills, or rejects when it rejects.

`updateCallbackDone` is useful when you don't care about the success/failure of a same-document (SPA) view transition animation, and just want to know if and when the DOM is updated.

> **Note:**
> In the case of a cross-document (MPA) view transition, the `updateCallbackDone` promise of the associated `ViewTransition` is automatically fulfilled.

## Value

A Promise.

## Examples

```js
// start new SPA view transition
const transition = document.startViewTransition(() => displayNewImage());

transition.updateCallbackDone.then(() => {
  // Respond to the DOM being updated successfully
});
```

See Transitions as an enhancement for a useful example.

## See also

- Smooth transitions with the View Transition API
