---
title: "ViewTransition: skipTransition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/viewtransition/skiptransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ViewTransition: skipTransition() method

The **`skipTransition()`** method of the
`ViewTransition` interface skips the animation part of the view transition, but doesn't skip running the associated view update.

## Syntax

```js
skipTransition()
```

### Parameters

None.

### Return value

`undefined`.

## Examples

### Skipping an SPA view transition

```js
// start new view transition
const transition = document.startViewTransition(() => displayNewImage());

// skip the animation and just update the DOM
transition.skipTransition();
```

### Skipping an MPA view transition

```js
// Fired on the current (outgoing) page
document.addEventListener("pageswap", (event) => {
  event.viewTransition?.skipTransition();
});

// Fired on the destination (inbound) page
document.addEventListener("pagereveal", (event) => {
  event.viewTransition?.skipTransition();
});
```

## See also

- Smooth transitions with the View Transition API
