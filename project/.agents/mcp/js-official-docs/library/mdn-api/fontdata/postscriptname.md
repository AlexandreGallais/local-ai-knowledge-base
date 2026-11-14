---
title: "FontData: postscriptName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontdata/postscriptname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontData: postscriptName property

The **`postscriptName`** read-only property of the `FontData` interface returns the PostScript name of the font face.

This is the name used to uniquely identify the PostScript font, and is generally an unbroken sequence of characters that includes the font's name and style.

Examples include:

- AppleSDGothicNeo-UltraLight
- Arial-Black
- AvenirNext-Heavy
- Katari-MediumItalic
- YuMin_36pKn-Extrabold

## Value

A string.

## Examples

The following snippet will query for all available fonts, and log metadata. This could be used, for example, to populate a font-picker control.

```js
async function logFontData() {
  try {
    const availableFonts = await window.queryLocalFonts();
    for (const fontData of availableFonts) {
      console.log(fontData.postscriptName);
      console.log(fontData.fullName);
      console.log(fontData.family);
      console.log(fontData.style);
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

## See also

- Use advanced typography with local fonts
- `@font-face`
