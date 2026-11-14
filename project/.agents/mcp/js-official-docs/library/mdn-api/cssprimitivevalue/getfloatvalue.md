---
title: "CSSPrimitiveValue: getFloatValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssprimitivevalue/getfloatvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPrimitiveValue: getFloatValue() method

The **`getFloatValue()`** method of the
`CSSPrimitiveValue` interface is used to get a float value in a specified
unit. If this CSS value doesn't contain a float value or can't be converted into the
specified unit, a `DOMException` is raised.

> **Note:**
> This method was part of an attempt to create a typed CSS Object Model. This attempt has been abandoned, and most browsers do
> not implement it.
>
> To achieve your purpose, you can use:
>
> - the untyped CSS Object Model, widely supported, or
> - the modern CSS Typed Object Model API, less supported and considered experimental.

## Syntax

```js
getFloatValue(unit)
```

### Parameters

- `unit`
    An `unsigned short` representing the code for the unit type, in which the
    value should be returned. Valid values are:

    | Constant         | Description                                                                                                            |
    | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
    | `CSS_CM`         | The value is a `<length>` in centimeters.                                                           |
    | `CSS_DEG`        | The value is an `<angle>` in degrees.                                                               |
    | `CSS_DIMENSION`  | The value is a `<number>` with an unknown dimension.                                                |
    | `CSS_EMS`        | The value is a `<length>` in em units.                                                              |
    | `CSS_EXS`        | The value is a `<length>` in ex units.                                                              |
    | `CSS_GRAD`       | The value is an `<angle>` in grads.                                                                 |
    | `CSS_HZ`         | The value is a `<frequency>` in Hertz. The value can be obtained by using the getFloatValue method. |
    | `CSS_IN`         | The value is a `<length>` in inches.                                                                |
    | `CSS_KHZ`        | The value is a `<frequency>` in Kilohertz.                                                          |
    | `CSS_MM`         | The value is a `<length>` in millimeters.                                                           |
    | `CSS_MS`         | The value is a `<time>` in milliseconds.                                                            |
    | `CSS_NUMBER`     | The value is a simple `<number>`.                                                                   |
    | `CSS_PC`         | The value is a `<length>` in picas.                                                                 |
    | `CSS_PERCENTAGE` | The value is a `<percentage>`.                                                                      |
    | `CSS_PT`         | The value is a `<length>` in points.                                                                |
    | `CSS_PX`         | The value is a `<length>` in pixels.                                                                |
    | `CSS_RAD`        | The value is an `<angle>` in radians.                                                               |
    | `CSS_S`          | The value is a `<time>` in seconds.                                                                 |

### Return value

A `float` value in the specified unit.

### Exceptions

       | Type
       | Description

       | `DOMException`
       |
        An `INVALID_ACCESS_ERR` is raised if the CSS value doesn't
        contain a float value or if the float value can't be converted into the
        specified unit.

## Examples

```js
const cs = window.getComputedStyle(document.body);
const cssValue = cs.getPropertyCSSValue("margin-top");
console.log(cssValue.getFloatValue(CSSPrimitiveValue.CSS_CM));
```

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.
