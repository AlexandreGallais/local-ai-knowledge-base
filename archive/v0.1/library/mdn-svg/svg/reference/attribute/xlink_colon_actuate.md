---
title: "xlink:actuate"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/xlink_colon_actuate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# xlink:actuate

The **`xlink:actuate`** attribute defines the timing of traversal from the source resource to the destination resource. You can use this attribute with the following SVG elements:

- ``

> **Note:**
> SVG 2 removed the need for the `xlink` namespace. The `xlink:actuate` attribute is obsolete and should not be used in modern SVG content.

> **Note:**
> While the XLink specification defines multiple values for the `xlink:actuate` attribute, its value for the SVG `` element is fixed to `onRequest`.

## Example

```html
<svg viewBox="0 0 160 20" xmlns="http://www.w3.org/2000/svg">
  <a xlink:actuate="onRequest" xlink:href="https://example.com/">
    <text x="10" y="15">MDN Web Docs</text>
  </a>
</svg>
```

## Usage notes

       | Value
       | `onLoad` | `onRequest` | `other` | `none`

       | Default value
       | `onRequest`

       | Animatable
       | No

- `onRequest`
    Traverses from the source resource to the destination resource when the user triggers an event after the source resource has loaded.
- `onLoad`
    Traverses to the destination resource immediately on the source resource load.
- `other`
    Uses behavior other than `onLoad` or `onRequest`.
- `none`
    Does not traverse to the destination resource.

## See also

- `href`
- ``
