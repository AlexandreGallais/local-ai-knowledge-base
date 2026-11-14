---
title: "CSSMediaRule: media property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmediarule/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMediaRule: media property

The read-only **`media`** property of the `CSSMediaRule` interface contains a `MediaList` object representing the media query list of the `@media` rule.

## Value

A `MediaList` object.

Although the `media` property itself is read-only in the sense that you can't replace the `MediaList` object, you can still assign to the `media` property directly, which is equivalent to assigning to its `mediaText` property. You can also modify the `MediaList` object using the `appendMedium()` and `deleteMedium()` methods.

## Examples

The CSS includes a media query with one style rule. This will be the first
`CSSRule` returned by `document.styleSheets[0].cssRules`.
Calling `myRules[0].media` therefore returns a `MediaList`
object representing the media query.

```css
@media (width >= 500px) {
  body {
    color: blue;
  }
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].media); // a MediaList
```
