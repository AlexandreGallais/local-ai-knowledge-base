---
title: "CSS data types"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/data_types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS data types

**CSS data types** define typical values (including keywords and units) accepted by CSS properties and functions. They are a special kind of component value type.

The most commonly-used types are defined in the CSS Values and Units module. This module also defines functional notations, which allow for more complex types or processing. Other types are defined in the specifications to which they apply.

Below you will find a reference to the types that you are most likely to come across, however it is not a comprehensive reference for all types defined in every CSS specification.

## Syntax

In formal CSS syntax, data types are denoted by a keyword placed between the angle brackets `<` and `>`. They don't correspond to any tangible CSS code entity.

## Textual data types

These types include keywords and identifiers as well as strings, and URLs.

- Pre-defined keywords
    Keywords with a pre-defined meaning, for example, the value of `collapse` for the `border-collapse` property.
- CSS-wide keywords
    All properties, including custom properties, accept the CSS-wide keywords:
    - `initial`
        The value specified as the property's initial value.
    - `inherit`
        The computed value of the property on the element's parent.
    - `revert`
        Rolls back the cascade to the value of the earlier origin.
    - `revert-layer`
        Rolls back the cascade to the value of the earlier cascade layer.
    - `revert-rule`
        Rolls back the cascade to the value of an earlier matching style rule.
    - `unset`
        Acts as `inherit` or `initial` depending on whether the property is inherited or not.
- `<custom-ident>`
    A user-defined identifier, for example the name assigned using the `grid-area` property.
- `<dashed-ident>`
    A `<custom-ident>` with the additional restriction that it must start with two dashes, for example, with CSS Custom Properties.
- `<string>`
    A quoted string, such as used for a value of the `content` property.
- `<url>`
    A pointer to a resource, for example as the value of `background-image`.

## Numeric data types

These data types are used to indicate quantities, indexes, and positions. The majority of these are defined in the CSS values and units module, however additional types are described in other modules where they are specific to that specification alone — for example the `fr` unit in the CSS grid layout module.

- `<integer>`
    One or more decimal units 0 through 9, optionally preceded by `-` or `+`.
- `<number>`
    Real numbers which may also have a fractional component, for example `1` or `1.34`.
- `<dimension>`
    A number with a unit attached to it, for example `90deg`, `50ms`, or `15em`. This type includes distances (`<length>`), durations (`<time>`), frequencies (`<frequency>`), resolutions (`resolution`), and other quantities.
- `<percentage>`
    A number with a percentage sign attached to it, for example `10%`.
- `<ratio>`
    A ratio, written with the syntax `<number> / <number>`.
- `<flex>`
    A flexible length introduced for CSS grid layout, written as a `<number>` with the `fr` unit attached and used for grid track sizing.

## Quantities

These `<dimension>` types are used to specify distance and other quantities.

- `<length>`
    Lengths are a `<dimension>` and refer to distances.
- `angle`
    Angles are used in properties such as `linear-gradient()` and are a `<dimension>` with one of `deg`, `grad`, `rad`, or `turn` units attached.
- `<time>`
    Duration units are a `<dimension>` with an `s` or `ms` unit.
- `<frequency>`
    Frequencies are a `<dimension>` with a `Hz` or `kHz` unit attached.
- `resolution`
    Is a `<dimension>` with a unit identifier of `dpi`, `dpcm`, `dppx`, or `x`.

## Combinations of types

Some CSS properties can take a `<dimension>` or a `<percentage>` value. In this case the percentage value will be resolved to a quantity that matches the allowable dimension. Properties which can accept a percentage in addition to a dimension will use one of the types listed below.

- `<length-percentage>`
    A type that can accept a length or a percentage as a value.
- `<frequency-percentage>`
    A type that can accept a frequency or a percentage as a value.
- `<angle-percentage>`
    A type that can accept an angle or a percentage as a value.
- `<time-percentage>`
    A type that can accept a time or a percentage as a value.

## Color

