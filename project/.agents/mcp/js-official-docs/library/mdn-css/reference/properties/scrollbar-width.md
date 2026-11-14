---
title: "`scrollbar-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scrollbar-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scrollbar-width` CSS property

The **`scrollbar-width`** property allows the author to set the desired thickness of an element's scrollbars when they are shown.

The purpose of the `scrollbar-width` is to optimize the space occupied by the scrollbar on a page or element; the purpose is not related to scrollbar aesthetics. The `scrollbar-width` predefined keyword values indicate to the user agent whether a normal or smaller scrollbar should be rendered. Avoid using `none`, as hiding a scrollbar negatively impacts accessibility.

> **Note:**
> For elements that are scrollable only via programmatic means and not by direct user interaction, use the `overflow` property with a value of `hidden` rather than `scrollbar-width: none`.

> **Note:**
> Browsers ignore the non-standard `::-webkit-scrollbar` family of pseudo-elements on any element whose _computed_ `scrollbar-width` value is anything other than `auto`.
> Unlike `scrollbar-color`, `scrollbar-width` is not inherited, so an ancestor's value doesn't affect its descendants.
> Setting `scrollbar-width: auto` on an element restores its `::-webkit-scrollbar-*` styling.
> See Adding a fallback for scrollbar styles.

## Syntax

```css
/* Keyword values */
scrollbar-width: auto;
scrollbar-width: thin;
scrollbar-width: none;

/* Global values */
scrollbar-width: inherit;
scrollbar-width: initial;
scrollbar-width: revert;
scrollbar-width: revert-layer;
scrollbar-width: unset;
```

### Values

- `auto`
    The default scrollbar width for the platform.
- `thin`
    A thin scrollbar width variant on platforms that provide that option, or a thinner scrollbar than the default platform scrollbar width.
- `none`
    No scrollbar shown, however the element will still be scrollable.

> **Note:**
> User Agents must apply any `scrollbar-width` value set on the root element to the viewport.

## Accessibility

Use this property with caution — setting `scrollbar-width` to `thin` or `none` can make content hard or impossible to scroll if the author does not provide an alternative scrolling mechanism. While swiping gestures or mouse wheels can enable scrolling on such content, some devices have no scroll alternative.

WCAG criterion 2.1.1 (Keyboard) has been in place for a long time to advise on basic <example-value> accessibility, and this should include scrolling of content areas. And introduced in WCAG 2.1, criterion 2.5.5 (Target Size) advises that touch targets should be at least 44px in width and height (although the problem is compounded on high-resolution screens; thorough testing is advised).

- MDN Understanding WCAG, Guideline 2.1 explanations
- MDN Understanding WCAG, Guideline 2.5 explanations
- Understanding Success Criterion 2.1.1 | W3C Understanding WCAG 2.1
- Understanding Success Criterion 2.5.5 | W3C Understanding WCAG 2.1

## Examples

### Sizing overflow scrollbars

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
  scrollbar-width: thin;
}
```

#### Result

## See also

- CSS overflow module
- CSS scrollbars styling module
- `overflow`
- `scrollbar-gutter`
- `scrollbar-color`
