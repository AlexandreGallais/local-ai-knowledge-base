---
title: "Temporal.PlainYearMonth.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.toString()

The **`toString()`** method of `Temporal.PlainYearMonth` instances returns a string representing this year-month in the RFC 9557 format.

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
            Include the calendar annotation if the calendar is not `"iso8601"`. The reference day is included if the calendar is not `"iso8601"`.
        - `"always"`
            Always include the calendar annotation. The reference day is always included too.
        - `"never"`
            Never include the calendar annotation. This makes the returned string not recoverable to the same `Temporal.PlainYearMonth` instance, although the year-month value still remains the same. The reference day is included if the calendar is not `"iso8601"`.
        - `"critical"`
            Always include the calendar annotation, and add a critical flag: `[!u-ca=calendar_id]`. Useful when sending the string to certain systems, but not useful for Temporal itself. The reference day is always included too.

### Return value

A string in the RFC 9557 format representing this year-month. The calendar annotation is included as specified. The reference day is included if a calendar annotation is included or if the calendar is not `"iso8601"`.

### Exceptions

- `RangeError`
    Thrown if any of the options is invalid.
- `TypeError`
    Thrown if `options` is not an object or `undefined`.

## Examples

### Using toString()

```js
const ym = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
console.log(ym.toString()); // '2021-08'

const ym2 = Temporal.PlainYearMonth.from({
  year: 5781,
  monthCode: "M08",
  calendar: "hebrew",
});
console.log(ym2.toString()); // '2021-04-13[u-ca=hebrew]'
```

### Using options

```js
const isoYM = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
const ym = Temporal.PlainYearMonth.from({
  year: 5781,
  monthCode: "M08",
  calendar: "hebrew",
});
console.log(isoYM.toString({ calendarName: "auto" })); // '2021-08'
console.log(ym.toString({ calendarName: "auto" })); // '2021-04-13[u-ca=hebrew]'
console.log(isoYM.toString({ calendarName: "always" })); // '2021-08-01[u-ca=iso8601]'
console.log(ym.toString({ calendarName: "always" })); // '2021-04-13[u-ca=hebrew]'
console.log(isoYM.toString({ calendarName: "never" })); // '2021-08'
console.log(ym.toString({ calendarName: "never" })); // '2021-04-13'
console.log(isoYM.toString({ calendarName: "critical" })); // '2021-08-01[!u-ca=iso8601]'
console.log(ym.toString({ calendarName: "critical" })); // '2021-04-13[!u-ca=hebrew]'
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.from()`
- `Temporal.PlainYearMonth.prototype.toJSON()`
- `Temporal.PlainYearMonth.prototype.toLocaleString()`