The CSS color module defines the `<color>` data type, and other types which relate to color in CSS.

- `<color>`
    Specified as a keyword or a numerical color value.
- `<alpha-value>`
    Specifies the transparency of a color. May be a `<number>`, in which case 0 is fully transparent and 1 is fully opaque, or a `<percentage>`, in which case 0% is fully transparent and 100% fully opaque.
- `hue`
    Specifies the `<angle>`, with a unit identifier of `deg`, `grad`, `rad`, or `turn`, or unitless `<number>` interpreted as `deg`, of the color wheel specific to the `<absolute-color-functions>` of which it is a component.

## Images

The CSS images module defines the data types which deal with images, including gradients.

- `image`
    A URL reference to an image or a color gradient.
- `<color-stop-list>`
    A list of two or more color stops with optional transition information using a color hint.
- `<linear-color-stop>`
    A `<color>` and a `<length-percentage>` to indicate the color stop for this part of the gradient.
- `<linear-color-hint>`
    A `<length-percentage>` to indicate how the color interpolates.
- `<ending-shape>`
    Used for radial gradients; can have a keyword value of `circle` or `ellipse`.
- `<size>`
    Determines the size of the radial gradient's ending shape. This accepts a value of a keyword or a `<length>` but not a percentage.

## 2D positioning

The `<position>` data type is interpreted as defined for the `background-position` property.

- `<position>`
    Defines the position of an object area. Accepts a keyword value such as `top` or `left`, or a `<length-percentage>`.

## Calculation data types

These data types are used in CSS math function calculations.

- `<calc-sum>`
    A calculation which is a sequence of calculation values interspersed with addition (`+`) and subtraction (`-`) operators. This data type requires both values to have units.
- `<calc-product>`
    A calculation which is a sequence of calculation values interspersed with multiplication (`*`) and division (`/`) operators. When multiplying, one value must be unitless. When dividing, the second value must be unitless.
- `<calc-value>`
    Defines accepted values for calculations, values such as `<number>`, `<dimension>`, `<percentage>`, `<calc-keyword>` or nested `<calc-sum>` calculations.
- `<calc-keyword>`
    Defines a number of CSS keywords representing numeric constants such as `e` and `π`, that can be used in CSS math functions.

## Shape data types

The CSS shapes and CSS borders and box decorations modules define shape data types:

- `<basic-shape>`
    Describes shape functions used in the `clip-path`, `shape-outside`, and `offset-path` properties.
- `<corner-shape-value>`
    Describes the shape of a container corner. It is used by the `corner-shape` shorthand property and its constituent properties to specify the shape applied to affected container corners.

## Alphabetical index of data types

- `absolute-size`
- `alpha-value`
- `angle`
- `angle-percentage`
- `axis`
- `baseline-position`
- `basic-shape`
- `blend-mode`
- `box-edge`
- `calc-keyword`
- `calc-sum`
- `<color>`
- `color-interpolation-method`
- `content-distribution`
- `content-position`
- `corner-shape-value` (experimental)
- `custom-ident`
- `dashed-function` (experimental)
- `dashed-ident`
- `dimension`
- `display-box`
- `display-inside`
- `display-internal`
- `display-legacy`
- `display-listitem`
- `display-outside`
- `easing-function`
- `filter-function`
- `<flex>`
- `frequency`
- `frequency-percentage`
- `generic-family`
- `gradient`
- `hex-color`
- `hue`
- `hue-interpolation-method`
- `ident`
- `image`
- `integer`
- `length`
- `length-percentage`
- `line-style`
- `line-width`
- `named-color`
- `number`
- `<overflow>`
- `overflow-position`
- `percentage`
- `<position>`
- `<position-area>`
- `ratio`
- `relative-size`
- `resolution`
- `self-position`
- `shape` (deprecated)
- `string`
- `system-color`
- `text-edge`
- `time`
- `timeline-range-name`
- `time-percentage`
- `transform-function`
- `<url>`

## See also

- CSS values and units module
- Learn: Values and units
- CSS functional notation
