---
title: "`overflow-inline` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/overflow-inline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overflow-inline` CSS media feature

The **`overflow-inline`** CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the inline axis.

> **Note:**
> The `overflow-inline` property does not determine whether overflow occurs; rather, it reveals the device's handling of such overflow. Typically, on screens in most browsers, the behavior will be "scroll": when content exceeds the available horizontal space, the device allows you to scroll to access the overflowed content.

## Syntax

The `overflow-inline` feature is specified as a keyword value chosen from the list below.

- `none`
    Content that overflows the inline axis is not displayed.
- `scroll`
    Content that overflows the inline axis can be seen by scrolling to it.

## Examples

### HTML

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac turpis
  eleifend, fringilla velit ac, aliquam tellus. Vestibulum ante ipsum primis in
  faucibus orci luctus et ultrices posuere cubilia Curae; Nunc velit erat,
  tempus id rutrum sed, dapibus ut urna. Integer vehicula nibh a justo imperdiet
  rutrum. Nam faucibus pretium orci imperdiet sollicitudin. Nunc id facilisis
  dui. Proin elementum et massa et feugiat. Integer rutrum ullamcorper eleifend.
  Proin sit amet tincidunt risus. Sed nec augue congue eros accumsan tincidunt
  sed eget ex.
</p>
```

### CSS

```css
p {
  white-space: nowrap;
}

@media (overflow-inline: scroll) {
  p {
    color: red;
  }
}
```
