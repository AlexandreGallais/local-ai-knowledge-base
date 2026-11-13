---
title: "HTMLInputElement: alt property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/alt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: alt property

The **`alt`** property of the `HTMLInputElement` interface defines the textual label for the button for users and user agents who cannot use the image. It reflects the `` element's `alt` attribute.

The `alt` property is valid for the `image` type only. It should be a non-empty string giving the label that would be appropriate for an equivalent button if the image was unavailable.

## Value

A string.

## Examples

```js
const inputElement = document.getElementById("imageButton");
console.log(inputElement.alt);
inputElement.alt = "A much better description";
```

## See also

- `HTMLImageElement.alt`
- `HTMLButtonElement`
- ``
- ``
- ``
- Good alt text, bad alt text — Making your content perceivable on WCAG.com (2021)
- An alt Decision Tree on W3C Web Accessibility Initiative (WAI)
