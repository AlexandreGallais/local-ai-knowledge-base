---
title: "Document: fonts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: fonts property

The **`fonts`** read-only property of the `Document` interface returns the `FontFaceSet` interface of the document.

This feature is part of the CSS Font Loading API.

## Value

The returned value is the `FontFaceSet` interface of the document.
The `FontFaceSet` interface is useful for loading new fonts, checking the status of previously loaded fonts etc.

## Examples

### Doing operation after fonts are loaded

```js
document.fonts.ready.then((fontFaceSet) => {
  // Any operation that needs to be done only after all used fonts
  // have finished loading can go here.
  const fontFaces = [...fontFaceSet];
  console.log(fontFaces);
  // some fonts may still be unloaded if they aren't used on the site
  console.log(fontFaces.map((f) => f.status));
});
```

The promise fulfills when loading and layout operations of all used fonts are done. The set of used fonts can be different from the set of _declared_ fonts, e.g., if optional fonts (i.e., fonts declared via `font-display: optional`) were not able to load in time.

## See also

- `FontFaceSet` interface
- `FontFace`
