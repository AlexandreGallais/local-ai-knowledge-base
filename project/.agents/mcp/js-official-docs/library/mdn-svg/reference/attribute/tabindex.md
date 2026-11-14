---
title: "tabindex"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/tabindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# tabindex

The **`tabindex`** attribute allows you to control whether an element is focusable and to define the relative order of the element for the purposes of sequential focus navigation.

You can use this attribute with any SVG element.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
  <circle r="10" tabindex="0" fill="green" cx="60" cy="60" />
  <circle r="40" tabindex="0" fill="red" cx="60" cy="160" />
  <circle r="60" tabindex="0" fill="blue" cx="160" cy="60" />
  <circle r="20" tabindex="0" fill="black" cx="160" cy="160" />
</svg>
```

## Usage notes

       | Value
       |
        valid integer

       | Default value
       | None

       | Animatable
       | No

- valid integer
    Relative order of the element for the purposes of sequential focus navigation.

## See also

- HTML `tabindex`
