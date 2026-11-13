---
title: "CSSPrimitiveValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssprimitivevalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPrimitiveValue

The **`CSSPrimitiveValue`** interface derives from the `CSSValue` interface and represents the current computed value of a CSS property.

> **Note:**
> This interface was part of an attempt to create a typed CSS Object Model. This attempt has been abandoned, and most browsers do
> not implement it.
>
> To achieve your purpose, you can use:
>
> - the untyped CSS Object Model, widely supported, or
> - the modern CSS Typed Object Model API, less supported and considered experimental.

This interface represents a single CSS value. It may be used to determine the value of a specific style property currently set in a block or to set a specific style property explicitly within the block. An instance of this interface might be obtained from the `getPropertyCSSValue()` method of the `CSSStyleDeclaration` interface. A `CSSPrimitiveValue` object only occurs in a context of a CSS property.

Conversions are allowed between absolute values (from millimeters to centimeters, from degrees to radians, and so on) but not between relative values. (For example, a pixel value cannot be converted to a centimeter value.) Percentage values can't be converted since they are relative to the parent value (or another property value). There is one exception for color percentage values: since a color percentage value is relative to the range 0-255, a color percentage value can be converted to a number (see also the `RGBColor` interface).

## Instance properties

_Inherits properties from its parent, `CSSValue`_.

- `CSSPrimitiveValue.primitiveType` (read-only) (deprecated) (non-standard)
    An `unsigned short` representing the type of the value. Possible values are:

    | Constant         | Description                                                                                                                                                                 |
    | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `CSS_ATTR`       | The value is an `attr()` function. The value can be obtained by using the `getStringValue()` method.                                                   |
    | `CSS_CM`         | The value is a `<length>` in centimeters. The value can be obtained by using the `getFloatValue()` method.                                               |
    | `CSS_COUNTER`    | The value is a counter or counters function. The value can be obtained by using the `getCounterValue()` method. |
    | `CSS_DEG`        | The value is an `<angle>` in degrees. The value can be obtained by using the `getFloatValue()` method.                                                   |
    | `CSS_DIMENSION`  | The value is a `<number>` with an unknown dimension. The value can be obtained by using the `getFloatValue()` method.                                    |
    | `CSS_EMS`        | The value is a `<length>` in em units. The value can be obtained by using the `getFloatValue()` method.                                                  |
    | `CSS_EXS`        | The value is a `<length>` in ex units. The value can be obtained by using the `getFloatValue()` method.                                                  |
    | `CSS_GRAD`       | The value is an `<angle>` in grads. The value can be obtained by using the `getFloatValue()` method.                                                     |
    | `CSS_HZ`         | The value is a `<frequency>` in Hertz. The value can be obtained by using the getFloatValue method.                                                      |
    | `CSS_IDENT`      | The value is an identifier. The value can be obtained by using the `getStringValue()` method.                                                                               |
    | `CSS_IN`         | The value is a `<length>` in inches. The value can be obtained by using the `getFloatValue()` method.                                                    |
    | `CSS_KHZ`        | The value is a `<frequency>` in Kilohertz. The value can be obtained by using the `getFloatValue()` method.                                              |
    | `CSS_MM`         | The value is a `<length>` in millimeters. The value can be obtained by using the `getFloatValue()` method.                                               |
    | `CSS_MS`         | The value is a `<time>` in milliseconds. The value can be obtained by using the `getFloatValue()` method.                                                |
    | `CSS_NUMBER`     | The value is a simple `<number>`. The value can be obtained by using the `getFloatValue()` method.                                                       |
    | `CSS_PC`         | The value is a `<length>` in picas. The value can be obtained by using the `getFloatValue()` method.                                                     |
    | `CSS_PERCENTAGE` | The value is a `<percentage>`. The value can be obtained by using the `getFloatValue()` method.                                                          |
    | `CSS_PT`         | The value is a `<length>` in points. The value can be obtained by using the `getFloatValue()` method.                                                    |
    | `CSS_PX`         | The value is a `<length>` in pixels. The value can be obtained by using the `getFloatValue()` method.                                                    |
    | `CSS_RAD`        | The value is an `<angle>` in radians. The value can be obtained by using the `getFloatValue()` method.                                                   |
    | `CSS_RECT`       | The value is a `rect()` function. The value can be obtained by using the `getRectValue()` method.                                          |
    | `CSS_RGBCOLOR`   | The value is an `<color>`. The value can be obtained by using the `getRGBColorValue()` method.                                                           |
    | `CSS_S`          | The value is a `<time>` in seconds. The value can be obtained by using the `getFloatValue()` method.                                                     |
    | `CSS_STRING`     | The value is a `<string>`. The value can be obtained by using the `getStringValue()` method.                                                             |
    | `CSS_UNKNOWN`    | The value is not a recognized CSS2 value. The value can only be obtained by using the `cssText` attribute.                                 |
    | `CSS_URI`        | The value is a `<url>`. The value can be obtained by using the `getStringValue()` method.                                                   |

## Instance methods

- `CSSPrimitiveValue.getCounterValue()` (deprecated) (non-standard)
    This method is used to get the counter value. If this CSS value doesn't contain a counter value, a `DOMException` is raised. Modification to the corresponding style property can be achieved using the `Counter` interface.
- `CSSPrimitiveValue.getFloatValue()` (deprecated) (non-standard)
    This method is used to get a float value in a specified unit. If this CSS value doesn't contain a float value or can't be converted into the specified unit, a `DOMException` is raised.
- `CSSPrimitiveValue.getRGBColorValue()` (deprecated) (non-standard)
    This method is used to get the RGB color. If this CSS value doesn't contain an RGB color value, a `DOMException` is raised. Modification to the corresponding style property can be achieved using the `RGBColor` interface.
- `CSSPrimitiveValue.getRectValue()` (deprecated) (non-standard)
    This method is used to get the Rect value. If this CSS value doesn't contain a rect value, a `DOMException` is raised. Modification to the corresponding style property can be achieved using the `Rect` interface.
- `CSSPrimitiveValue.getStringValue()` (deprecated) (non-standard)
    This method is used to get the string value. If the CSS value doesn't contain a string value, a `DOMException` is raised.
- `CSSPrimitiveValue.setFloatValue()` (deprecated) (non-standard)
    A method to set the float value with a specified unit. If the property attached with this value cannot accept the specified unit or the float value, the value will be unchanged and a `DOMException` will be raised.
- `CSSPrimitiveValue.setStringValue()` (deprecated) (non-standard)
    A method to set the string value with the specified unit. If the property attached to this value can't accept the specified unit or the string value, the value will be unchanged and a `DOMException` will be raised.

## Specifications

This feature was originally defined in the DOM Style Level 2 specification, but has been dropped from any
standardization effort since then.

It has been superseded by a modern, but incompatible, CSS Typed Object Model API that is now on the standard track.

## See also

- `CSSValue`
- `CSSValueList`
