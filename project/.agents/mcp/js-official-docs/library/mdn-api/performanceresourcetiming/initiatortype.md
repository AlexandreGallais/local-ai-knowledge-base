---
title: "PerformanceResourceTiming: initiatorType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/initiatortype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: initiatorType property

The **`initiatorType`** read-only property is a string representing web platform feature that initiated the resource load.

> **Note:**
> This property does not represent the type of content fetched. A `.css` file can be fetched using a `<link>` element leading to an `initiatorType` of `link`. When loading images using `background: url()` in a CSS file, the `initiatorType` will be `css` and not `img`.

## Value

The `initiatorType` property can have the following values, or `other` if none of the conditions match.

- `audio`
    If the request was initiated by an `<audio>` element's `src` attribute.
- `beacon`
    If the request was initiated by a `navigator.sendBeacon()` method.
- `body`
    If the request was initiated by a `<body>` element's `background` attribute.
- `css`
    If the request was initiated by a CSS `url()` function.
- `early-hint`
    If the request was initiated by an `103` `Early Hint` response.
- `embed`
    If the request was initiated by an `` element's `src` attribute.
- `fetch`
    If the request was initiated by a `fetch()` method.
- `frame`
    If the request was initiated by loading a `<frame>` element.
- `iframe`
    If the request was initiated by an `` element's `src` attribute.
- `icon` (non-standard)
    If the request was initiated by a favicon. Non-standard and only reported by Safari.
- `image`
    If the request was initiated by an `<image>` element.
- `img`
    If the request was initiated by an `` element's `src` or `srcset` attribute.
- `input`
    If the request was initiated by an `` element of type `image`.
- `link`
    If the request was initiated by a `<link>` element.
- `navigation`
    If the request was initiated by a navigation request.
- `object`
    If the request was initiated by an `<object>` element.
- `ping`
    If the request was initiated by an `` element's `ping`.
- `script`
    If the request was initiated by a `<script>` element.
- `track`
    If the request was initiated by a `<track>` element's `src`.
- `video`
    If the request was initiated by a `` element's `poster` or `src`.
- `xmlhttprequest`
    If the request was initiated by an `XMLHttpRequest`.

## Examples

### Filtering resources

The `initiatorType` property can be used to get specific resource timing entries only. For example, only those that were initiated by `<script>` elements.

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  const scripts = list
    .getEntries()
    .filter((entry) => entry.initiatorType === "script");
  console.log(scripts);
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const scripts = performance
  .getEntriesByType("resource")
  .filter((entry) => entry.initiatorType === "script");
console.log(scripts);
```
