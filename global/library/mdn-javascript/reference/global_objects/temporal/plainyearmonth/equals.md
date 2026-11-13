---
title: "Temporal.PlainYearMonth.prototype.equals()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plainyearmonth/equals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainYearMonth.prototype.equals()

The **`equals()`** method of `Temporal.PlainYearMonth` instances returns `true` if this year-month is equivalent in value to another year-month (in a form convertible by `Temporal.PlainYearMonth.from()`), and `false` otherwise. They are compared both by their underlying ISO date values and their calendars, so two year-months from different calendars may be considered equal by `Temporal.PlainYearMonth.compare()` but not by `equals()`.

> **Note:**
> `PlainYearMonth` objects keep track of a reference ISO day, which is also used in the comparison. This day is automatically set when using the `Temporal.PlainYearMonth.from()` method, but can be set manually using the `Temporal.PlainYearMonth()` constructor, causing two equivalent year-months to be considered different if they have different reference days. For this reason, you should avoid using the constructor directly and prefer the `from()` method.

## Syntax

```js
equals(other)
```

### Parameters

- `other`
    A string, an object, or a `Temporal.PlainYearMonth` instance representing the other year-month to compare. It is converted to a `Temporal.PlainYearMonth` object using the same algorithm as `Temporal.PlainYearMonth.from()`.

### Return value

`true` if this year-month is equal to `other` both in their date value and their calendar, `false` otherwise.

## Examples

### Using equals()

```js
const ym1 = Temporal.PlainYearMonth.from("2021-08");
const ym2 = Temporal.PlainYearMonth.from({ year: 2021, month: 8 });
console.log(ym1.equals(ym2)); // true

const ym3 = Temporal.PlainYearMonth.from("2021-08-01[u-ca=japanese]");
console.log(ym1.equals(ym3)); // false

const ym4 = Temporal.PlainYearMonth.from("2021-09");
console.log(ym1.equals(ym4)); // false
```

## See also

- `Temporal.PlainYearMonth`
- `Temporal.PlainYearMonth.compare()`
