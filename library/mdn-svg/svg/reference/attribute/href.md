---
title: "href"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/href/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# href

The **`href`** attribute defines a link to a resource as a reference URL. The exact meaning of that link depends on the context of each element using it.

> **Note:**
> Specifications before SVG 2 defined an `xlink:href` attribute, which is now rendered obsolete by the `href` attribute. If you need to support earlier browser versions, the deprecated `xlink:href` attribute can be used as a fallback in addition to the `href` attribute, e.g., `<use href="some-id" xlink:href="some-id" x="5" y="5" />`.

You can use this attribute with the following SVG elements:

- ``
- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<feImage>`
- `<image>`
- `<linearGradient>`
- `<mpath>`
- `<pattern>`
- `<radialGradient>`
- `<script>`
- `<set>`
- `<textPath>`
- `<use>`

## In SVG

### a

For ``, `href` defines the location of the referenced object, expressed as a URL reference.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | Yes

### animate, animateMotion, animateTransform, set

For the `<animate>`, `<animateMotion>`, `<animateTransform>`, and `<set>`, `href` defines a URL referring to the element which is the target of this animation element and which therefore will be modified over time.

The URL must point to exactly one target element which is capable of being the target of the given animation element. If the URL points to multiple target elements, if the given target element is not capable of being a target of the given animation element, or if the given target element is not part of the current document, then the animation element will not affect any target element. However, the animation element will still operate normally with regard to its timing properties. Specifically, TimeEvents are dispatched and the animation element can be used as syncbase in an identical fashion to when the URL refers to a valid target element.

If the `href` attribute or the deprecated `xlink:href` attribute is not provided, then the target element will be the immediate parent element of the current animation element. If both `xlink:href` and `href` are specified, the value of the latter attribute is used.

Refer to the descriptions of the individual animation elements for any restrictions on what types of elements can be targets of particular types of animations.

Except for any SVG-specific rules explicitly mentioned in this specification, the normative definition for this attribute is the SMIL Animation specification. In particular, see SMIL Animation: Specifying the animation target.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | No

### feImage

For `<feImage>`, `href` defines a URL referring to an image resource or to an element. If both, the `xlink:href` and the `href` attribute are specified, the latter overrides the former.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | Yes

### image

For `<image>`, `href` defines a URL referring to the image to render.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | Yes

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <image href="fxlogo.png" x="0" y="0" height="100" width="100" />
</svg>
```

### linearGradient/radialGradient

For `<linearGradient>` or `<radialGradient>`, `href` defines URL referring to a template gradient element; to be valid, the reference must be to a different `<linearGradient>` or `<radialGradient>` element.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | Yes

### mpath

For `<mpath>`, `href` defines a URL referring to the `` element or basic shape which defines the motion path.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | No

### pattern

For `<pattern>`, `href` defines a URL referring to a different `<pattern>` element within the current SVG document. Any attributes which are defined on the referenced element which are not defined on this element are inherited by this element. If this element has no children, and the referenced element does (possibly due to its own `href` attribute), then this element inherits the children from the referenced element. Inheritance can be indirect to an arbitrary level; thus, if the referenced element inherits attributes or children due to its own `href` attribute, then the current element can inherit those attributes or children. On the `<pattern>` element, the `href` attribute is animatable.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | Yes

### script

For `<script>`, `href` defines a URL referring to an external resource containing the script code.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | No

### textPath

For `<textPath>`, `href` defines a URL referring to the `` element or basic shape onto which the text will be rendered if no `path` attribute is provided. On the `<textPath>` element, the `href` attribute is animatable.

       | Value
       |
        <code
          >&#x3C;url></code
        >

       | Default value
       | None

       | Animatable
       | Yes

### use

For `<use>`, `href` defines a URL referring to an element or fragment within an SVG document to be cloned.

The `<use>` element can reference an entire SVG document by specifying an `href` value without a fragment. Such references are taken to be referring to the root element of the referenced document.

       | Value
       |
        <code
          >&#x3C;url></code
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
  <a href="https://developer.mozilla.org/">
    <text x="10" y="25">MDN Web Docs</text>
  </a>
</svg>
```

## See also

- `xlink:href`
