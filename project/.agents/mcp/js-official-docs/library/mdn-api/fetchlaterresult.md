---
title: "FetchLaterResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchlaterresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchLaterResult

The **`FetchLaterResult`** interface of the Fetch API is returned by the `Window.fetchLater()` method after a deferred fetch has been created.

It contains a single `activated` property that indicates whether the deferred request has been sent out or not.

After a successful sending, the whole response is ignored — including body and headers — so the response of the deferred fetch is never returned to the `FetchLaterResult` interface.

## Instance properties

- `FetchLaterResult.activated` (read-only) (experimental)
    A read-only boolean field that indicates whether the deferred request has been sent out. This is initially set to `false` and will then be updated by the browser once the deferred fetch has been sent.

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

## See also

- Fetch API
- Using Deferred Fetch
