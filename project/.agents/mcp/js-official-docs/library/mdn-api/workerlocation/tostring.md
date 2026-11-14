---
title: "WorkerLocation: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerlocation/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerLocation: toString() method

The **`toString()`** stringifier method of a `WorkerLocation` object returns a string containing the serialized `URL` for the worker's location. It is a synonym for `WorkerLocation.href`.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
// In a Web worker, on the page https://developer.mozilla.org/en-US/docs/Web
const result = location.toString(); // Returns 'https://developer.mozilla.org/en-US/docs/Web'
```

## See also

- The `WorkerLocation` interface it belongs to.
