---
title: "FontFaceSet: loadingerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/loadingerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: loadingerror event

The `loadingerror` event fires when fonts have finished loading, but some or all fonts have failed to load.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("loadingerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onloadingerror = (event) => { }
```

## Example

In the following example, if the font `Ephesis` fails to load, "Font loading error" is printed to the console.

```js
document.fonts.onloadingerror = () => {
  console.log("Font loading error");
};

(async () => {
  await document.fonts.load("16px Ephesis");
})();
```
