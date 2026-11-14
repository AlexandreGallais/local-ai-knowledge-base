---
title: "Local Font Access API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/local_font_access_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Local Font Access API

The **Local Font Access API** provides a mechanism to access the user's locally installed font data — this includes higher-level details such as names, styles, and families, as well as the raw bytes of the underlying font files.

## Concepts and usage

Web fonts were revolutionary in enabling typography on the web by allowing web designers to provide custom fonts to use on a web document. Specified via the `@font-face` at-rule, a web font can be loaded from a URL provided in the `url()` function.

`@font-face` has several other useful features available. In particular, you can also specify the font's full or Postscript name inside the `local()` function to tell the browser to use a local copy if the user has the font installed on their computer. This is not without its problems — `local()` has become notorious as a fingerprinting vector.

In addition, high-end design tools have historically been difficult to deliver on the web, due to challenges in accurate font enumeration and accessing low-level font data (for example, to apply filters and transformations). Current apps often rely on workarounds such as asking users to upload their fonts to a server where they are processed to get raw byte data, or installing a separate local program to provide additional capabilities.

The Local Font Access API has been created to address these problems.

The `Window.queryLocalFonts()` method provides access to an array of locally-installed fonts, each represented by a `FontData` object instance. `FontData` has several properties providing access to names, styles, and families, and it also has a `blob()` method providing access to a `Blob` containing the raw bytes of the underlying font file.

In terms of privacy and security:

- The Local Font Access API is designed to only provide access to the data required to solve the above problems. There is also no requirement for browsers to provide the full list of available local fonts, nor to provide the data in the same order as it appears on disk.
- When `Window.queryLocalFonts()` is invoked, the user is asked for permission to access their local fonts. The status of this permission can be queried via the Permissions API (the `local-fonts` permission).
- You can control access to this feature using a `local-fonts` Permissions Policy.

## Interfaces

- `FontData`
    Represents a single local font face.

## Extensions to other interfaces

- `Window.queryLocalFonts()`
    Returns a `Promise` that fulfills with an array of `FontData` objects representing the font faces available locally.

## Examples

For a working live demo, see our Local Font Access API demo.

### Feature detection

```js
if ("queryLocalFonts" in window) {
  // The Local Font Access API is supported
}
```

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
- The `local-fonts` Permissions Policy directive
