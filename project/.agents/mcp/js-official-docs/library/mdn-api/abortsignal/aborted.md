---
title: "AbortSignal: aborted property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/aborted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: aborted property

The **`aborted`** read-only property returns a value that indicates whether the asynchronous operations the signal is communicating with are aborted (`true`) or not (`false`).

## Value

`true` (aborted) or `false`

## Examples

In the following snippet, we create a new `AbortController` object, and get its `AbortSignal` (available using the `signal` property).
Later on, using the `aborted` property, we check whether or not the signal has been aborted, and send an appropriate log to the console.

```js
const controller = new AbortController();
const signal = controller.signal;

// …

if (signal.aborted) {
  console.log("Request has been aborted");
} else {
  console.log("Request not aborted");
}
```

## See also

- Fetch API
