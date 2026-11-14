---
title: "Window: queryLocalFonts() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/querylocalfonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: queryLocalFonts() method

The **`window.queryLocalFonts()`** method returns a `Promise` that fulfills with an array of `FontData` objects representing the font faces available locally.

To use this method, the user must grant permission to access `local-fonts` (permission status can be queried via the `Permissions API`). In addition, this feature may be blocked by a Permissions Policy set on your server.

## Syntax

```js
queryLocalFonts(options)
```

### Parameters

- `options` (optional)
    Contains optional configuration parameters. Currently only one property is defined:
    - `postscriptNames` (optional)
        An array of font PostScript names. If this is specified, only fonts with PostScript names matching those in the array will be included in the results; if not, all fonts will be included in the results.

### Return value

A `Promise` that fulfills with an array of `FontData` objects representing the font faces available locally.

### Exceptions

- `NotAllowedError` `DOMException`
    The user chose to deny permission to use this feature when presented with the browser's permission prompt after the method was first invoked.
- `SecurityError` `DOMException`
    Use of this feature was blocked by a Permissions Policy, or it was not called via a user interaction such as a button press, or current origin is an opaque origin.

## Examples

For a working live demo, see our Local Font Access API demo.

### Font enumeration

The following snippet will query for all available fonts and log metadata. This could be used, for example, to populate a font picker control.

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

### Limiting returned results

To limit the returned font data to only a specific list of font faces, use the `postscriptNames` option.

```js
async function returnSpecificFonts() {
  const availableFonts = await window.queryLocalFonts({
    postscriptNames: ["Verdana", "Verdana-Bold", "Verdana-Italic"],
  });

  return availableFonts;
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

- `Local Font Access API`
- Use advanced typography with local fonts
- `@font-face`
