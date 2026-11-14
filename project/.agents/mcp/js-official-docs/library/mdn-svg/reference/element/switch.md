---
title: "<switch>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/switch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <switch>

The **`<switch>`** SVG element evaluates any `requiredExtensions` and `systemLanguage` attributes on its direct child elements in order, and then renders the first child where these attributes evaluate to true.

Other direct children will be bypassed and therefore not rendered. If a child element is a container element, like ``, then its subtree is also processed/rendered or bypassed/not rendered.

> **Note:**
> The `display` and `visibility` properties have no effect on `<switch>` element processing. In particular, setting `display:none` on a child has no effect on the true/false testing for `<switch>` processing.

## Attributes

- `requiredExtensions`
    A space-separated list of URL values referencing the language extensions the user agent must support for the element to be rendered.

- `systemLanguage`
    A comma-separated list of supported language tags.

## DOM Interface

This element implements the `SVGSwitchElement` interface.

## Examples

This example demonstrates showing different text content depending on the browser's language settings. The `<switch>` element will display the first of its child elements whose `systemLanguage` attribute matches the user's language, or the fallback element with no `systemLanguage` attribute if none of them match.

```html
<svg viewBox="0 -20 100 50">
  <switch>
    <text systemLanguage="ar">مرحبا</text>
    <text systemLanguage="de,nl">Hallo!</text>
    <text systemLanguage="en-us">Howdy!</text>
    <text systemLanguage="en-gb">Wotcha!</text>
    <text systemLanguage="en-au">G'day!</text>
    <text systemLanguage="en">Hello!</text>
    <text systemLanguage="es">Hola!</text>
    <text systemLanguage="fr">Bonjour!</text>
    <text systemLanguage="ja">こんにちは</text>
    <text systemLanguage="ru">Привет!</text>
    <text requiredExtensions="http://example.org/lang/ext/emoji">☺</text>
  </switch>
</svg>
```

## See also

- `requiredExtensions`
- `systemLanguage`
