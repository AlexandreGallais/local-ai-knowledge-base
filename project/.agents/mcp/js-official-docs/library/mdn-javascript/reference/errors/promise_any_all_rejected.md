---
title: "AggregateError: No Promise in Promise.any was resolved"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/promise_any_all_rejected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AggregateError: No Promise in Promise.any was resolved

The JavaScript exception "No Promise in Promise.any was resolved" occurs when all promises passed to `Promise.any()` are rejected. It is the only built-in usage of `AggregateError`.

## Message

```plain
AggregateError: All promises were rejected (V8-based)
AggregateError: No Promise in Promise.any was resolved (Firefox)
AggregateError (Safari)
```

## Error type

`AggregateError`

## What went wrong?

`Promise.any()` only rejects when all promises passed to it are rejected. You should access `errors` to get the array of rejection reasons. See Using promises for more information on how to handle asynchronously rejected promises. This error is also raised when `Promise.any()` receives an empty iterable.

## Examples

### Empty iterable

```js
Promise.any([]).catch((error) => {
  console.error(error); // AggregateError: No Promise in Promise.any was resolved
});
```

### Handling all rejections

```js
const promises = [
  fetch("/data-location1"),
  fetch("/data-location1"),
  fetch("/data-location1"),
];

Promise.any(promises)
  .then((value) => console.log(value))
  .catch((error) => {
    // None of the fetches were successful
    for (const e of error.errors) {
      console.error(e);
    }
  });

// Using await
async function fetchFirstSuccessful() {
  try {
    const value = await Promise.any(promises);
    console.log(value);
  } catch (error) {
    for (const e of error.errors) {
      console.error(e);
    }
  }
}
```

## See also

- `AggregateError`
- `Promise.any()`
