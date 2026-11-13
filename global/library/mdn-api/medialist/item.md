---
title: "MediaList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList: item() method

The **`item()`** method of the `MediaList` interface returns the media query at the specified `index`, or `null` if the specified `index` doesn't exist.

## Syntax

```js
item(index)
[index]
```

> **Note:**
> The bracket (`[]`) syntax can be used instead of the `item()` syntax.

### Parameters

- `index`
    An integer.

### Return value

If the bracket (`[]`) syntax is used and there is no entry for the given index, `undefined` is returned.

## Examples

The following would log to the console each media query stored in the
`MediaList` associated with the first stylesheet applied to the current document.

```js
const stylesheet = document.styleSheets[0];
console.log(stylesheet.media.length);
console.log(stylesheet.media.item(0)); // Returns a string like "print"
console.log(stylesheet.media.item(5)); // Returns null if there is no 5th entry
console.log(stylesheet.media[1]); // Returns a string like "print"
console.log(stylesheet.media[5]); // Returns undefined if there is no 5th entry
```
