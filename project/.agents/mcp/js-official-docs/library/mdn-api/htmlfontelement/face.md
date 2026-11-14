---
title: "HTMLFontElement: face property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfontelement/face/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFontElement: face property

The obsolete
**`HTMLFontElement.face`**
property is a string that reflects the `face` HTML attribute, containing a comma-separated list of one or more font
names.

The document text, in the default style, is rendered as the first font face that the
client's browser supports. If no font listed is installed on the local system, the
browser typically defaults to the proportional or fixed-width font for that system.

The format of the string must follow one of the following HTML microsyntax:

| Microsyntax                                 | Description                                                         | Examples          |
| ------------------------------------------- | ------------------------------------------------------------------- | ----------------- |
| List of one or more valid font family names | _A list of font names, that have to be present on the local system_ | `courier,verdana` |

## Value

A string.

## Examples

```js
// Assumes there is <font id="f"> element in the HTML

const f = document.getElementById("f");
f.face = "arial";
```

## See also

- The `HTMLFontElement` interface it belongs to.
