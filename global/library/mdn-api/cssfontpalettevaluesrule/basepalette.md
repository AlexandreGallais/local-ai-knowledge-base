---
title: "CSSFontPaletteValuesRule: basePalette property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontpalettevaluesrule/basepalette/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontPaletteValuesRule: basePalette property

The read-only **`basePalette`** property of the `CSSFontPaletteValuesRule` interface indicates the base palette associated with the rule.

## Value

A string that can be one of the following color values:

- `light`
    Matches the first palette in the font file that is marked as applicable to a light background, that is, _close to white_. If there is no palette in the font or if no palette has the required metadata, the value is equivalent to `"0"`, that is, the first palette in the font.
- `dark`
    Matches the first palette in the font file that is marked as applicable to a dark background, that is, _close to black_. If there is no palette in the font or if no palette has the required metadata, the value is equivalent to `"0"`, that is, the first palette in the font.
- a string containing an index (like `"0"`, `"1"`, …)
    Matches the palette corresponding to the index. The first palette corresponds to `"0"`.

## Examples

### Read the associated base palette

The MDN live sample infrastructure combines all the CSS blocks in the example into a single inline style with the id `css-output`, so we first use `document.getElementById()` to find that sheet. `rules[2]` returns the first `CSSFontPaletteValuesRule` object, and `rules[3]` the second one.

#### HTML

```html
<h2>default base-palette</h2>
<h2 class="two">base-palette at index 2</h2>
<h2 class="five">base-palette at index 5</h2>
<pre id="log"></pre>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Nabla&display=swap";

h2 {
  font-family: "Nabla", fantasy;
}

@font-palette-values --two {
  font-family: "Nabla";
  base-palette: 2;
}

@font-palette-values --five {
  font-family: "Nabla";
  base-palette: 5;
}

.two {
  font-palette: --two;
}

.five {
  font-palette: --five;
}
```

#### JavaScript

```js
const log = document.getElementById("log");

const rules = document.getElementById("css-output").sheet.cssRules;
const twoRule = rules[2]; // A CSSFontPaletteValuesRule interface
const fiveRule = rules[3]; // A CSSFontPaletteValuesRule interface

log.textContent = `The ${twoRule.name} @font-palette-values base palette is: ${twoRule.basePalette}\n`;
log.textContent += `The ${fiveRule.name} @font-palette-values base palette is: ${fiveRule.basePalette}`;
```

#### Result

## See also

- `@font-palette-values` at-rule
- `base-palette` descriptor
