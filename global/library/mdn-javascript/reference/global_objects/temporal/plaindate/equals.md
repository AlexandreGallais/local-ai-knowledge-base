---
title: "Temporal.PlainDate.prototype.equals()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaindate/equals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainDate.prototype.equals()

The **`equals()`** method of `Temporal.PlainDate` instances returns `true` if this date is equivalent in value to another date (in a form convertible by `Temporal.PlainDate.from()`), and `false` otherwise. They are compared both by their date values and their calendars, so two dates from different calendars may be considered equal by `Temporal.PlainDate.compare()` but not by `equals()`.

## Syntax

```js
equals(other)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainDate` instance representing the other date to compare. It is converted to a `Temporal.PlainDate` object using the same algorithm as `Temporal.PlainDate.from()`.

### Return value

`true` if this date is equal to `other` both in their date value and their calendar, `false` otherwise.

## Examples

### Using equals()

```js
const date1 = Temporal.PlainDate.from("2021-08-01");
const date2 = Temporal.PlainDate.from({ year: 2021, month: 8, day: 1 });
console.log(date1.equals(date2)); // true

const date3 = Temporal.PlainDate.from("2021-08-01[u-ca=japanese]");
console.log(date1.equals(date3)); // false

const date4 = Temporal.PlainDate.from("2021-08-02");
console.log(date1.equals(date4)); // false
```

## See also

- `Temporal.PlainDate`
- `Temporal.PlainDate.compare()`
