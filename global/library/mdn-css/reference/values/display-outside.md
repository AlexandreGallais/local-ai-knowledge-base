---
title: "`<display-outside>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/display-outside/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<display-outside>` CSS type

The `<display-outside>` keywords specify the element's outer `display` type, which is essentially its role in flow layout. These keywords are used as values of the `display` property, and can be used for legacy purposes as a single keyword, or as defined in the Level 3 specification alongside a value from the `<display-inside>` keywords.

## Syntax

Valid `<display-outside>` values:

- `block`
    The element generates a block element box, generating line breaks both before and after the element when in the normal flow.
- `inline`
    The element generates one or more inline element boxes that do not generate line breaks before or after themselves. In normal flow, the next element will be on the same line if there is space.

> **Note:**
> When browsers encounter a display property with only an **outer** `display` value (e.g., `display: block` or `display: inline`), the inner value defaults to `flow` (e.g., `display: block flow` and `display: inline flow`).
> This is backwards-compatible with single-keyword syntax.

## Examples

In the following example, span elements (normally displayed as inline elements) are set to `display: block` and so break onto new lines and expand to fill their container in the inline dimension.

### HTML

```html
<span>span 1</span> <span>span 2</span>
```

### CSS

```css
span {
  display: block;
  border: 1px solid rebeccapurple;
}
```

## See also

- `display`
  - `<display-inside>`
  - `<display-listitem>`
  - `<display-internal>`
  - `<display-box>`
  - `<display-legacy>`

- Block and inline layout in normal flow
- Introduction to formatting contexts
