---
title: "FontFaceSet: loading event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/loading_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: loading event

The `loading` event fires when the document begins loading fonts.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("loading", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onloading = (event) => { }
```

## Example

In the following example, when the font `Ephesis` starts to load, "Font is loading…" is printed to the console.

```js
document.fonts.onloading = () => {
  console.log("Font is loading");
};

(async () => {
  await document.fonts.load("16px Ephesis");
})();
```
