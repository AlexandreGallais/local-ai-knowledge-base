---
title: "FontFaceSet: loadingdone event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/loadingdone_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: loadingdone event

The `loadingdone` event fires when the document has loaded all fonts.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("loadingdone", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onloadingdone = (event) => { }
```

## Example

In the following example, when the font `Ephesis` has finished loading, "Font loading complete" is printed to the console.

```js
document.fonts.onloadingdone = () => {
  console.log("Font loading complete");
};

(async () => {
  await document.fonts.load("16px Ephesis");
})();
```
