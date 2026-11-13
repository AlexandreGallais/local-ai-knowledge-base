---
title: "CSSFontFaceRule: style property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfacerule/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFaceRule: style property

The read-only **`style`** property of the `CSSFontFaceRule` interface returns a `CSSFontFaceDescriptors` object representing the descriptors available in the `@font-face` rule's body.

## Value

A `CSSFontFaceDescriptors` object.

Although the `style` property itself is read-only in the sense that you can't replace the `CSSFontFaceDescriptors` object, you can still assign to the `style` property directly, which is equivalent to assigning to its `cssText` property.
You can also modify the `CSSFontFaceDescriptors` object using the `setProperty()` and `removeProperty()` methods.

## Examples

### Basic usage

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
    const descriptors = rule.style;
    if (descriptors instanceof CSSStyleDeclaration) {
      log(`rule.style is a CSSStyleDeclaration.`);
    } else {
      log(`rule.style is a CSSFontFaceDescriptors.`);
    }
    log("Descriptors:");
    log(` font-family: ${descriptors.fontFamily}`);
    log(` src: ${descriptors.src}`);
    log(` font-weight: ${descriptors["font-weight"]}`);
    log(` font-style: ${descriptors.fontStyle}`);
    log(` font-display: ${descriptors["font-display"]}`);
  }
}
```

#### Result
