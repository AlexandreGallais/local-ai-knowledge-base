---
title: "CSSNumericValue: type() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericvalue/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericValue: type() method

The **`type()`** method of the `CSSNumericValue` interface returns a `CSSNumericType` dictionary that describes the type of the `CSSNumericValue`, such as whether it's a length, an angle, or a time.

## Syntax

```js
type()
```

### Parameters

None.

### Return value

A `CSSNumericType` dictionary (an object) with the following properties.
Only the properties that apply to the value are included, so a plain number has the type `{}`.

- `length`, `angle`, `time`, `frequency`, `resolution`, `flex`, and `percent`
    Integers giving the power of each of these base types in the value, included only if they aren't `0`.
    For example, a length has the type `{ length: 1 }`, and a length multiplied by a length has the type `{ length: 2 }`.
- `percentHint`
    A string naming the base type that percentages in the value will become, such as `"length"`.
    Only included if the value mixes a percentage with another type.

### Exceptions

None.

## Description

Every numeric value has a type, made up of one or more base types: length (such as `px` or `em`), angle (such as `deg`), time (`s` or `ms`), frequency (`Hz` or `kHz`), resolution (such as `dpi`), flex (`fr`), and percent (`%`).
Most values have a single base type with a power of `1`.

Calculations change the type.
Multiplying values adds the powers of their base types, so `10px * 2px` has the type `{ length: 2 }`, which is an area.
Dividing subtracts them, so `100px / 2s` has the type `{ length: 1, time: -1 }`, which is a speed, and `10px / 2px` has the type `{}`, which is a plain number.

When a percentage is added to another type, as in `calc(50% + 10px)`, the percentage becomes that type when the page is laid out, because 50% of a width is a length.
So the type is reported as `{ length: 1, percentHint: "length" }`: a length, with a hint that it includes a percentage.

## Examples

### Getting the type of single values

```js
console.log(CSS.px(10).type()); // { length: 1 }
console.log(CSS.deg(45).type()); // { angle: 1 }
console.log(CSS.number(3).type()); // {}
```

### Getting the type of calculations

```js
console.log(CSS.px(2).mul(CSS.px(3)).type()); // { length: 2 }
console.log(CSS.px(100).div(CSS.s(2)).type()); // { length: 1, time: -1 }
console.log(CSS.px(10).div(CSS.px(2)).type()); // {}
```

### Getting the type of a value that includes a percentage

```js
const width = CSS.percent(50).add(CSS.px(10));
console.log(width.type()); // { length: 1, percentHint: "length" }
```

## See also

- `CSSNumericValue.add()`
- `CSSNumericValue.mul()`
- CSS values and units
- Using the CSS Typed OM
