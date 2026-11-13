---
title: "IntersectionObserver: takeRecords() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/takerecords/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: takeRecords() method

The **`takeRecords()`** method of the `IntersectionObserver` interface returns an array of `IntersectionObserverEntry` objects, one for each targeted element which has experienced an intersection change since the last time the intersections were checked, either explicitly through a call to this method or implicitly by an automatic call to the observer's callback.

> **Note:**
> If you use the callback to monitor these changes, you don't need to call this method.
> Calling this method clears the pending intersection list, so the callback will not be run.

## Syntax

```js
takeRecords()
```

### Parameters

None.

### Return value

An array of `IntersectionObserverEntry` objects, one for each target element whose intersection with the root has changed since the last time the intersections were checked.

## See also

- Intersection Observer API
