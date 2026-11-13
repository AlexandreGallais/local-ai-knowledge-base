---
title: "xlink:href"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/xlink_colon_href/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# xlink:href

The **`xlink:href`** attribute defines a reference to a resource as a reference IRI. The exact meaning of that link depends on the context of each element using it.

> **Note:**
> SVG 2 removed the need for the `xlink` namespace, so instead of `xlink:href` you should use `href`. If you need to support earlier browser versions, the deprecated `xlink:href` attribute can be used as a fallback in addition to the `href` attribute, e.g., `<use href="some-id" xlink:href="some-id" x="5" y="5" />`.

You can use this attribute with the following SVG elements:

- ``
- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<feImage>`
- `<filter>`
- `<image>`
- `<linearGradient>`
- `<mpath>`
- `<pattern>`
- `<radialGradient>`
- `<script>`
- `<set>`
- `<textPath>`
- `<use>`

## a

For ``, `xlink:href` defines the location of the referenced object.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## animate, animateMotion, animateTransform, set

For `<animate>`, `<animateMotion>`, `<animateTransform>`, and `<set>`, `xlink:href` defines the reference to the element which is the target of this animation and which therefore will be modified over time.

The target element must be part of the current SVG document fragment.

The value must point to exactly one target element which is capable of being the target of the given animation.

If the `xlink:href` attribute is not provided, the target element will be the immediate parent element of the current animation element.

Refer to the descriptions of the individual animation elements for any restrictions on what types of elements can be targets of particular types of animations.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | No

## feImage

For `<feImage>`, `xlink:href` defines the reference to the image source.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## filter

For `<filter>`, `xlink:href` defines the reference to another `<filter>` element within the current SVG document fragment. Any attributes which are defined on the referenced `<filter>` element which are not defined on this element are inherited by this element. If this element has no defined filter nodes, and the referenced element has defined filter nodes (possibly due to its own `xlink:href` attribute), then this element inherits the filter nodes defined from the referenced `<filter>` element. Inheritance can be indirect to an arbitrary level; thus, if the referenced `<filter>` element inherits attributes or its filter node specification due to its own `xlink:href` attribute, then the current element can inherit those attributes or filter node specifications.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## image

For `<image>`, `xlink:href` defines the location of the referenced image.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## linearGradient

For `<linearGradient>`, `xlink:href` defines the reference to a different `<linearGradient>` or `<radialGradient>` element within the current SVG document fragment. Any `<linearGradient>` attributes which are defined on the referenced element which are not defined on this element are inherited by this element. If this element has no defined gradient stops, and the referenced element does (possibly due to its own `xlink:href` attribute), then this element inherits the gradient stop from the referenced element. Inheritance can be indirect to an arbitrary level; thus, if the referenced element inherits attribute or gradient stops due to its own `xlink:href` attribute, then the current element can inherit those attributes or gradient stops.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## mpath

For `<mpath>`, `xlink:href` defines the reference to the `` element which defines the motion path.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | No

## pattern

For `<pattern>`, `xlink:href` defines the reference to a different `<pattern>` element within the current SVG document fragment. Any attributes which are defined on the referenced element which are not defined on this element are inherited by this element. If this element has no children, and the referenced element does (possibly due to its own `xlink:href` attribute), then this element inherits the children from the referenced element. Inheritance can be indirect to an arbitrary level; thus, if the referenced element inherits attributes or children due to its own `xlink:href` attribute, then the current element can inherit those attributes or children.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## radialGradient

For `<radialGradient>`, `xlink:href` defines the to a different `<linearGradient>` or `<radialGradient>` element within the current SVG document fragment. Any `<radialGradient>` attributes which are defined on the referenced element which are not defined on this element are inherited by this element. If this element has no defined gradient stops, and the referenced element does (possibly due to its own `xlink:href` attribute), then this element inherits the gradient stop from the referenced element. Inheritance can be indirect to an arbitrary level; thus, if the referenced element inherits attribute or gradient stops due to its own `xlink:href` attribute, then the current element can inherit those attributes or gradient stops.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## script

For `<script>`, `xlink:href` defines a reference to an external resource containing the script code.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | No

## textPath

For `<textPath>`, `xlink:href` defines a reference to the `` element onto which the glyphs will be rendered.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## use

For `<use>`, `xlink:href` defines the location of the referenced object.

       | Value
       |
        <code
          >&#x3C;iri></code
        >

       | Default value
       | None

       | Animatable
       | Yes

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
  <a xlink:href="https://developer.mozilla.org/">
    <text x="10" y="25">MDN Web Docs</text>
  </a>
</svg>
```

## See also

- `href`
