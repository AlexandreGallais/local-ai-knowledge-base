---
title: "Date.prototype.toJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/date/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Date.prototype.toJSON()

The **`toJSON()`** method of `Date` instances returns a string representing this date in the same ISO format as `toISOString()`.

```js
const event = new Date("August 19, 1975 23:15:30 UTC");

const jsonDate = event.toJSON();

console.log(jsonDate);
// Expected output: "1975-08-19T23:15:30.000Z"

console.log(new Date(jsonDate).toUTCString());
// Expected output: "Tue, 19 Aug 1975 23:15:30 GMT"
```

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string representing the given date in the date time string format according to universal time, or `null` when the date is invalid. For valid dates, the return value is the same as that of `toISOString()`.

## Description

The method is automatically called by `JSON.stringify()` when a `Date` object is encountered during JSON serialization. The serialized value can then be deserialized using the `Date()` constructor within the reviver of `JSON.parse()`.

The method first attempts to convert its `this` value to a primitive by calling its `[Symbol.toPrimitive]()` (with `"number"` as hint), `valueOf()`, and `toString()` methods, in that order. If the result is a non-finite number, `null` is returned. (This generally corresponds to an invalid date, whose `valueOf()` returns `NaN`.) Otherwise, if the converted primitive is not a number or is a finite number, the return value of `this.toISOString()` is returned.

Note that the method does not check whether the `this` value is a valid `Date` object. However, calling `Date.prototype.toJSON()` on non-`Date` objects fails unless the object's number primitive representation is `NaN`, or the object also has a `toISOString()` method.

## Examples

### Using toJSON()

```js
const jsonDate = new Date(0).toJSON(); // '1970-01-01T00:00:00.000Z'
const backToDate = new Date(jsonDate);

console.log(jsonDate); // 1970-01-01T00:00:00.000Z
```

### Serialization round-tripping

When parsing JSON containing date strings, you can use the `Date()` constructor to revive them into the original date objects.

```js
const fileData = {
  author: "Maria",
  title: "Date.prototype.toJSON()",
  createdAt: new Date(2019, 3, 15),
  updatedAt: new Date(2020, 6, 26),
};
const response = JSON.stringify(fileData);

// Imagine transmission through network

const data = JSON.parse(response, (key, value) => {
  if (key === "createdAt" || key === "updatedAt") {
    return new Date(value);
  }
  return value;
});

console.log(data);
```

> **Note:**
> The reviver of `JSON.parse()` must be specific to the payload shape you expect, because the serialization is _irreversible_: it's not possible to distinguish between a string that represents a Date and a normal string.

## See also

- `Date.prototype.toLocaleDateString()`
- `Date.prototype.toTimeString()`
- `Date.prototype.toUTCString()`
