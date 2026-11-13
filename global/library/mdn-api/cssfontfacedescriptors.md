---
title: "CSSFontFaceDescriptors"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfacedescriptors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFaceDescriptors

The **`CSSFontFaceDescriptors`** interface represents a CSS declaration block for an `@font-face` at-rule.

Each descriptor in the body of the corresponding `@font-face` at-rule can be accessed using either its kebab-case property name in bracket notation or the camel-case version of the property name in dot notation.
For example, you can access the `font-family` CSS descriptor as `style["font-family"]` or `style.fontFamily`, where `style` is a `CSSFontFaceDescriptors` instance.

> **Note:**
> The `CSSFontFaceRule` interface represents a `@font-face` at-rule, and the `CSSFontFaceRule.style` property is an instance of this object.

## Instance properties

_Inherits properties from its ancestor `CSSStyleDeclaration`._

The following property names, in kebab-case (accessed using bracket notation) and camel-case (accessed using dot notation), each represent the value of a descriptor in the corresponding `@font-face` at-rule:

- `font-display` or `fontDisplay`
    A string representing the value of the `font-display` descriptor.
- `font-family` or `fontFamily`
    A string representing the value of the `font-family` descriptor.
- `font-feature-settings` or `fontFeatureSettings`
    A string representing the value of the `font-feature-settings` descriptor.
- `font-stretch` or `fontStretch`
    A string representing the value of the `font-stretch` descriptor.
- `font-style` or `fontStyle`
    A string representing the value of the `font-style` descriptor.
- `font-weight` or `fontWeight`
    A string representing the value of the `font-weight` descriptor.
- `font-width` or `fontWidth`
    A string representing the value of the `font-width` descriptor.
- `size-adjust` or `sizeAdjust`
    A string representing the value of the `size-adjust` descriptor.
- `src`
    A string representing the value of the `src` descriptor.
- `unicode-range` or `unicodeRange`
    A string representing the value of the `unicode-range` descriptor.

## Instance methods

_No specific methods; inherits methods from its ancestor `CSSStyleDeclaration`._

## Examples

### Accessing @font-face descriptor values

This example defines a `@font-face` rule and then uses `CSSFontFaceDescriptors` to read back the descriptor values.

#### CSS

```css
@font-face {
  font-family: "MyHelvetica";
  src:
    local("Helvetica Neue Bold"),
    local("HelveticaNeue-Bold"),
    url("MgOpenModernaBold.woff2") format("woff2");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
```

```css
#log {
  height: 200px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```html
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

```js
const myRules = document.getElementById("css-output").sheet.cssRules;
for (const rule of myRules) {
  if (rule instanceof CSSFontFaceRule) {
    const style = rule.style; // a CSSFontFaceDescriptors
    log(`font-family: ${style.fontFamily}`);
    log(`src: ${style.src}`);
    log(`font-weight: ${style["font-weight"]}`);
    log(`font-style: ${style.fontStyle}`);
    log(`font-display: ${style["font-display"]}`);
  }
}
```

#### Result

## See also

- `CSSFontFaceRule`
- `CSSFontFaceRule.style`
- `@font-face`
