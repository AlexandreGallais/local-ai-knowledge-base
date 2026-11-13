---
title: "BackgroundFetchRegistration: downloadTotal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/downloadtotal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: downloadTotal property

The **`downloadTotal`** read-only property of the `BackgroundFetchRegistration` interface returns the total size in bytes of this download. This is set when the background fetch was registered, or `0` if not set.

## Value

A `Number`.

## Examples

Logging this property to the console returns the total size in bytes of this download.

```js
console.log(bgFetch.downloadTotal);
```
