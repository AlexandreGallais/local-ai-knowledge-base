---
title: "FontData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontData

The **`FontData`** interface of the `Local Font Access API` represents a single local font face.

## Instance properties

- `FontData.family` (read-only) (experimental)
    Returns the family of the font face.
- `FontData.fullName` (read-only) (experimental)
    Returns the full name of the font face.
- `FontData.postscriptName` (read-only) (experimental)
    Returns the PostScript name of the font face.
- `FontData.style` (read-only) (experimental)
    Returns the style of the font face.

## Instance methods

- `FontData.blob()` (experimental)
    Returns a `Promise` that fulfills with a `Blob` containing the raw bytes of the underlying font file.

## Examples

For a live example, see our Local Font Access API demo.

### Font enumeration

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

### Accessing low-level data

The `blob()` method provides access to low-level SFNT data — this is a font file format that can contain other font formats, such as PostScript, TrueType, OpenType, or Web Open Font Format (WOFF).

```js
async function computeOutlineFormat() {
  try {
    const availableFonts = await window.queryLocalFonts({
      postscriptNames: ["ComicSansMS"],
    });
    for (const fontData of availableFonts) {
      // `blob()` returns a Blob containing valid and complete
      // SFNT-wrapped font data.
      const sfnt = await fontData.blob();
      // Slice out only the bytes we need: the first 4 bytes are the SFNT
      // version info.
      // Spec: https://learn.microsoft.com/en-us/typography/opentype/spec/otff#organization-of-an-opentype-font
      const sfntVersion = await sfnt.slice(0, 4).text();

      let outlineFormat = "UNKNOWN";
      switch (sfntVersion) {
        case "\x00\x01\x00\x00":
        case "true":
        case "typ1":
          outlineFormat = "truetype";
          break;
        case "OTTO":
          outlineFormat = "cff";
          break;
      }
      console.log("Outline format:", outlineFormat);
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

## See also

- Use advanced typography with local fonts
- `@font-face`
