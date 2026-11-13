---
title: "`text-decoration-line` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-decoration-line/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-decoration-line` CSS property

The **`text-decoration-line`** CSS property sets the kind of decoration that is used on text in an element, such as an underline or overline.

When setting multiple line-decoration properties at once, it may be more convenient to use the `text-decoration` shorthand property instead.

```css
text-decoration-line: none;
```

```css
text-decoration-line: underline;
```

```css
text-decoration-line: overline;
```

```css
text-decoration-line: line-through;
```

```css
text-decoration-line: grammar-error;
```

```css
text-decoration-line: spelling-error;
```

```css
text-decoration-line: underline overline;
```

```css
text-decoration-line: underline line-through;
```

```html
<section id="default-example">
  <p>
    I'd far rather be
    <span class="transition-all" id="example-element">happy than right</span>
    any day.
  </p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
}
```

## Syntax

```css
/* Single keyword */
text-decoration-line: none;
text-decoration-line: underline;
text-decoration-line: overline;
text-decoration-line: line-through;
text-decoration-line: blink;
text-decoration-line: spelling-error;
text-decoration-line: grammar-error;

/* Multiple keywords */
text-decoration-line: underline overline; /* Two decoration lines */
text-decoration-line: overline underline line-through; /* Multiple decoration lines */

/* Global values */
text-decoration-line: inherit;
text-decoration-line: initial;
text-decoration-line: revert;
text-decoration-line: revert-layer;
text-decoration-line: unset;
```

### Values

This property is specified either as `none` or a space-separated list of keyword values chosen from the list below:

- `none`
    Produces no text decoration.
- `underline`
    Each line of text has a decorative line beneath it.
- `overline`
    Each line of text has a decorative line above it.
- `line-through`
    Each line of text has a decorative line going through its middle.
- `blink`
    The text blinks (alternates between visible and invisible). Conforming user agents may not blink the text. This value is **deprecated** in favor of CSS animations.
- `spelling-error`
    Each line of text uses the user agents' method of highlighting spelling mistakes, which is a dotted red line in most browsers.
- `grammar-error`
    Each line of text uses the user agents' method of highlighting grammar mistakes, which is a dotted green line in most browsers.

> **Note:**
> When using `spelling-error` and `grammar-error` values, the browser disregards the other properties in the `text-decoration` shorthand (such as `text-underline-position`, `color`, or `stroke`).

## Examples

### Basic <example-value>

```html
<p class="wavy">Here's some text with wavy red underline!</p>
<p class="both">This text has lines both above and below it.</p>
```

```css
.wavy {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: red;
}

.both {
  text-decoration-line: underline overline;
}
```

### Errors example

In this example, the first paragraph contains a spelling mistake and uses the browser's styling for spelling errors on the misspelled word. The second paragraph uses the browser's styling for grammar errors. There is no styling change in browsers that do not support these `text-decoration-line` values.

```html
<p>This text contains a <span class="spelling">speling</span> mistake.</p>
<p class="grammar">This text contain grammatical errors.</p>
```

```css
.spelling {
  text-decoration-line: spelling-error;
}

.grammar {
  text-decoration-line: grammar-error;
}
```

## See also

- When setting multiple line-decoration properties at once, it may be more convenient to use the `text-decoration` shorthand property instead, which also includes:
  - `text-decoration-style`
  - `text-decoration-color`
  - `text-decoration-thickness`
- `text-underline-offset`
- `::spelling-error`
- `::grammar-error`
