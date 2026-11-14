---
title: "`initial` CSS keyword"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/initial/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `initial` CSS keyword

The **`initial`** CSS keyword applies the initial (or default) value of a property to an element. It can be applied to any CSS property, including the CSS shorthand property `all`. With `all` set to `initial`, all CSS properties can be restored to their respective initial values in one go instead of restoring each one separately.

On inherited properties, the initial value may be unexpected. You should consider using the `inherit`, `unset`, `revert`, `revert-layer`, or `revert-rule` keywords instead.

## Examples

### Basic usage

In this example, we use the `initial` keyword to reset an element's `color` and `font-size` property values.

#### HTML

```html
<p>
  This text is red and large.
  <em
    >This text is in the initial color (typically black) and initial size
    (typically 16px).</em
  >
  This is red and large again.
</p>
```

#### CSS

We set `color` and `font-size` on the `` element, then set those properties to `initial` on the `` element to reset them.

```css
p {
  color: red;
  font-size: 2rem;
}

em {
  color: initial;
  font-size: initial;
}
```

#### Result

With the `initial` keyword in this example, the `color` and `font-size` values on the `em` element are restored to the initial values for `color` and `font-size`, respectively.

## See also

- `inherit`, `revert`, `revert-layer`, `revert-rule`, and `unset` keywords
- `all`
- Inheritance
