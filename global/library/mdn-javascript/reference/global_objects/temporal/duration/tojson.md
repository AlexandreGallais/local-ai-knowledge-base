---
title: "Temporal.Duration.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/duration/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Duration.prototype.toJSON()

The **`toJSON()`** method of `Temporal.Duration` instances returns a string representing this duration in the same ISO 8601 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given duration in the ISO 8601 format, with as much subsecond precision as necessary to represent the duration accurately.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.Duration` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.Duration.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const duration = Temporal.Duration.from({ hours: 1, minutes: 30, seconds: 15 });
const durationStr = duration.toJSON(); // 'PT1H30M15S'
const d2 = Temporal.Duration.from(durationStr);
```

### JSON serialization and parsing

This example shows how `Temporal.Duration` can be serialized as JSON without extra effort, and how to parse it back.

```js
const duration = Temporal.Duration.from({ hours: 1, minutes: 30, seconds: 15 });
const jsonStr = JSON.stringify({ data: duration }); // '{"data":"PT1H30M15S"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "data") {
    return Temporal.Duration.from(value);
  }
  return value;
});
```

## See also

- `Temporal.Duration`
- `Temporal.Duration.from()`
- `Temporal.Duration.prototype.toString()`
- `Temporal.Duration.prototype.toLocaleString()`
