---
title: "`text-wrap-mode` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-wrap-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-wrap-mode` CSS property

The **`text-wrap-mode`** CSS property controls whether the text inside an element is wrapped.

```css
text-wrap-mode: wrap;
```

```css
text-wrap-mode: nowrap;
```

```html
<section class="default-example" id="default-example">
  <div class="whole-content-wrapper">
    <p>Edit the text in the box:</p>
    <div class="transition-all" id="example-element">
      <p contenteditable>
        You can edit this lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptatem aut cum eum id quos est text.
      </p>
    </div>
  </div>
</section>
```

```css
.whole-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#example-element {
  border: 1px solid #c5c5c5;
  width: 250px;
}
```

## Syntax

```css
/* Keyword values */
text-wrap-mode: wrap;
text-wrap-mode: nowrap;

/* Global values */
text-wrap-mode: inherit;
text-wrap-mode: initial;
text-wrap-mode: revert;
text-wrap-mode: revert-layer;
text-wrap-mode: unset;
```

## Values

The `text-wrap-mode` property is specified as one of the following keyword values:

- `wrap`
    Text is wrapped across lines at appropriate characters (for example spaces, in languages like English that use space separators) to minimize overflow. This is the default value.
- `nowrap`
    Text does not wrap across lines. It will overflow its containing element rather than breaking onto a new line.

## Description

The `text-wrap-mode` property can be used to control text wrapping inside an element. The different values provide alternate ways of wrapping the content of a block element, specifying whether lines may wrap at unforced soft wrap opportunities (`wrap`), or not (`nowrap`).

When set to `nowrap`, text will overflow rather than break onto multiple lines. As the `overflow` property defaults to `visible`, when content is larger than the container's inline-size, it will overflow in the inline direction. To enable scrolling in the inline direction, instead of overflow, set the `overflow-inline` property to `auto` or `scroll`. To ensure the container at least as wide as the longest word, set the `min-inline-size` to `min-content`.

When set to `wrap`, content flows onto new lines as necessary, wrapping at word break opportunities, such as `` and hyphens, and other language-specific soft-wrap opportunities. The property does not prevent non-breakable pieces of content from overflowing in the inline direction if larger than the container's inline-size.

The `text-wrap-mode` is part of two shorthand properties. The `text-wrap-mode`, along with the `white-space-collapse` property, can be declared using the `white-space` shorthand. It can also be set and reset, along with the `text-wrap-style` property, using the `text-wrap` shorthand.

## Examples

### Basic usage

In this example, we compare the effect of the `text-wrap-mode` property's two values.

#### HTML

We include two `` elements that are the same except for their class names.

```html
<div class="wrap">CSS IS AWESOME</div>
<div class="nowrap">CSS IS AWESOME</div>
```

#### CSS

We apply the same styles to both containers, limiting their width.

```css
div {
  font-family: "Arial", sans-serif;
  font-weight: bold;
  font-size: 4rem;
  box-sizing: border-box;
  border: 0.25rem solid black;
  padding: 0 4px;
  width: 14rem;
  margin: 1rem;
}
```

We give the examples different `text-wrap-mode` values:

```css
.wrap {
  text-wrap-mode: wrap;
}
.nowrap {
  text-wrap-mode: nowrap;
}
```

#### Result

In the `wrap` example, the content flows over to the next line so that it fits in the box. "Awesome" is wider than the containing box, and contains no soft break opportunities, so it overflows.

In the `nowrap` example, the content does **not** flow to the next line as the content has been specifically set to not wrap, so it is all on one line, overflowing the container.

## See also

- `text-wrap`
- `text-wrap-style`
- `hyphens`
- `white-space`
- `overflow`
- CSS text module
- CSS overflow module
