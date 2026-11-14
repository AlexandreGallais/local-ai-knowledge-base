---
title: "CSSFontPaletteValuesRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontpalettevaluesrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontPaletteValuesRule

The **`CSSFontPaletteValuesRule`** interface represents an `@font-palette-values` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSFontPaletteValuesRule.name` (read-only)
    A string with the name of the font palette.
- `CSSFontPaletteValuesRule.fontFamily` (read-only)
    A string indicating the font families on which the rule has to be applied.
- `CSSFontPaletteValuesRule.basePalette` (read-only)
    A string indicating the base palette associated with the rule.
- `CSSFontPaletteValuesRule.overrideColors` (read-only)
    A string indicating the colors of the base palette that are overwritten and the new colors.

## Instance methods

_Inherits methods from its ancestor `CSSRule`._

## Examples

### Read associated font family using CSSOM

This example first defines an `@import` and an `@font-palette-values` at-rule. Then it reads the `@font-palette-values` rule and displays its name. The MDN live sample infrastructure combines all the CSS blocks in the example into a single inline style with the id `css-output`, so we first use `document.getElementById()` to find that sheet. The palette will be the second `CSSRule` in that stylesheet. So, `rules[1]` returns a `CSSFontPaletteValuesRule` object, from which we can access `fontFamily`.

#### HTML

```html
<pre id="log">The @font-palette-values at-rule font families:</pre>
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
const fontPaletteValuesRule = rules[1]; // aA CSSFontPaletteValuesRule interface
log.textContent += ` ${fontPaletteValuesRule.fontFamily}`;
```

#### Result

## See also

- `@font-palette-values`
