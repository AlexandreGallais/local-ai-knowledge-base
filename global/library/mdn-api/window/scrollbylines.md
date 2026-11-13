---
title: "Window: scrollByLines() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/scrollbylines/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: scrollByLines() method

The **`Window.scrollByLines()`** method scrolls the document by
the specified number of lines.

## Syntax

```js
scrollByLines(lines)
```

### Parameters

- `lines`
    The number of lines to scroll the document by. It may be a
    positive or negative integer.

### Return value

None (`undefined`).

## Examples

```html
<button id="scroll-up">Up 5 lines</button>
<button id="scroll-down">Down 5 lines</button>
```

```js
document.getElementById("scroll-up").addEventListener("click", () => {
  window.scrollByLines(-5);
});
document.getElementById("scroll-down").addEventListener("click", () => {
  window.scrollByLines(5);
});
```

## Specifications

This is not part of any specification.

## See also

- `window.scroll()`
- `window.scrollBy()`
- `window.scrollByPages()`
- `window.scrollTo()`
