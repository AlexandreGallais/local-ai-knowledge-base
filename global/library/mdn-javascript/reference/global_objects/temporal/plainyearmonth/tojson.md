---
title: "Temporal.PlainYearMonth.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.toJSON()

The **`toJSON()`** method of `Temporal.PlainYearMonth` instances returns a string representing this year-month in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date in the RFC 9557 format, with the calendar annotation included if it is not `"iso8601"`.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.PlainYearMonth` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.PlainYearMonth.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const ym = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
const ymStr = ym.toJSON(); // '2021-08'
const ym2 = Temporal.PlainYearMonth.from(ymStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainYearMonth` can be serialized as JSON without extra effort, and how to parse it back.

```js
const ym = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
const ymStr = JSON.stringify({ event: ym }); // '{"event":"2021-08"}'
const obj = JSON.parse(ymStr, (key, value) => {
  if (key === "event") {
    return Temporal.PlainYearMonth.from(value);
  }
  return value;
});
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.from()`
- `Temporal.PlainYearMonth.prototype.toString()`
- `Temporal.PlainYearMonth.prototype.toLocaleString()`
