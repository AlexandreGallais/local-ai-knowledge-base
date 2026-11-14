---
title: "`text-box` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-box/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-box` CSS property

The **`text-box`** CSS shorthand property corresponds to the `text-box-trim` and `text-box-edge` properties, which together specify the amount of space to trim from the block-start edge and block-end edge of a text element's block container.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `text-box-trim`
- `text-box-edge`

## Syntax

```css
/* Single keyword */
text-box: normal;

/* One text-box-edge keyword */
text-box: trim-start text;
text-box: trim-both text;

/* Two text-box-edge keywords */
text-box: trim-start cap alphabetic;
text-box: trim-both ex text;

/* Global values */
text-box: inherit;
text-box: initial;
text-box: revert;
text-box: revert-layer;
text-box: unset;
```

### Values

The `text-box` value can be composed of a `text-box-trim` value and a `text-box-edge` value separated by a space. See those pages for value descriptions.

The `text-box` property can also take a keyword of `normal`, which is equivalent to `text-box: none auto;`

If `text-box-trim` is omitted, it is set to `trim-both`. If `text-box-edge` is omitted, it is set to `auto`.

## Description

The height of text-only content is relative to the height of the font. In digital font files, the height contains all characters, including capital letters, ascenders, descenders, etc. Different fonts have different base line-heights, meaning that lines of text with the same `font-size` will produce line boxes of differing heights, affecting the appearance of spacing between lines.

The `text-box` properties enable trimming off extra spacing from the block-start edge and block-end edge of a text element's block container, which can include the leading at the text's block-start edge and block-end edges, and the spacing defined inside the font (as described above). This makes it much easier to control text spacing in the block direction.

## Examples

### Basic `text-box` usage

In the following example, we have two `` elements with classes of `one` and `two`.

We apply a `text-box` value of `trim-end cap alphabetic` to the first paragraph. The `text-box-edge` value of `cap alphabetic` specifies trimming the over edge to the top of the capital letters and the under edge flush with the text baseline. Because the `text-box-trim` value is set to `trim-end`, only the under edge of the paragraph is trimmed.

We apply a `text-box` value of `trim-both ex alphabetic` to the second paragraph. The `text-box-edge` value of `ex alphabetic` specifies trimming the over edge to the font's x-height (the top edge of the short lower-case letters) and the under edge flush with the text baseline. Because the `text-box-trim` value is set to `trim-both`, both the over _and_ under edge of the paragraph are trimmed.

```html
<p class="one">This is .one</p>

<p class="two">This is .two</p>
```

```css
html {
  font-family: sans-serif;
  height: 100%;
}

body {
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
}

p {
  margin: 0;
  font-size: 6rem;
  font-weight: bold;
}
```

```css
.one {
  text-box: trim-end cap alphabetic;
}

.two {
  text-box: trim-both ex alphabetic;
}

p {
  border-top: 5px solid magenta;
  border-bottom: 5px solid magenta;
}
```

#### Result

The output is as follows. Note how we've included a top and bottom border on each paragraph, so that you can see how the space has been trimmed in each case.

## See also

- `text-box-edge`, `text-box-trim`
- `<text-edge>` data type
- CSS inline layout module
- CSS text-box-edge on developer.chrome.com (2025)
