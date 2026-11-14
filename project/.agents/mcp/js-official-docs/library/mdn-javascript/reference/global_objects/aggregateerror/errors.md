---
title: "AggregateError: errors"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/aggregateerror/errors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AggregateError: errors

The **`errors`** data property of an `AggregateError` instance contains an array representing the errors that were aggregated.

## Value

An `Array` containing values in the same order as the iterable passed as the first argument of the `AggregateError()` constructor.

## Examples

### Using errors

```js
try {
  throw new AggregateError(
    // An iterable of errors
    new Set([new Error("some error"), new Error("another error")]),
    "Multiple errors thrown",
  );
} catch (err) {
  console.log(err.errors);
  // [
  //   Error: some error,
  //   Error: another error
  // ]
}
```

## See also

- Control flow and error handling guide
- `AggregateError`
- `Error`: `cause`
