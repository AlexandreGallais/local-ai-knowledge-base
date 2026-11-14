---
title: "Temporal.PlainMonthDay.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainmonthday/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainMonthDay.prototype.toJSON()

The **`toJSON()`** method of `Temporal.PlainMonthDay` instances returns a string representing this month-day in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given month-day in the RFC 9557 format, with the year and calendar annotation included if it is not `"iso8601"`.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.PlainMonthDay` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.PlainMonthDay.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const md = Temporal.PlainMonthDay.from({ month: 8, day: 1 });
const mdStr = md.toJSON(); // '08-01'
const md2 = Temporal.PlainMonthDay.from(mdStr);
```

### JSON serialization and parsing

This example shows how `Temporal.PlainMonthDay` can be serialized as JSON without extra effort, and how to parse it back.

```js
const md = Temporal.PlainMonthDay.from({ month: 8, day: 1 });
const jsonStr = JSON.stringify({ birthday: md }); // '{"birthday":"08-01"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "birthday") {
    return Temporal.PlainMonthDay.from(value);
  }
  return value;
});
```

## See also

- `Temporal.PlainMonthDay`
- `Temporal.PlainMonthDay.from()`
- `Temporal.PlainMonthDay.prototype.toString()`
- `Temporal.PlainMonthDay.prototype.toLocaleString()`
