---
title: "`text-size-adjust` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-size-adjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-size-adjust` CSS property

The **`text-size-adjust`** CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.

Because many websites have not been developed with small devices in mind, mobile browsers differ from desktop browsers in the way they render web pages. Instead of laying out pages at the width of the device screen, they lay them out using a viewport that is much wider, usually 800 or 1000 pixels. To map the extra-wide layout back to the original device size, they either show only part of the whole render or scale the viewport down to fit.

Since text that has been scaled down to fit a mobile screen may be very small, many mobile browsers apply a text inflation algorithm to enlarge the text to make it more readable. When an element containing text uses 100% of the screen's width, the algorithm increases its text size, but without modifying the layout. The `text-size-adjust` property allows web authors to disable or modify this behavior, as web pages designed with small screens in mind do not need it.

## Syntax

```css
/* Keyword values */
text-size-adjust: none;
text-size-adjust: auto;

/* <percentage> value */
text-size-adjust: 80%;

/* Global values */
text-size-adjust: inherit;
text-size-adjust: initial;
text-size-adjust: revert;
text-size-adjust: revert-layer;
text-size-adjust: unset;
```

### Values

This property is specified as one of the following values:

- `none`
    Disables the browser's inflation algorithm.
- `auto`
    Enables the browser's inflation algorithm. This value is used to cancel a `none` value previously set with CSS.
- `<percentage>`
    Enables the browser's inflation algorithm, specifying a percentage value with which to increase the font size.

## Examples

### Basic <example-value> usage

As hinted at above, on a properly designed responsive site the `text-size-adjust` behavior is not needed, so developers can elect to turn it off by specifying a value of none:

```css
p {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
```

## See also

- Apple's documentation (2016)
- Google Chrome behavior description (2014)
- Gecko's behavior description, by L. David Baron (2011)
