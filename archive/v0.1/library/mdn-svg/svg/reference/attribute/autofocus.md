---
title: "autofocus"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/autofocus/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# autofocus

The **`autofocus`** global SVG attribute defines a focusable element to be focused after it's connected to a document. The attribute has no effect if the element is not already focusable.

The `autofocus` attribute has an HTML counterpart: `autofocus`. No more than one element in the document may have the `autofocus` attribute. If applied to multiple elements, the first one will receive focus.

## Usage notes

       | Value
       |
        <code>boolean attribute</code>

       | Default value
       | (none)

       | Animatable
       | No

For a description of the values, please refer to the HTML `autofocus` attribute.

## Accessibility concerns

Automatically focusing an SVG can confuse visually-impaired people using screen-reading technology and people with cognitive impairments. When autofocus is assigned, screen-readers "teleport" their user to the focusable element without warning them beforehand.

Use careful consideration for accessibility when applying the `autofocus` attribute. Automatically focusing on an element can cause the page to scroll on load. The focus can also cause dynamic keyboards to display on some touch devices. While a screen reader will announce the accessible name of the element receiving focus, the screen reader will not announce anything before the element that may provide more context, and the sighted user on a small device will equally miss the context created by the preceding content.

## See also

- SVG `tabindex` attribute
- HTML `autofocus` attribute
- `SVGElement.autofocus`
