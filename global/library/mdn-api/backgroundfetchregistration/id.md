---
title: "BackgroundFetchRegistration: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: id property

The **`id`** read-only property of the `BackgroundFetchRegistration` interface returns a copy of the background fetch's `ID`.

## Value

A string.

## Examples

Logging the this part to the console returns the identifier set when registering the fetch. In this case, `"my-fetch"`.

```js
console.log(bgFetch.id); // "my-fetch"
```
