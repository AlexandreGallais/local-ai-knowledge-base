---
title: "CSSFontPaletteValuesRule: overrideColors property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfontpalettevaluesrule/overridecolors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFontPaletteValuesRule: overrideColors property

The read-only **`overrideColors`** property of the `CSSFontPaletteValuesRule` interface is a string containing a list of color index and color pair that are to be used instead. It is specified in the same format as the corresponding `override-colors` descriptor.

## Value

A string containing a comma-separated list of color index and color pair

## Examples

### Read the overridden color

This example first defines a few at-rules, among them two `@font-palette-values`. The MDN live sample infrastructure combines all the CSS blocks in the example into a single inline style with the id `css-output`, so we first use `document.getElementById()` to find that sheet.

#### HTML

```html
<div class="hat">
  <div class="emoji colored-hat">🎩</div>
</div>
<button>Toggle color</button>
<pre id="log"></pre>
```

#### CSS

```css
@font-face {
  font-family: "Noto Color Emoji";
  font-style: normal;
  font-weight: normal;
  src: url("https://mdn.github.io/shared-assets/fonts/noto-color-emoji/NotoColorEmoji-Regular.woff2")
    format("woff2");
}

.emoji {
  font-family: "Noto Color Emoji", emoji;
  font-size: 3rem;
}

@font-palette-values --blue {
  font-family: "Noto Color Emoji";
  override-colors:
    3426 rgb(1 28 193),
    4614 rgb(60 124 230);
}

@font-palette-values --green {
  font-family: "Noto Color Emoji";
  override-colors:
    3426 rgb(28 193 1),
    4614 rgb(34 230 1);
}

.colored-hat {
  font-palette: --blue;
}
```

#### JavaScript

```js
const log = document.getElementById("log");
const button = document.querySelector("button");
const hat = document.querySelector(".colored-hat");
const rules = document.getElementById("css-output").sheet.cssRules;
const greenFontPaletteValuesRule = rules[3];
const blueFontPaletteValuesRule = rules[2];
log.textContent = `Overridden colors: ${blueFontPaletteValuesRule.overrideColors}`;

button.addEventListener("click", (event) => {
  if (hat.style.fontPalette !== "--green") {
    hat.style.fontPalette = "--green";
    log.textContent = `Overridden colors: ${greenFontPaletteValuesRule.overrideColors}`;
  } else {
    hat.style.fontPalette = "--blue";
    log.textContent = `Overridden colors: ${blueFontPaletteValuesRule.overrideColors}`;
  }
});
```

#### Result

## See also

- `@font-palette-values` at-rule
- `override-colors` descriptor
