---
title: "`text-decoration-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-decoration-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-decoration-style` CSS property

The **`text-decoration-style`** CSS property sets the style of the lines specified by `text-decoration-line`. The style applies to all lines that are set with `text-decoration-line`.

```css
text-decoration-style: solid;
```

```css
text-decoration-style: double;
```

```css
text-decoration-style: dotted;
```

```css
text-decoration-style: dashed;
```

```css
text-decoration-style: wavy;
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

#example-element {
  text-decoration-line: underline;
}
```

If the specified decoration has a specific semantic meaning, like a line-through line meaning that some text has been deleted, authors are encouraged to denote this meaning using an HTML tag, like `` or ``. As browsers can disable styling in some cases, the semantic meaning won't disappear in such a situation.

When setting multiple line-decoration properties at once, it may be more convenient to use the `text-decoration` shorthand property instead.

## Syntax

```css
/* Keyword values */
text-decoration-style: solid;
text-decoration-style: double;
text-decoration-style: dotted;
text-decoration-style: dashed;
text-decoration-style: wavy;

/* Global values */
text-decoration-style: inherit;
text-decoration-style: initial;
text-decoration-style: revert;
text-decoration-style: revert-layer;
text-decoration-style: unset;
```

### Values

- solid
    Draws a single line.
- double
    Draws a double line.
- dotted
    Draws a dotted line.
- dashed
    Draws a dashed line.
- wavy
    Draws a wavy line.
- \-moz-none
    Draws no line. Use `text-decoration-line: none` instead.

## Examples

### Setting a wavy underline

The following creates a red wavy underline:

#### HTML

```html
<p class="wavy">This text has a wavy red line beneath it.</p>
```

#### CSS

```css
.wavy {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: red;
}
```

#### Results

## See also

- When setting multiple line-decoration properties at once, it may be more convenient to use the `text-decoration` shorthand property instead.
- `text-decoration-line`
- `text-decoration-color`
- `text-decoration-thickness`
- `text-underline-offset`
