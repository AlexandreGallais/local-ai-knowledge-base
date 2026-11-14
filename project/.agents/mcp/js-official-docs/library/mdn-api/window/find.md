---
title: "Window: find() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/find/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: find() method

> **Note:**
> Support for `Window.find()` might change in future
> versions of Gecko. See Firefox bug 672395.

The **`Window.find()`** method finds a string in a window sequentially.

## Syntax

```js
find(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog)
```

### Parameters

- `string`
    The text string for which to search.
- `caseSensitive`
    A boolean value. If `true`, specifies a case-sensitive search.
- `backwards`
    A boolean value. If `true`, specifies a backward search.
- `wrapAround`
    A boolean value. If `true`, specifies a wrap around search.
- `wholeWord`
    A boolean value. If `true`, specifies a whole word search.
- `searchInFrames`
    A boolean value. If `true`, specifies a search in frames.
- `showDialog`
    A boolean value. If `true`, a search dialog is shown.

### Return value

`true` if the string is found; otherwise, `false`.

## Examples

### HTML

```html
<p>Apples, Bananas, and Oranges.</p>
<button type="button" id="find-apples">Search for Apples</button>
<button type="button" id="find-bananas">Search for Bananas</button>
<button type="button" id="find-orange">Search for Orange</button>
<p id="output"></p>
```

### JavaScript

```js
function findString(text) {
  document.querySelector("#output").textContent = `String found? ${window.find(
    text,
  )}`;
}

document.getElementById("find-apples").addEventListener("click", () => {
  findString("Apples");
});
document.getElementById("find-bananas").addEventListener("click", () => {
  findString("Bananas");
});
document.getElementById("find-orange").addEventListener("click", () => {
  findString("Orange");
});
```

## Notes

In some browsers, `Window.find()` selects (highlights) the found content on
the site.

## Specifications

This is not part of any specification.
