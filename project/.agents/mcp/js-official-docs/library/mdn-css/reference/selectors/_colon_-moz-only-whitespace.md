---
title: "`:-moz-only-whitespace` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-only-whitespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-only-whitespace` CSS pseudo-class

> **Note:**
> In Selectors Level 4, the `:empty` selector was changed to act like `:-moz-only-whitespace`, but no browser currently supports this yet.

The **`:-moz-only-whitespace`** CSS pseudo-class matches elements that only contain text nodes that only contain whitespace. (This includes elements with empty text nodes and elements with no child nodes.)

## Syntax

```css
:-moz-only-whitespace {
  /* ... */
}
```

## Examples

### Basic :<example-value> example

#### HTML

```html
<div> </div>
```

#### CSS

```css
div {
  border: 4px solid red;
}

:-moz-only-whitespace {
  border-color: lime;
}
```

#### Result

## Specifications

Briefly defined as `:blank` in Selectors Level 4, but then the functionality was merged into `:empty` and `:blank` redefined to mean empty ``.

## See also

- `:blank`
- `:empty`
