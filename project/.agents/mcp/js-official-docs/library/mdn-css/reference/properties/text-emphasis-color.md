---
title: "`text-emphasis-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-emphasis-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-emphasis-color` CSS property

The **`text-emphasis-color`** CSS property sets the color of emphasis marks. This value can also be set using the `text-emphasis` shorthand.

```css
text-emphasis-color: currentColor;
```

```css
text-emphasis-color: red;
```

```css
text-emphasis-color: rgb(90 200 160 / 0.8);
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
  text-emphasis: filled;
}
```

## Syntax

```css
/* Initial value */
text-emphasis-color: currentColor;

/* <color> */
text-emphasis-color: #555555;
text-emphasis-color: blue;
text-emphasis-color: rgb(90 200 160 / 80%);
text-emphasis-color: transparent;

/* Global values */
text-emphasis-color: inherit;
text-emphasis-color: initial;
text-emphasis-color: revert;
text-emphasis-color: revert-layer;
text-emphasis-color: unset;
```

### Values

This property is specified as one `<color>` value:

- `<color>`
    Defines the color of the emphasis marks. If no color is present, it defaults to `currentColor`.

## Examples

### Emphasis with a color and custom character

#### HTML

```html
<p>Here's an example:</p>

<em>This has emphasis marks!</em>
```

#### CSS

```css
em {
  text-emphasis-color: green;
  text-emphasis-style: "*";
}
```

#### Result

## See also

- The `<color>` data type
- The other emphasis mark related properties: `text-emphasis-style`, `text-emphasis`, and `text-emphasis-position`.
- Other color-related properties: `color`, `background-color`, `border-color`, `outline-color`, `text-shadow`, `caret-color`, and `column-rule-color`
