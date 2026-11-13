---
title: "Temporal.PlainTime.prototype.nanosecond"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/nanosecond/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.nanosecond

The **`nanosecond`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 999 representing the nanosecond (10-9 second) component of this time.

The set accessor of `nanosecond` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using nanosecond

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.nanosecond); // 0

const time2 = Temporal.PlainTime.from("12:34:56.123456789");
console.log(time2.nanosecond); // 789
```

### Changing nanosecond

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ nanosecond: 100 });
console.log(newTime.toString()); // 12:34:56.0000001
```

You can also use `add()` or `subtract()` to move a certain number of nanoseconds from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.add({ nanoseconds: 100 });
console.log(newTime.toString()); // 12:34:56.0000001
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.with()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
- `Temporal.PlainTime.prototype.second`
- `Temporal.PlainTime.prototype.millisecond`
- `Temporal.PlainTime.prototype.microsecond`
