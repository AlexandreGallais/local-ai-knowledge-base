---
title: "requiredExtensions"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/requiredextensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# requiredExtensions

The **`requiredExtensions`** SVG conditional processing attribute is a list of space-separated URL values each referencing a language extension. Language extensions are extended capabilities that go beyond those defined by standard browser specifications.

The value is a space-separated list of URL references identifying the required extensions. If all of the named extensions in the list are supported by the user agent, the element is rendered as usual. If attribute is present but the value is an empty string, or if any of the extensions are not supported by the browser, the browser will skip the element, along with all its descendants, not rendering it.

You can use this attribute with the following SVG elements:

- ``
- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<circle>`
- `<clipPath>`
- `<defs>`
- `<ellipse>`
- `<foreignObject>`
- ``
- `<image>`
- `<line>`
- `<mask>`
- ``
- `<pattern>`
- `<polygon>`
- `<polyline>`
- `<rect>`
- `<set>`
- ``
- `<switch>`
- `<text>`
- `<textPath>`
- `<tspan>`
- `<use>`

## Usage notes

       | Value
       |
        `<list-of-IRIs>`

       | Default value
       | (none)

       | Animatable
       | No

## See also

- `tabindex`
- `systemLanguage`
- `requiredFeatures`
