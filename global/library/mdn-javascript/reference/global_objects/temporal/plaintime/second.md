---
title: "Temporal.PlainTime.prototype.second"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/plaintime/second/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.PlainTime.prototype.second

The **`second`** accessor property of `Temporal.PlainTime` instances returns an integer from 0 to 59 representing the second component of this time.

The set accessor of `second` is `undefined`. You cannot change this property directly. Use the `with()` method to create a new `Temporal.PlainTime` object with the desired new value.

## Examples

### Using second

```js
const time = Temporal.PlainTime.from("12:34:56");
console.log(time.second); // 56
```

### Changing second

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.with({ second: 15 });
console.log(newTime.toString()); // 12:34:15
```

You can also use `add()` or `subtract()` to move a certain number of seconds from the current time.

```js
const time = Temporal.PlainTime.from("12:34:56");
const newTime = time.subtract({ seconds: 41 });
console.log(newTime.toString()); // 12:34:15
```

## See also

- `Temporal.PlainTime`
- `Temporal.PlainTime.prototype.with()`
- `Temporal.PlainTime.prototype.add()`
- `Temporal.PlainTime.prototype.subtract()`
- `Temporal.PlainTime.prototype.millisecond`
- `Temporal.PlainTime.prototype.microsecond`
- `Temporal.PlainTime.prototype.nanosecond`
