---
title: "Temporal.PlainDateTime.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindatetime/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDateTime.prototype.toJSON()

The **`toJSON()`** method of `Temporal.PlainDateTime` instances returns a string representing this date-time in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date-time in the RFC 9557 format, with the calendar annotation included if it is not `"iso8601"`.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.PlainDateTime` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.PlainDateTime.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const dt = Temporal.PlainDateTime.from({ year: 2021, month: 8, day: 1 });
const dtStr = dt.toJSON(); // '2021-08-01T00:00:00'
const dt2 = Temporal.PlainDateTime.from(dtStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainDateTime` can be serialized as JSON without extra effort, and how to parse it back.

```js
const dt = Temporal.PlainDateTime.from({ year: 2021, month: 8, day: 1 });
const jsonStr = JSON.stringify({ nextBilling: dt }); // '{"nextBilling":"2021-08-01T00:00:00"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "nextBilling") {
    return Temporal.PlainDateTime.from(value);
  }
  return value;
});
```

## See also

- `Temporal.PlainDateTime`
- `Temporal.PlainDateTime.from()`
- `Temporal.PlainDateTime.prototype.toString()`
- `Temporal.PlainDateTime.prototype.toLocaleString()`
