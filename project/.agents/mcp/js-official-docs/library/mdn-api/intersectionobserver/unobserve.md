---
title: "IntersectionObserver: unobserve() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/unobserve/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: unobserve() method

The **`unobserve()`** method of the `IntersectionObserver` interface instructs the `IntersectionObserver` to stop observing the specified target element.

## Syntax

```js
unobserve(target)
```

### Parameters

- `target`
    The `Element` to cease observing.
    If the specified element isn't being observed, this method does nothing and no exception is thrown.

### Return value

None (`undefined`).

## Examples

This snippet shows an observer being created, an element being observed, and then being
unobserved.

```js
const observer = new IntersectionObserver(callback);
observer.observe(document.getElementById("elementToObserve"));

// …

observer.unobserve(document.getElementById("elementToObserve"));
```

## See also

- Intersection Observer API
- `IntersectionObserver.observe()`
