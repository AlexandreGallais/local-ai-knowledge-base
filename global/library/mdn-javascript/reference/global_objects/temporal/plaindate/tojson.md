---
title: "Temporal.PlainDate.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.toJSON()

The **`toJSON()`** method of `Temporal.PlainDate` instances returns a string representing this date in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date in the RFC 9557 format, with the calendar annotation included if it is not `"iso8601"`.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.PlainDate` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.PlainDate.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const date = Temporal.PlainDate.from({ year: 2021, month: 8, day: 1 });
const dateStr = date.toJSON(); // '2021-08-01'
const d2 = Temporal.PlainDate.from(dateStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainDate` can be serialized as JSON without extra effort, and how to parse it back.

```js
const date = Temporal.PlainDate.from({ year: 2021, month: 8, day: 1 });
const jsonStr = JSON.stringify({ date }); // '{"date":"2021-08-01"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "date") {
    return Temporal.PlainDate.from(value);
  }
  return value;
});
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.from()`
- `Temporal.PlainDate.prototype.toString()`
- `Temporal.PlainDate.prototype.toLocaleString()`
