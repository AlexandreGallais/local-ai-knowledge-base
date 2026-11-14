---
title: "NavigateEvent: signal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigateevent/signal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigateEvent: signal property

The **`signal`** read-only property of the
`NavigateEvent` interface returns an `AbortSignal`, which will become aborted if the navigation is canceled (e.g., by the user pressing the browser's "Stop" button, or another navigation starting and thus canceling the ongoing one).

## Value

An `AbortSignal` object.

## Examples

The general idea here is that the `signal` property can be passed to an associated `fetch()` operation so that if the navigation is canceled, the `fetch()` operation can be safely aborted, avoiding wasting bandwidth on fetches that are no longer needed.

```js
navigation.addEventListener("navigate", (event) => {
  event.intercept({
    async handler() {
      // …

      await fetch(`/img/some-image.jpg`, { signal: event.signal });

      // …
    },
  });
});
```

> **Note:**
> See Example: next/previous buttons for a more detailed example.

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
