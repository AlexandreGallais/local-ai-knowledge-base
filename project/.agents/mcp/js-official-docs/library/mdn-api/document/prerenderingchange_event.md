---
title: "Document: prerenderingchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/prerenderingchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: prerenderingchange event

The **`prerenderingchange`** event is fired on a prerendered document when it is activated (i.e., the user views the page).

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("prerenderingchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onprerenderingchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Preventing code from running during prerendering

The example shows how to defer code, that would otherwise run during prerendering, until after page activation.
This is useful for deferring analytics code, which is only relevant when and if the page is actually viewed.

The code checks if prerendering is running using `Document.prerendering`, and if so adds an event listener to run an analytics initialization function once the page is activated.
On a page that is not prerendering the analytics code is run immediately.

```js
if (document.prerendering) {
  document.addEventListener("prerenderingchange", initAnalytics, {
    once: true,
  });
} else {
  initAnalytics();
}
```

Note that this kind of code should not be used for measuring how often a prerender is activated, because the code may run after a prerendered page has already activated.

> **Note:**
> See the Speculation Rules API landing page and particularly the Unsafe speculative loading conditions section for more information on the kinds of activities you might wish to delay until after prerendering has finished.

### Measuring prerendering activations

This code shows how to measure how often a prerender is activated.
It uses the `prerenderingchange` to track activation events, and `Performance.getEntriesByType()` to track navigation activations.

```js
if (document.prerendering) {
  document.addEventListener(
    "prerenderingchange",
    () => {
      console.log("Prerender activated after this script ran");
    },
    { once: true },
  );
} else if (performance.getEntriesByType("navigation")[0]?.activationStart > 0) {
  console.log("Prerender activated before this script ran");
} else {
  console.log("This page load was not via prerendering");
}
```

## See also

- Speculation Rules API
- `prerendering` property
- `PerformanceNavigationTiming.activationStart` property
