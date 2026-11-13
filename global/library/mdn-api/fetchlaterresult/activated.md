---
title: "FetchLaterResult: activated property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchlaterresult/activated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchLaterResult: activated property

The **`activated`** read-only property of the `FetchLaterResult` interface returns a boolean specifying whether the deferred fetch has been sent.

## Value

A `Boolean`.

## Examples

### Defer a `POST` request for around one minute and create a function to check if sent

```js
const result = fetchLater("https://report.example.com", {
  method: "POST",
  body: JSON.stringify(myReport),
  activateAfter: 60000 /* 1 minute */,
});

function checkIfFetched() {
  return result.activated;
}
```
