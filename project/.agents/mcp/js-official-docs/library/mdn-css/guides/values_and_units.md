---
title: "CSS values and units"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/values_and_units/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS values and units

Every CSS declaration consists of a property/value pair. The value can take various forms depending on the property, such as a single integer, keyword, function, or a combination of different items; some values have units, while others do not. Every property also accepts the CSS-wide values. The CSS values and units module defines the data types — values and units — that CSS properties accept. This module also defines the CSS value definition syntax, or formal grammar, used to define the set of valid values for every CSS property and function.

> **Note:**
> This page introduces a CSS module. To find an exhaustive list of all values, types, and functions defined by CSS specifications, see the values reference page.

## Reference

### Properties

- `interpolate-size`

### Functions

- `abs()`
- `acos()`
- `asin()`
- `atan()`
- `atan2()`
- `attr()`
- `calc()`
- `calc-size()`
- `clamp()`
- `cos()`
- `exp()`
- `hypot()`
- `ident()`
- `if()`
- `inherit()`
- `log()`
- `max()`
- `min()`
- `mod()`
- `pow()`
- `progress()`
- `random()`
- `rem()`
- `round()`
- `sibling-count()`
- `sibling-index()`
- `sign()`
- `sin()`
- `sqrt()`
- `tan()`
- `url()`

The CSS values and units module also introduces the `calc-mix()`, `first-valid()`, `integrity()`, `random-item()`, `src()`, `type()`, and `toggle()` functions. Currently, no browsers support these features.

### Data types

- `angle-percentage`
- `angle`
- `<attr-name>`
- `<attr-type>`
- `<calc-keyword>` (`e`, `pi`, `infinity`, NaN)
- `<calc-size-basis>`
- `calc-sum`
- `custom-ident`
- `dashed-ident`
- `dimension`
- `easing-function`
- `ident`
- `integer`
- `length-percentage`
- `length`
- `number`
- `percentage`
- `<position>`
- `ratio`
- `resolution`
- `<rounding-strategy>` (`down`, `up`, `to-zero`)
- `string`
- `<syntax>`
- `time-percentage`
- `time`
- `<url>`
- `<url-modifier>`

The CSS values and units module also introduces the `frequency` and `frequency-percentage` data types. Currently, no browsers support these features.

#### Units

- `%` (percentage)
- `cap`
- `ch`
- `cm`
- `deg`
- `dpcm`
- `dpi`
- `dppx`
- `dvb`
- `dvh`
- `dvi`
- `dvmax`
- `dvmin`
- `dvw`
- `em`
- `ex`
- `grad`
- `Hz`
- `ic`
- `in`
- `kHz`
- `lh`
- `lvb`
- `lvh`
- `lvi`
- `lvmax`
- `lvmin`
- `lvw`
- `mm`
- `ms`
- `pc`
- `pt`
- `px`
- `Q`
- `rad`
- `rcap`
- `rch`
- `rem`
- `rex`
- `ric`
- `rlh`
- `s`
- `svb`
- `svh`
- `svi`
- `svmax`
- `svmin`
- `svw`
- `turn`
- `vb`
- `vh`
- `vi`
- `vmax`
- `vmin`
- `vw`
- `x`

Flex units (`fr`) and container units (`cqb`, `cqh`, `cqi`, `cqmax`, `cqmin`, `cqw`) are defined in the CSS grid layout and CSS conditional rules modules, respectively.

#### Unit categorizations

- Absolute length units (`cm`, `in`, `mm`, `pc`, `pt`, `px`, `Q`)
- Angle units (`deg`, `grad`, `rad`, `turn`)
- Default viewport units (`vb` , `vh`, `vi` , `vmax`, `vmin`, `vw`)
- Dynamic viewport units (`dvb`, `dvh`, `dvi`, `dvmax`, `dvmin`, `dvw`)
- Frequency units (`Hz`, `kHz`)
- Large viewport-percentage units (`lvb`, `lvh`, `lvi`, `lvmax`, `lvmin`, `lvw`)
- Local font-relative length units (`cap`, `ch`, `em`, `ex`, `ic`, `lh`)
- Physical units (`cm`, `in`, `mm`, `pc`, `pt`, `Q`)
- Relative length units (`cap`, `ch`, `em`, `ex`, `ic`, `lh`, `rem`, `rlh`, `vb`, `vh`, `vi`, `vmax`, `vmin`, `vw`)
- Resolution units (`dpcm`, `dpi` , `dppx`, `x`)
- Root font-relative length units (`rcap`, `rch`, `rem`, `rex`, `ric`, `rlh`)
- Small viewport-percentage unit (`svb`, `svh`, `svi`, `svmax`, `svmin`, `svw`)
- Time units (`ms`, `s`)
- Viewport units (`dvh`, `dvw`, `lvh`, `lvw`, `svh`, `svw`, `vb` , `vh`, `vi` , `vmax`, `vmin`, `vw`)
- Visual angle unit (`px`)

### Key <example-value>

- Advance measure
- Bracketed range notation
- Component value combinators
- CSS-wide keywords
- Device pixel
- Functional notation
- Identifier
- Interpolation
- Keyword
- Math function
- Numeric data types
- Origin
- Pixel
- Textual data types
- URL
- Value definition syntax

## Guides

- CSS data types
    Introduction to CSS data types that define typical values accepted by CSS properties and functions.

- Numeric data types
    Overview of the numeric data types, including integers, numbers, percentages, and dimensions, along with relative and absolute dimensions, angles, and time units.

- Textual data types
    Overview of the textual data types, including pre-defined keyword values, global CSS keyword values, and URLs.

- CSS value functions
    Overview of the CSS statements that invoke special data processing or calculations to return a CSS value for a CSS property.

- Using CSS math functions
    The CSS math functions that allow a property value to be written as a mathematical expression.

- Value definition syntax
    The formal grammar used to define the set of valid values for CSS properties and functions.

- Using CSS typed arithmetic
    An explanation of CSS typed arithmetic behavior and use cases enabled by it.

- Learn: Values and units
    A look at some of the most frequently used value types, what they are, and how they work.

- CSS value serialization
    How CSSOM APIs serialize color and other values into standardized string representations.

## Related

- CSS cascading and inheritance module
  - `initial`
  - `inherit`
  - `revert`
  - `revert-layer`
  - `unset`
  - `all`

- CSS grid layout module
  - `<flex>`
  - Flex units (`fr`)

- CSS conditional rules module
  - Container units (`cqb`, `cqh`, `cqi`, `cqmax`, `cqmin`, `cqw`)

- CSS colors module
  - `<color>`
  - `system-color`
  - `color-mix()`

- CSS images module
  - `image`
  - `gradient`

## See also

- CSS syntax module
- CSS selectors module
