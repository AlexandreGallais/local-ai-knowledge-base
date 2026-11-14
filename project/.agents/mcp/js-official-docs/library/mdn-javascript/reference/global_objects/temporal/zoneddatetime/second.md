---
title: "Temporal.ZonedDateTime.prototype.second"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/second/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime.prototype.second

The **`second`** accessor property of `Temporal.ZonedDateTime` instances returns an integer from 0 to 59 representing the second component of this time.

The set accessor of `second` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.ZonedDateTime` object with the desired new value.

For general information and more examples, see `Temporal.PlainTime.prototype.second`.

For `ZonedDateTime`, `second` can be non-continuous due to offset changes. While much rarer than `hour` or `minute` changes (because daylight saving time shifts are usually by whole hours), it can still happen.

## Examples

### Using second

```js
const dt = Temporal.ZonedDateTime.from(
  "2021-07-01T12:34:56.123456789-04:00[America/New_York]",
);
console.log(dt.second); // 56
```

### Non-continuous second

Typically, `second` always goes from 0 to 59 and then back to 0, even when passing through a daylight saving time transition. There's a peculiar case where the second can be non-continuous: the standardization of hourly time zones. In the early 20th century, most countries were using their own time zones which were often not a whole hour offset from UTC. For example, Paris used to have an offset of UTC+0:09:21, which was changed to UTC+0 on March 11, 1911.

```js
const dt = Temporal.ZonedDateTime.from(
  "1911-03-10T23:59:59+00:09:21[Europe/Paris]",
);
console.log(dt.second); // 59
const dt2 = dt.add({ seconds: 1 });
console.log(dt2.second); // 39
console.log(dt2.toString()); // 1911-03-10T23:50:39+00:00[Europe/Paris]
```

For this reason, you should always prefer `add()` and `subtract()` to manipulate dates and times, rather than directly changing the `second` property.

## See also

- `Temporal.ZonedDateTime`
- `Temporal.ZonedDateTime.prototype.with()`
- `Temporal.ZonedDateTime.prototype.add()`
- `Temporal.ZonedDateTime.prototype.subtract()`
- `Temporal.ZonedDateTime.prototype.millisecond`
- `Temporal.ZonedDateTime.prototype.microsecond`
- `Temporal.ZonedDateTime.prototype.nanosecond`
- `Temporal.PlainTime.prototype.second`
