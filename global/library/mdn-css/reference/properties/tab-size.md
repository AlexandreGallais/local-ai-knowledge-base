---
title: "`tab-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/tab-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `tab-size` CSS property

The **`tab-size`** CSS property is used to customize the width of tab characters (U+0009).

```css
tab-size: 10px;
```

```css
tab-size: 16px;
```

```css
tab-size: 24px;
```

```css
tab-size: 4;
```

```html
<section id="default-example">
  <pre id="example-element">&#9;123</pre>
</section>
```

```css
#example-element {
  border: 1px solid;
}
```

## Syntax

```css
/* <number> values */
tab-size: 4;
tab-size: 0;

/* <length> values */
tab-size: 10px;
tab-size: 2em;

/* Global values */
tab-size: inherit;
tab-size: initial;
tab-size: revert;
tab-size: revert-layer;
tab-size: unset;
```

### Values

- `<number>`
    A multiple of the advance width of the space character (U+0020) to be used as the width of tabs. Must be non-negative. The advance width means the distance a cursor or a print head moves before printing the next character.
- `<length>`
    The width of tabs. Must be non-negative.

## Examples

### Expanding by character count

```css
pre {
  tab-size: 4; /* Set tab size to 4 characters wide */
}
```

### Collapse tabs

```css
pre {
  tab-size: 0; /* Remove indentation */
}
```

### Default tab size vs custom sizes

This example compares a default tab size with a custom tab size. Note that `white-space` is set to `pre` to prevent the tabs from collapsing.

#### HTML

```html
<p>no tab</p>
<p>&#0009;default tab size of 8 characters wide</p>
<p class="custom-number">&#0009;custom tab size of 3 characters wide</p>
<p>&nbsp;&nbsp;&nbsp;3 spaces, equivalent to the custom tab size</p>
<p class="custom-length">&#0009;custom tab size of 50px wide</p>
```

#### CSS

```css
body {
  border: 1px solid red;
  margin: 1rem;
}
```

```css
p {
  white-space: pre;
}

.custom-number {
  tab-size: 3;
}

.custom-length {
  tab-size: 50px;
}
```

#### Result

## See also

- `white-space`
