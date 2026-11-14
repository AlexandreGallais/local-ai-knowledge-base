---
title: "attributeType"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/attributetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# attributeType

The **`attributeType`** attribute specifies the namespace in which the target attribute and its associated values are defined.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateTransform>`
- `<set>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="0"
      to="50"
      dur="5s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

## Usage notes

       | Value
       | `CSS` | `XML` | `auto`

       | Default value
       | `auto`

       | Animatable
       | No

- `CSS`
    This value specifies that the value of `attributeName` is the name of a CSS property defined as animatable.
- `XML`
    This value specifies that the value of `attributeName` is the name of an XML attribute defined as animatable in the default XML namespace for the target element.
- `auto`
    This value specifies that the implementation should match the `attributeName` to an attribute for the target element. User agents first search through the list of CSS properties for a matching property name, and if none is found, search the default XML namespace for the element.

## See also

- SVG animation with SMIL
