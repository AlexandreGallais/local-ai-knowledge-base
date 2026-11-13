---
title: "HTMLFontElement: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfontelement/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFontElement: size property

The obsolete
**`HTMLFontElement.size`** property is a
string that reflects the `size` HTML
attribute. It contains either a font size ranging from 1 to 7 or a
number relative to the default value 3, for example -2 or +1.

The format of the string must follow one of the following HTML microsyntaxes:

       | Microsyntax
       | Description
       | Examples

       | Valid size number string
       | integer number in the range of 1-7
       | `6`

       | Relative size string
       |
        +x or -x, where x is a number relative to 3 (the result should be in the range of 1-7)

       |
        <code>+2-1</code>

## Value

A string.

## Examples

```js
// Assumes there is <font id="f"> element in the HTML

const f = document.getElementById("f");
f.size = "6";
```

## See also

- The `HTMLFontElement` interface it belongs to.
