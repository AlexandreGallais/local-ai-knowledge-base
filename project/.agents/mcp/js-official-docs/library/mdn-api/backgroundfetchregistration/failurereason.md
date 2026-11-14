---
title: "BackgroundFetchRegistration: failureReason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/failurereason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: failureReason property

The **`failureReason`** read-only property of the `BackgroundFetchRegistration` interface returns a string with a value that indicates a reason for a background fetch failure.

If the value of this property changes, the progress event is fired at the associated `BackgroundFetchRegistration` object.

## Value

One of the following strings:

- `""`
    The background fetch has not completed, or was successful.
- `"aborted"`
    The operation was canceled by the user, or `abort()` was called.
- `"bad-status"`
    A response had a not-ok status (a status outside the range 200-299).
- `"fetch-error"`
    A fetch failed for other reasons, for example CORS, or a network failure.
- `"quota-exceeded"`
    Storage quota was reached during the operation.
- `"download-total-exceeded"`
    The provided `downloadTotal` was exceeded. This value was set when the background fetch was registered.

## Examples

Logging this property to the console prints the reason the fetch failed, or an empty string if it was successful or has not yet completed.

```js
console.log(bgFetch.failureReason);
```
