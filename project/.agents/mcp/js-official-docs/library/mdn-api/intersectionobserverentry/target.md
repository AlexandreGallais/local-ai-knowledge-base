---
title: "IntersectionObserverEntry: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserverentry/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserverEntry: target property

The **`target`** read-only property of the `IntersectionObserverEntry` interface indicates which targeted `Element` has changed its amount of intersection with the intersection root.

## Value

The `IntersectionObserverEntry`'s `target` property specifies which `Element` previously targeted by calling `IntersectionObserver.observe()` experienced a change in intersection with the root.

## Examples

In this simple example, each targeted element's `opacity` is set to its `intersectionRatio`.

```js
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    entry.target.style.opacity = entry.intersectionRatio;
  });
}
```

To see a more concrete example, take a look at Handling intersection changes.
