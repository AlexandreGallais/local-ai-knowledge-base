---
title: "CSSImportRule: media property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssimportrule/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSImportRule: media property

The read-only **`media`** property of the `CSSImportRule` interface returns a `MediaList` object representing the media query list of the `@import` rule.

## Value

A `MediaList` object.

Although the `media` property itself is read-only in the sense that you can't replace the `MediaList` object, you can still assign to the `media` property directly, which is equivalent to assigning to its `mediaText` property. You can also modify the `MediaList` object using the `appendMedium()` and `deleteMedium()` methods.

## Examples

### Getting the media property

The following stylesheet includes a single `@import` rule. Therefore the
first item in the list of CSS rules will be a `CSSImportRule`. The
`media` property returns a `MediaList` object. This includes
the `mediaText` property with a value of `screen`.

```css
@import "style.css" screen;
```

```js
const myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].media); // A MediaList
```

### Setting the media property

To change the `media` attribute of the associated stylesheet, set the value of `media` to a string containing the new value.

```js
const myRules = document.styleSheets[0].cssRules;
myRules[0].media = "print";
```
