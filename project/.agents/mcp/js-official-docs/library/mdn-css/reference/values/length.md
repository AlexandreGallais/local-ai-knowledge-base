---
title: "`<length>` CSS type (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<length>` CSS type

The **`<length>`** CSS data type represents a distance value. Lengths can be used in numerous CSS properties, such as `width`, `height`, `margin`, `padding`, `border-width`, `font-size`, and `text-shadow`.

> **Note:**
> Although `<percentage>` values are usable in some of the same properties that accept `<length>` values, they are not themselves `<length>` values. See `<length-percentage>`.

## Syntax

The `<length>` data type consists of a `<number>` followed by one of the units listed below. As with all CSS dimensions, there is no space between the number and the unit literal. Specifying the length unit is optional if the number is `0`.

> **Note:**
> Some properties allow negative `<length>` values, while others do not.

### Specified vs. computed values

The specified value of a length (_specified length_) is represented by its quantity and unit. The computed value of a length (_computed length_) is the specified length resolved to an absolute length, and its unit is not distinguished.

For some properties, such as `border-width`, `outline-width`, `column-rule-width`, and `outline-offset`, the computed `<length>` values are rounded to an integer number of device pixels to ensure reasonable visual display:

- A non-zero value less than 1 device pixel is rounded up.
- A value greater than 1 device pixel is rounded down to the nearest whole device pixel.

For example, on a screen with a `devicePixelRatio` of 3, `border-width: 1.5px` computes to approximately `1.33px` (rounded down from 4.5 to 4 device pixels), and `outline-width: 0.2px` computes to approximately `0.33px` (rounded up from 0.6 to 1 device pixel).

### Relative vs. absolute lengths

The `<length>` units can be relative or absolute. Relative lengths represent a measurement in terms of some other distance. Depending on the unit, this distance can be the size of a specific character, the line height, or the size of the viewport. Style sheets that use relative length units can more easily scale from one output environment to another.

> **Note:**
> Child elements do not inherit the relative values as specified for their parent; they inherit the computed values.

## Relative length units

CSS relative length units are based on font, container, or viewport sizes.

### Relative length units based on font

Font lengths define the `<length>` value in terms of the size of a particular character or font attribute in the font currently in effect in an element or its parent.

> **Note:**
> These units, especially `em` and the root relative `rem`, are often used to create scalable layouts, which maintain the vertical rhythm of the page even when the user changes the font size.

- `cap`
    Equal to the "cap height" (nominal height of capital letters) of the element's `font`.
- `ch`
    Represents the width or, more precisely, the advance measure of the glyph `0` (zero, the Unicode character U+0030) in the element's `font`.
    In cases where determining the measure of the `0` glyph is impossible or impractical, it must be assumed to be `0.5em` wide by `1em` tall.
- `em`
    Represents the calculated `font-size` of the element. If used on the `font-size` property itself, it represents the _inherited_ font-size of the element.
- `ex`
    Equal to the x-height of the element's `font`. In fonts with the `x` letter, this is generally the height of lowercase letters in the font; `1ex ≈ 0.5em` in many fonts.
- `ic`
    Represents the used advance measure of the "水" glyph (CJK water ideograph, U+6C34), found in the font used to render it.
- `lh`
    Equal to the computed value of the `line-height` property of the element on which it is used, converted to an absolute length. This unit enables length calculations based on the theoretical size of an ideal empty line. However, the size of actual line boxes may differ based on their content.

### Relative length units based on root element's font

Root element font relative length units define the `<length>` value in terms of the size of a particular character or font attribute of the root element:

- `rcap`
    Equal to the "cap height" (nominal height of capital letters) of the root element's `font`.
- `rch`
    Equal to the width or the advance measure of the glyph `0` (zero, the Unicode character U+0030) in the root element's `font`.
- `rem`
    Represents the `font-size` of the root element (typically `<html>`). When used within the root element `font-size`, it represents its initial value. A common browser default is `16px`, but user-defined preferences may modify this.
