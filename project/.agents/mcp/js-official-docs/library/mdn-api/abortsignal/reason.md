---
title: "AbortSignal: reason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/reason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: reason property

The **`reason`** read-only property returns a JavaScript value that indicates the abort reason.

The property is `undefined` when the signal has not been aborted.
It can be set to a specific value when the signal is aborted, using `AbortController.abort()` or `AbortSignal.abort()`.
If not explicitly set in those methods, it defaults to "AbortError" `DOMException`.

## Value

A JavaScript value that indicates the abort reason, or `undefined`, if not aborted.

## Examples

In the following snippet, we create a new `AbortController` object, and get its `AbortSignal` (available using the `signal` property).
Later on, using the `aborted` property, we check whether or not the signal has been aborted, and log the abort status and reason to the console.

```js
const controller = new AbortController();
const signal = controller.signal;

// …

if (signal.aborted) {
  if (signal.reason) {
    console.log(`Request aborted with reason: ${signal.reason}`);
  } else {
    console.log("Request aborted but no reason was given.");
  }
} else {
  console.log("Request not aborted");
}
```

## See also

- Fetch API
