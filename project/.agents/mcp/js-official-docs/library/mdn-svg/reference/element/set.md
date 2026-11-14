---
title: "<set>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <set>

The **`<set>`** SVG element provides a method of setting the value of an attribute for a specified duration.

It supports all attribute types, including those that cannot reasonably be interpolated, such as string and boolean values. For attributes that can be reasonably be interpolated, the `<animate>` is usually preferred.

> **Note:**
> The `<set>` element is non-additive. The `additive` and `accumulate` attributes are not allowed, and will be ignored if specified.

## Attributes

- `to`
    This attribute defines the value to be applied to the target attribute for the duration of the animation. The value must match the requirements of the target attribute.
    _Value type_: **\<anything>**; _Default value_: none; _Animatable_: **no**

## DOM Interface

This element implements the `SVGSetElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <style>
    rect {
      cursor: pointer;
    }
    .round {
      rx: 5px;
      fill: green;
    }
  </style>

  <rect id="me" width="10" height="10">
    <set attributeName="class" to="round" begin="me.click" dur="2s" />
  </rect>
</svg>
```

## See also

- `attributeName` attribute
- Animation timing attributes, including `begin`, `dur`, `end`, `min`, `max`, `restart`, `repeatCount`, `repeatDur`, and `fill`.
- `<animate>`
