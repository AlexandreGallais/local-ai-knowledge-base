---
title: "BackgroundFetchRegistration: result property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/result/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: result property

The **`result`** read-only property of the `BackgroundFetchRegistration` interface returns a string indicating whether the background fetch was successful or failed.

If the value of this property changes, the progress event is fired at the associated `BackgroundFetchRegistration` object.

## Value

One of the following strings:

- `""`
    The fetch is active so there is no result.
- `"success"`
    The background fetch was successful.
- `"failure"`
    The background fetch failed. This only appears when there is no ability for the browser to retry.

## Examples

Logging this property to the console returns a string indicating the status, or an empty string if the fetch is still active.

```js
console.log(bgFetch.result);
```
