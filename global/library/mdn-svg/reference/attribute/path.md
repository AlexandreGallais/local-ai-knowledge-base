---
title: "path"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/path/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# path

The **`path`** attribute has two different meanings, either it defines a text path along which the characters of a text are rendered, or a motion path along which a referenced element is animated.

You can use this attribute with the following SVG elements:

- `<animateMotion>`
- `<textPath>`

## animateMotion

For `<animateMotion>`, `path` defines the motion path, expressed in the same format and interpreted the same way as the `d` geometric property for the `` element. The effect of a motion path animation is a translation along the x- and y-axes of the current user coordinate system by the x and y values computed over time.

       | Value
       | `&#x3C;path-data>`

       | Default value
       | None

       | Animatable
       | No

- ``
    This value defines the motion path along which the referenced element is animated. For detailed information about the commands that can be used, see the explanation for the `d` attribute.

## textPath

For `<textPath>`, `path` defines the path onto which the glyphs of a `<text>` element will be rendered. An empty string indicates that there is no path data for the element. This means that the text within the `<textPath>` element does not render or contribute to the bounding box of the `<text>` element. If the attribute is not specified, the path specified in `href` is used instead.

       | Value
       | `&#x3C;path-data>`

       | Default value
       | Path specified in `href`

       | Animatable
       | Yes

- ``
    This value defines the text path along which the glyphs of the `<text>` element are aligned. For detailed information about the commands that can be used, see the explanation for the `d` attribute.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    id="MyPath"
    fill="none"
    stroke="silver"
    d="M10,90 Q90,90 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50" />

  <text>
    <textPath
      path="M10,90 Q90,90 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50">
      Quick brown fox jumps over the lazy dog.
    </textPath>
  </text>
</svg>
```
