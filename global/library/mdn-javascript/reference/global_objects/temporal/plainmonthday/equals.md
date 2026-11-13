---
title: "Temporal.PlainMonthDay.prototype.equals()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainmonthday/equals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainMonthDay.prototype.equals()

The **`equals()`** method of `Temporal.PlainMonthDay` instances returns `true` if this month-day is equivalent in value to another month-day (in a form convertible by `Temporal.PlainMonthDay.from()`), and `false` otherwise. They are compared both by their underlying ISO date values and their calendars.

> **Note:**
> `PlainMonthDay` objects keep track of a reference ISO year, which is also used in the comparison. This year is automatically set when using the `Temporal.PlainMonthDay.from()` method, but can be set manually using the `Temporal.PlainMonthDay()` constructor, causing two equivalent month-days to be considered different if they have different reference years. For this reason, you should avoid using the constructor directly and prefer the `from()` method.

## Syntax

```js
equals(other)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainMonthDay` instance representing the other month-day to compare. It is converted to a `Temporal.PlainMonthDay` object using the same algorithm as `Temporal.PlainMonthDay.from()`.

### Return value

`true` if this month-day is equal to `other` both in their date value and their calendar, `false` otherwise.

## Examples

### Using equals()

```js
const md1 = Temporal.PlainMonthDay.from("2021-08-01");
const md2 = Temporal.PlainMonthDay.from({ year: 2020, month: 8, day: 1 }); // Year doesn't matter
console.log(md1.equals(md2)); // true

const md3 = Temporal.PlainMonthDay.from("2021-08-01[u-ca=japanese]");
console.log(md1.equals(md3)); // false

const md4 = Temporal.PlainMonthDay.from("2021-08-02");
console.log(md1.equals(md4)); // false
```

## See also

- `Temporal.PlainMonthDay`
