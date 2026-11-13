---
title: "HTMLFontElement: color property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfontelement/color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFontElement: color property

The obsolete
**`HTMLFontElement.color`**
property is a string that reflects the `color` HTML attribute, containing either a named color or a color specified in the
hexadecimal #RRGGBB format.

The format of the string must follow one of the following HTML microsyntaxes (see `<color>`):

| Microsyntax              | Description                      | Examples                  |
| ------------------------ | -------------------------------- | ------------------------- |
| Valid name color string  | _nameOfColor (case insensitive)_ | `Green`, `green`, `GREEN` |
| Valid hex color string   | _#RRGGBB_                        | `#008000`                 |
| RGB using decimal values | _rgb(x x x) (x in 0-255 range)_  | `rgb(0 128 0)`            |

## Value

A string.

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `elt.color = null` is equivalent to `elt.color = ""`.

## Examples

```js
// Assumes there is <font id="f"> element in the HTML

const f = document.getElementById("f");
f.color = "green";
```

## See also

- The `HTMLFontElement` interface it belongs to.
