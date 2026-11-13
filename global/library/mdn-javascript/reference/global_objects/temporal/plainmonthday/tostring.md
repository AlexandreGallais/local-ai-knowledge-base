---
title: "Temporal.PlainMonthDay.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainmonthday/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainMonthDay.prototype.toString()

The **`toString()`** method of `Temporal.PlainMonthDay` instances returns a string representing this month-day in the RFC 9557 format.

## Syntax

```js
toString()
toString(options)
```

### Parameters

- `options` (optional)
    An object containing the following property:
    - `calendarName` (optional)
        Whether to show the calendar annotation (`[u-ca=calendar_id]`) in the return value. Possible values are:
        - `"auto"` (default)
            Include the calendar annotation if the calendar is not `"iso8601"`. The reference year is included if the calendar is not `"iso8601"`.
        - `"always"`
            Always include the calendar annotation. The reference year is always included too.
        - `"never"`
            Never include the calendar annotation. This makes the returned string not recoverable to the same `Temporal.PlainMonthDay` instance, although the month-day value still remains the same. The reference year is included if the calendar is not `"iso8601"`.
        - `"critical"`
            Always include the calendar annotation, and add a critical flag: `[!u-ca=calendar_id]`. Useful when sending the string to certain systems, but not useful for Temporal itself. The reference year is always included too.

### Return value

A string in the RFC 9557 format representing this month-day. The calendar annotation is included as specified. The reference year is included if a calendar annotation is included or if the calendar is not `"iso8601"`.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.
- `TypeError`
    Thrown if `options` is not an object or `undefined`.

## Examples

### Using toString()

```js
const md = Temporal.PlainMonthDay.from({ month: 8, day: 1 });
console.log(md.toString()); // '08-01'

const md2 = Temporal.PlainMonthDay.from({
  monthCode: "M08",
  day: 1,
  calendar: "chinese",
});
console.log(md2.toString()); // '1972-09-08[u-ca=chinese]'
```

### Using options

```js
const isoMD = Temporal.PlainMonthDay.from({ month: 8, day: 1 });
const md = Temporal.PlainMonthDay.from({
  monthCode: "M08",
  day: 1,
  calendar: "chinese",
});
console.log(isoMD.toString({ calendarName: "auto" })); // '08-01'
console.log(md.toString({ calendarName: "auto" })); // '1972-09-08[u-ca=chinese]'
console.log(isoMD.toString({ calendarName: "always" })); // '1972-08-01[u-ca=iso8601]'
console.log(md.toString({ calendarName: "always" })); // '1972-09-08[u-ca=chinese]'
console.log(isoMD.toString({ calendarName: "never" })); // '08-01'
console.log(md.toString({ calendarName: "never" })); // '1972-09-08'
console.log(isoMD.toString({ calendarName: "critical" })); // '1972-08-01[!u-ca=iso8601]'
console.log(md.toString({ calendarName: "critical" })); // '1972-09-08[!u-ca=chinese]'
```

## See also

- `Temporal.PlainMonthDay`
- `Temporal.PlainMonthDay.from()`
- `Temporal.PlainMonthDay.prototype.toJSON()`
- `Temporal.PlainMonthDay.prototype.toLocaleString()`
