---
title: "Temporal.ZonedDateTime.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.toJSON()

The **`toJSON()`** method of `Temporal.ZonedDateTime` instances returns a string representing this date-time in the same RFC 9557 format as calling `toString()`. It is intended to be implicitly called by `JSON.stringify()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date-time in the RFC 9557 format, with the calendar annotation included if it is not `"iso8601"`, and the offset and time zone annotation always included.

## Description

The method is automatically called by `JSON.stringify()` when a `Temporal.ZonedDateTime` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Temporal.ZonedDateTime.from()` function within the reviver of `JSON.parse()`.

## Examples

### Using toJSON()

```js
const zdt = Temporal.ZonedDateTime.from({
  year: 2021,
  month: 8,
  day: 1,
  timeZone: "America/New_York",
});
const zdtStr = zdt.toJSON(); // '2021-08-01T00:00:00-04:00[America/New_York]'
const zdt2 = Temporal.ZonedDateTime.from(zdtStr);
```

### JSON serialization and parsing

This example shows how `Temporal.ZonedDateTime` can be serialized as JSON without extra effort, and how to parse it back.

```js
const zdt = Temporal.ZonedDateTime.from({
  year: 2021,
  month: 8,
  day: 1,
  timeZone: "America/New_York",
});
const jsonStr = JSON.stringify({ meeting: zdt }); // '{"meeting":"2021-08-01T00:00:00-04:00[America/New_York]"}'
const obj = JSON.parse(jsonStr, (key, value) => {
  if (key === "meeting") {
    return Temporal.ZonedDateTime.from(value);
  }
  return value;
});
```

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.from()`
- `Temporal.ZonedDateTime.prototype.toString()`
- `Temporal.ZonedDateTime.prototype.toLocaleString()`