- `rex`
    Equal to the x-height of the root element's `font`.
- `ric`
    Equal to the value of `ic` unit on the root element's font.
- `rlh`
    Equal to the value of `lh` unit on the root element's font. This unit enables length calculations based on the theoretical size of an ideal empty line. However, the size of actual line boxes may differ based on their content.

### Relative length units based on viewport

The **viewport-percentage length units** are based on four different viewport sizes: small, large, dynamic, and default. The allowance for the different viewport sizes is in response to browser interfaces expanding and retracting dynamically and hiding and showing the content underneath.

- **Small viewport units**
    When you want the smallest possible viewport in response to browser interfaces expanding dynamically, you should use the small viewport size. The small viewport size allows the content you design to fill the entire viewport when browser interfaces are expanded. Choosing this size might also possibly leave empty spaces when browser interfaces retract.

    For example, an element that is sized using viewport-percentage units based on the small viewport size, the element will fill the screen perfectly without any of its content being obscured when all the dynamic browser interfaces are shown. When those browser interfaces are hidden, however, there might be extra space visible around the element. Therefore, the small viewport-percentage units are "safer" to use in general, but might not produce the most attractive layout after a user starts interacting with the page.

    The small viewport size is represented by the `sv` prefix and results in the `sv*` viewport-percentage length units. The sizes of the small viewport-percentage units are fixed, and therefore stable, unless the viewport itself is resized.

- **Large viewport units**
    When you want the largest possible viewport in response to browser interfaces retracting dynamically, you should use the large viewport size. The large viewport size allows the content you design to fill the entire viewport when browser interfaces are retracting. You need to be aware that the content might get hidden when browser interfaces expand.

    For example, on mobile phones where screen real-estate is at a premium, browsers often hide part or all of the title and address bar after a user starts scrolling the page. When an element is sized using a viewport-percentage unit based on the large viewport size, the content of the element will fill the entire visible page when these browser interfaces are hidden. However, when these retractable browser interfaces are shown, they can hide the content that is sized or positioned using the _large_ viewport-percentage units.

    The large viewport unit is represented by the `lv` prefix and results in the `lv*` viewport-percentage units. The sizes of the large viewport-percentage units are fixed and therefore stable, unless the viewport itself is resized.

- **Dynamic viewport units**
    When you want the viewport to be automatically sized in response to browser interfaces dynamically expanding or retracting, you can use the dynamic viewport size. The dynamic viewport size allows the content you design to fit exactly within the viewport, irrespective of the presence of dynamic browser interfaces.

    The dynamic viewport unit is represented by the `dv` prefix and results in the `dv*` viewport-percentage units. The sizes of the dynamic viewport-percentage units are not stable, even when the viewport itself is unchanged.

    > **Note:**
    > While the dynamic viewport size can give you more control and flexibility, using viewport-percentage units based on the dynamic viewport size can cause the content to resize while a user is scrolling a page. This can lead to degradation of the user interface and cause a performance hit.

- **Default viewport units**
    The default viewport size is defined by the browser. The behavior of the resulting viewport-percentage unit could be equivalent to the viewport-percentage unit based on the small viewport size, the large viewport size, an intermediate size between the two, or the dynamic viewport size.

    > **Note:**
    > For example, a browser might implement the default viewport-percentage unit for height (`vh`) that is equivalent to the large viewport-percentage height unit (`lvh`). If so, this could obscure content on a full-page display while the browser interface is expanded. Currently, all default viewport units (`vh`, `vw`, etc.) are equivalent to their large viewport counterparts (`lvh`, `lvw`, etc.).

Viewport-percentage lengths define `<length>` values in percentage relative to the size of the initial containing block, which in turn is based on either the size of the viewport or the page area, i.e., the visible portion of the document. When the height or width of the initial containing block is changed, the elements that are sized based on them are scaled accordingly. There is a viewport-percentage length unit variant corresponding to each of the viewport sizes, as described below.

