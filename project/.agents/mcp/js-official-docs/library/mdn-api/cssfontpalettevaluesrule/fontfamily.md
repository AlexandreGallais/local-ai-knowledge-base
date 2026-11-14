---
title: "CSSFontPaletteValuesRule: fontFamily property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontpalettevaluesrule/fontfamily/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontPaletteValuesRule: fontFamily property

The read-only **`fontFamily`** property of the `CSSFontPaletteValuesRule` interface lists the font families the rule can be applied to. The font families must be _named_ families; _generic_ families like `courier` are not valid.

## Value

A string containing a space-separated list of the font families on which the rule can be applied

## Examples

### Read the associated font family

This example first defines an `@import` and an `@font-palette-values` at-rule. Then it reads the `@font-palette-values` rule and displays its name. The MDN live sample infrastructure combines all the CSS blocks in the example into a single inline style with the id `css-output`, so we first use `document.getElementById()` to find that sheet. The palette will be the second `CSSRule` in that stylesheet. So, `rules[1]` returns a `CSSFontPaletteValuesRule` object, from which we can access `fontFamily`.

#### HTML

```html
<pre id="log">
The @font-palette-values at-rule's applies to the font families:</pre>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Bungee+Spice";

@font-palette-values --Alternate {
  font-family: "Bungee Spice";
  override-colors:
    0 #00ffbb,
    1 #007744;
}

.alternate {
  font-palette: --Alternate;
}
```

#### JavaScript

```js
const log = document.getElementById("log");

const rules = document.getElementById("css-output").sheet.cssRules;
const fontPaletteValuesRule = rules[1]; // a CSSFontPaletteValuesRule interface
log.textContent += ` ${fontPaletteValuesRule.fontFamily}`;
```

#### Result

## See also

- `@font-palette-values` at-rule
- `font-family` descriptor
