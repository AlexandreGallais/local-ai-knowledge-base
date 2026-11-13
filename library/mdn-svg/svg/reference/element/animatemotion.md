---
title: "<animateMotion>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/animatemotion/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <animateMotion>

The **`<animateMotion>`** SVG element provides a way to define how an element moves along a motion path.

> **Note:**
> To reuse an existing path, it will be necessary to use an `<mpath>` element inside the `<animateMotion>` element instead of the `path` attribute.

## Attributes

- `keyPoints`
    This attribute indicates, in the range \[0,1], how far the object is along the path for each associated value in `keyTimes`.
    _Value type_: **\<number>**\*; _Default value_: none; _Animatable_: **no**
- `path`
    This attribute defines the path of the motion, using the same syntax as the `d` attribute.
    _Value type_: **\<string>**; _Default value_: none; _Animatable_: **no**
- `rotate`
    This attribute defines a rotation applied to the element animated along a path, usually to make it pointing in the direction of the animation.
    _Value type_: **\<number>** | `auto` | `auto-reverse`; _Default value_: `0`; _Animatable_: **no**

> **Note:**
> For `<animateMotion>`, the default value for the `calcMode` attribute is `paced`.

### Animation Attributes

- Animation timing attributes
    `begin`, `dur`, `end`, `min`, `max`, `restart`, `repeatCount`, `repeatDur`, `fill`
- Animation value attributes
    `calcMode`, `values`, `keyTimes`, `keySplines`, `from`, `to`, `by`
- Other Animation attributes
    Most notably: `attributeName`, `additive`, `accumulate`
- Animation event attributes
    Most notably: `onbegin`, `onend`, `onrepeat`

## DOM Interface

This element implements the `SVGAnimateMotionElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
  margin: 0;
  padding: 0;
  display: block;
}
```

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="lightgrey"
    d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

  <circle r="5" fill="red">
    <animateMotion
      dur="10s"
      repeatCount="indefinite"
      path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
  </circle>
</svg>
```

## See also

- `<mpath>`
