---
title: "BackgroundFetchRegistration: downloaded property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/downloaded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: downloaded property

The **`downloaded`** read-only property of the `BackgroundFetchRegistration` interface returns the size in bytes that has been downloaded, initially `0`.

If the value of this property changes, the progress event is fired at the associated `BackgroundFetchRegistration` object.

## Value

A `Number`.

## Examples

Logging this property to the console returns the number of bytes downloaded.

```js
console.log(bgFetch.downloaded);
```
