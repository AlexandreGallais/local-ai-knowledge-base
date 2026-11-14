---
title: "Temporal.Instant.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/instant/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.Instant.prototype.toJSON()

The **`toJSON()`** method of `Temporal.Instant` instances returns a string representing this instant in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given instant in the RFC 9557 format, with as much subsecond precision as necessary to represent the duration accurately, and with the UTC time zone designator `Z`.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.Instant` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.Instant.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1627821296000);
const instantStr = instant.toJSON(); // '2021-08-01T12:34:56Z'
const i2 = Temporal.Instant.from(instantStr);
```

### JSON serialization and parsing

This example shows how `Temporal.Instant` can be serialized as JSON without extra effort, and how to parse it back.

```js
const instant = Temporal.Instant.fromEpochMilliseconds(1627821296000);
const jsonStr = JSON.stringify({ time: instant }); // '{"time":"2021-08-01T12:34:56Z"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "time") {
    return Temporal.Instant.from(value);
  }
  return value;
});
```

## See also

- `Temporal.Instant`
- `Temporal.Instant.from()`
- `Temporal.Instant.prototype.toString()`
- `Temporal.Instant.prototype.toLocaleString()`
