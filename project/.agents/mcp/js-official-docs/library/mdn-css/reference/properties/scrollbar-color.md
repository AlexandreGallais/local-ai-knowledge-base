---
title: "`scrollbar-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scrollbar-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scrollbar-color` CSS property

The **`scrollbar-color`** CSS property sets the color of the scrollbar track and thumb.

The **track** refers to the background of the scrollbar, which is generally fixed regardless of the scrolling position.

The **thumb** refers to the moving part of the scrollbar, which usually floats on top of the track.

When `scrollbar-color` value is set on the document's root element, the values are applied to the viewport scrollbars.

> **Note:**
> Browsers ignore the non-standard `::-webkit-scrollbar` family of pseudo-elements on any element whose _computed_ `scrollbar-color` value is anything other than `auto`.
> Because `scrollbar-color` is inherited, this includes elements that don't set it themselves but inherit a non-`auto` value from an ancestor.
> Setting `scrollbar-color: auto` on such an element restores its `::-webkit-scrollbar-*` styling if it was previously removed by a `scrollbar-color` setting on an ancestor.
> See Adding a fallback for scrollbar styles.

## Syntax

```css
/* Keyword value */
scrollbar-color: auto;

/* <color> values */
scrollbar-color: rebeccapurple green; /* Two valid colors.
The first applies to the thumb of the scrollbar, the second to the track. */

/* Global values */
scrollbar-color: inherit;
scrollbar-color: initial;
scrollbar-color: revert;
scrollbar-color: revert-layer;
scrollbar-color: unset;
```

### Values

- `<scrollbar-color>`
    Defines the color of the scrollbar.

           | `auto`
           |
            Default platform rendering for the track portion of the scrollbar, in
            the absence of any other related scrollbar color properties.

           | `&#x3C;color> &#x3C;color>`
           |
            Applies the first color to the scrollbar thumb, the second to the
            scrollbar track.

> **Note:**
> `@media (forced-colors: active)` sets `scrollbar-color` to `auto`.

## Accessibility

When using `scrollbar-color` property with specific color values, authors should ensure the specified colors have enough contrast between them. For keyword values, UAs should ensure the colors they use have enough contrast. See Techniques for WCAG 2.0: G183: Using a contrast ratio of 3:1.

## Examples

### Coloring overflow scrollbars

#### HTML

```html
<div class="scroller">
  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
  daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens
  corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts
  fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber
  earthnut pea peanut soko zucchini.
</div>
```

#### CSS

```css
.scroller {
  width: 300px;
  height: 100px;
  overflow-y: scroll;
  scrollbar-color: #000077 #bada55;
}
```

#### Result

## See also

- CSS overflow module
- CSS scrollbars styling module
- `overflow`
- `scrollbar-gutter`
- `scrollbar-width`