> **Note:**
> Viewport lengths are invalid in `@page` declaration blocks.

- `vh`
    Represents a percentage of the height of the viewport's initial containing block. `1vh` is 1% of the viewport height. For example, if the viewport height is `300px`, then a value of `70vh` on a property will be `210px`.

    The respective viewport-percentage units for small, large, and dynamic viewport sizes are `svh`, `lvh`, and `dvh`. `vh` is equivalent to `lvh`, representing the viewport-percentage length unit based on the large viewport size.

- `vw`
    Represents a percentage of the width of the viewport's initial containing block. `1vw` is 1% of the viewport width. For example, if the viewport width is `800px`, then a value of `50vw` on a property will be `400px`.

    For small, large, and dynamic viewport sizes, the respective viewport-percentage units are `svw`, `lvw`, and `dvw`.
    `vw` is equivalent to `lvw`, representing the viewport-percentage length unit based on the large viewport size.

- `vmax`
    Represents in percentage the largest of `vw` and `vh`.

    For small, large, and dynamic viewport sizes, the respective viewport-percentage units are `svmax`, `lvmax`, and `dvmax`.
    `vmax` is equivalent to `lvmax`, representing the viewport-percentage length unit based on the large viewport size.

- `vmin`
    Represents in percentage the smallest of `vw` and `vh`.

    For small, large, and dynamic viewport sizes, the respective viewport-percentage units are `svmin`, `lvmin`, and `dvmin`.
    `vmin` is equivalent to `lvmin`, representing the viewport-percentage length unit based on the large viewport size.

- `vb`
    Represents the percentage of the size of the initial containing block, in the direction of the root element's block axis.

    For small, large, and dynamic viewport sizes, the respective viewport-percentage units are `svb`, `lvb`, and `dvb`, respectively.
    `vb` is equivalent to `lvb`, representing the viewport-percentage length unit based on the large viewport size.

- `vi`
    Represents a percentage of the size of the initial containing block, in the direction of the root element's inline axis.

    For small, large, and dynamic viewport sizes, the respective viewport-percentage units are `svi`, `lvi`, and `dvi`.
    `vi` is equivalent to `lvi`, representing the viewport-percentage length unit based on the large viewport size.

### Container query length units

When applying styles to a container using container queries, you can use container query length units.
These units specify a length relative to the dimensions of a query container.
Components that use units of length relative to their container are more flexible to use in different containers without having to recalculate concrete length values.

If no eligible container is available for the query, the container query length unit defaults to the small viewport unit for that axis (`sv*`).

For more information, see Container queries.

- `cqw`
    Represents a percentage of the width of the query container. `1cqw` is 1% of the query container's width. For example, if the query container's width is `800px`, then a value of `50cqw` on a property will be `400px`.

- `cqh`
    Represents a percentage of the height of the query container. `1cqh` is 1% of the query container's height. For example, if the query container's height is `300px`, then a value of `10cqh` on a property will be `30px`.

- `cqi`
    Represents a percentage of the inline size of the query container. `1cqi` is 1% of the query container's inline size. For example, if the query container's inline size is `800px`, then a value of `50cqi` on a property will be `400px`.

- `cqb`
    Represents a percentage of the block size of the query container. `1cqb` is 1% of the query container's block size. For example, if the query container's block size is `300px`, then a value of `10cqb` on a property will be `30px`.

- `cqmin`
    Represents a percentage of the smaller value of either the query container's inline size or block size. `1cqmin` is 1% of the smaller value of either the query container's inline size or block size. For example, if the query container's inline size is `800px` and its block size is `300px`, then a value of `50cqmin` on a property will be `150px`.

- `cqmax`
    Represents a percentage of the larger value of either the query container's inline size or block size. `1cqmax` is 1% of the larger value of either the query container's inline size or block size. For example, if the query container's inline size is `800px` and its block size is `300px`, then a value of `50cqmax` on a property will be `400px`.
