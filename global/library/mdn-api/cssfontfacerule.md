---
title: "CSSFontFaceRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontfacerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontFaceRule

The **`CSSFontFaceRule`** interface represents an `@font-face` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSFontFaceRule.style` (read-only)
    Returns a `CSSFontFaceDescriptors` object that allows reading and setting the descriptors of the associated `@font-face` at-rule.

## Instance methods

_Inherits methods from its ancestor `CSSRule`._

## Examples

### Accessing @font-face properties

This example defines a `@font-face` rule and then iterates over the rules on the page until the associated `CSSFontFaceRule` is found.
It then logs some of the properties.

#### CSS

```css
@font-face {
  font-family: "MyHelvetica";
  src:
    local("Helvetica Neue Bold"), local("HelveticaNeue-Bold"),
    url("MgOpenModernaBold.woff2");
  font-weight: bold;
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

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
const myRules = document.getElementById("css-output").sheet.cssRules;
for (const rule of myRules) {
  if (rule instanceof CSSFontFaceRule) {
    log(`this: ${rule}`);
    log(` cssText: ${rule.cssText}`);
    log(` parentRule: ${rule.parentRule}`);
    log(` parentStyleSheet: ${rule.parentStyleSheet}`);
    log(` type: ${rule.type}`);
    log(` style: ${rule.style}`);
  }
}
```

#### Result
