---
title: "`any-hover` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/any-hover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `any-hover` CSS media feature

The **`any-hover`** CSS media feature can be used to test whether _any_ available input mechanism can hover over elements.

## Syntax

The `any-hover` feature is specified as a keyword value chosen from the list below.

- `none`
    None of the available input mechanism(s) can hover conveniently, or there is no pointing input mechanism.
- `hover`
    One or more available input mechanisms can conveniently hover over elements.

## Examples

### Testing whether input methods can hover

#### HTML

```html
<a href="#">Try hovering over me!</a>
```

#### CSS

```css
@media (any-hover: hover) {
  a:hover {
    background: yellow;
  }
}
```

#### Result

## See also

- the `hover` media feature
