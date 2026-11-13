---
title: "Temporal.PlainTime.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.toJSON()

The **`toJSON()`** method of `Temporal.PlainTime` instances returns a string representing this time in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given time in the RFC 9557 format.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.PlainTime` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.PlainTime.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const time = Temporal.PlainTime.from({ hour: 12, minute: 34, second: 56 });
const timeStr = time.toJSON(); // '12:34:56'
const t2 = Temporal.PlainTime.from(timeStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainTime` can be serialized as JSON without extra effort, and how to parse it back.

```js
const time = Temporal.PlainTime.from({ hour: 12, minute: 34, second: 56 });
const jsonStr = JSON.stringify({ time }); // '{"time":"12:34:56"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "time") {
    return Temporal.PlainTime.from(value);
  }
  return value;
});
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.from()`
- `Temporal.PlainTime.prototype.toString()`
- `Temporal.PlainTime.prototype.toLocaleString()`
