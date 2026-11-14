---
title: "HTMLAreaElement: alt property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/alt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: alt property

The **`alt`** property of the `HTMLAreaElement` interface specifies the text of the hyperlink, defining the textual label for an image map's link. It reflects the `<area>` element's `alt` attribute.

The `alt` value must be text that, when presented with the `alt` text of the other `<area>` hyperlinks within the same `<map>`, along with the `alt` text of the `` itself, provides the user with the same kind of choice as the hyperlink would when used without its text but with its shape applied to the image.

If the `<area>` is a link (contains an `href` property), the `alt` property value should be a non-empty string giving the label for the link that would be appropriate if the image were unavailable. The `alt` attribute for a link `<area>` can only be empty if there is another `<area>` element in the same `<map>` that points to the same resource and has a non-blank `alt` attribute.

## Value

A string.

## Examples

```js
const areaElement = document.getElementById("imageArea");
console.log(areaElement.alt);
areaElement.alt = "A much better link description";
```

## See also

- `HTMLImageElement.alt`
- `HTMLInputElement.alt`
- `HTMLMapElement`
- `<area>`
- `<map>`
- ``
- Good alt text, bad alt text — Making your content perceivable on WCAG.com (2021)
- An alt decision tree on W3C Web Accessibility Initiative (WAI)
