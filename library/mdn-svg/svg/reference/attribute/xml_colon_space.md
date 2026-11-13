---
title: "xml:space"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/xml_colon_space/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# xml:space

SVG supports the built-in XML **`xml:space`** attribute to handle whitespace characters inside elements. Child elements inside an element may also have an `xml:space` attribute that overrides the parent's one.

> **Note:**
> Instead of using the `xml:space` attribute, use the `white-space` CSS property.

This attribute influences how browsers parse text content and therefore changes the way the DOM is built. Therefore, changing this attribute's value through the DOM API may have no effect.

## Elements

You can use this attribute with any SVG element.

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
  <text y="20" xml:space="default">    Default    spacing</text>
  <text y="40" xml:space="preserve">    Preserved    spacing</text>
</svg>
```

## Usage notes

       | Value
       | `default` | `preserve`

       | Default value
       | `default`

       | Animatable
       | No

- `default`
    With this value set, whitespace characters will be processed in this order:
    1. All newline characters are removed.
    2. All tab characters are converted into space characters.
    3. All leading and trailing space characters are removed.
    4. All contiguous space characters are collapsed into a single space character.

- `preserve`
    This value tells the user agent to convert all newline and tab characters into spaces. Then, it draws all space characters (including leading, trailing and multiple consecutive space characters).

    For example, the string "a   b" (three spaces between "a" and "b") separates "a" and "b" more than "a b" (one space between "a" and "b").
