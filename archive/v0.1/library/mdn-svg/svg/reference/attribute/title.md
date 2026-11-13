---
title: "title"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/title/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# title

The **`title`** attribute specifies a consultative title for an SVG element. When used on a `<style>` element, it acts as an identifier used to expose and select between alternate style sheets. You can use this attribute with the following SVG elements:

- `<style>`

## Example

```html
<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
  <style title="Default Style">
    circle {
      fill: gold;
    }
  </style>
  <circle cx="10" cy="10" r="5" />
</svg>
```

## Usage notes

       | Value
       |
        `string`

       | Default value
       | `None`

       | Animatable
       | No

## See also

- `<style>`
