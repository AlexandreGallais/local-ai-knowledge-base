---
title: "BackgroundFetchRegistration: recordsAvailable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/recordsavailable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: recordsAvailable property

The **`recordsAvailable`** read-only property of the `BackgroundFetchRegistration` interface returns `true` if there are requests and responses to be accessed. If this returns `false`, then `match()` and `matchAll()` can't be used.

## Value

A `Boolean`.

## Examples

Logging this property to the console returns `true` or `false` to indicate if there are records.

```js
console.log(bgFetch.recordsAvailable);
```
