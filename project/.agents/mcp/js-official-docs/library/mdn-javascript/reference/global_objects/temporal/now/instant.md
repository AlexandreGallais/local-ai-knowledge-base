---
title: "Temporal.Now.instant()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/now/instant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Now.instant()

The **`Temporal.Now.instant()`** static method returns the current time as a `Temporal.Instant` object.

## Syntax

```js
Temporal.Now.instant()
```

### Parameters

None.

### Return value

A `Temporal.Instant` object representing the current time, with potentially reduced precision.

## Examples

### Measuring time elapsed

The following example measures two instants in time and calculates the duration between them, and gets the total duration in milliseconds:

```js
const start = Temporal.Now.instant();
// Do something that takes time
const end = Temporal.Now.instant();
const duration = end.since(start);
console.log(duration.total("milliseconds"));
```

## See also

- `Temporal.Now`
- `Temporal.Instant`
