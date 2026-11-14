---
title: "Array.prototype.toLocaleString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/tolocalestring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.toLocaleString()

The **`toLocaleString()`** method of `Array` instances returns a string representing
the elements of the array. The elements are converted to strings using their
`toLocaleString` methods and these strings are separated by a locale-specific
string (such as a comma ",").

```js
const array = [1, "a", new Date("21 Dec 1997 14:12:00 UTC")];
const localeString = array.toLocaleString("en", { timeZone: "UTC" });

console.log(localeString);
// Expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
```

## Syntax

```js
toLocaleString()
toLocaleString(locales)
toLocaleString(locales, options)
```

### Parameters

- `locales` (optional)
    A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.
- `options` (optional)
    An object with configuration properties. What you can pass here depends on what elements are being converted. For example, for numbers, see `Number.prototype.toLocaleString()`.

### Return value

A string representing the elements of the array.

## Description

The `Array.prototype.toLocaleString` method traverses its content, calling the `toLocaleString` method of every element with the `locales` and `options` parameters provided, and concatenates them with an implementation-defined separator (such as a comma ",").

> **Note:**
> The `locales` or `options` arguments do not control the separator used between array elements; they are simply passed to the `toLocaleString()` method of each element. The actual separator (usually a comma) depends solely on the host's current locale. If you expect localized list formatting, consider using `Intl.ListFormat` instead.

If an element is `undefined`, `null`, it is converted to an empty string instead of the string `"null"` or `"undefined"`.

When used on sparse arrays, the `toLocaleString()` method iterates empty slots as if they have the value `undefined`.

The `toLocaleString()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Using locales and options

The elements of the array are converted to strings using their `toLocaleString` methods. For example, this snippet implicitly calls the `Number.prototype.toLocaleString()` method to display the currency for the strings and numbers in the `prices` array:

```js
const prices = ["￥7", 500, 8123, 12];
prices.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });

// "￥7,￥500,￥8,123,￥12"
```

### List separators

The list separator is not affected by the `locales` parameter. To configure it, use `Intl.ListFormat` instead.

```js
const nums = [8888, 9999];
console.log(nums.toLocaleString("zh")); // "8,888,9,999"

const formatter = new Intl.ListFormat("zh", {
  type: "conjunction",
  style: "narrow",
});
console.log(formatter.format(nums.map((x) => x.toLocaleString("zh"))));
// "8,888、9,999"
```

### Using toLocaleString() on sparse arrays

`toLocaleString()` treats empty slots the same as `undefined` and produces an extra separator:

```js
console.log([1, , 3].toLocaleString()); // '1,,3'
```

### Calling toLocaleString() on non-array objects

The `toLocaleString()` method reads the `length` property of `this` and then accesses each property whose key is a nonnegative integer less than `length`.

```js
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
  3: 4, // ignored by toLocaleString() since length is 3
};
console.log(Array.prototype.toLocaleString.call(arrayLike));
// 1,2,3
```

## See also

- Indexed collections guide
- `Array`
- `Array.prototype.toString()`
- `TypedArray.prototype.toLocaleString()`
- `Intl`
- `Intl.ListFormat`
- `Object.prototype.toLocaleString()`
- `Number.prototype.toLocaleString()`
- `Temporal.PlainDate.prototype.toLocaleString()`
