---
title: "Window: scrollByPages() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/scrollbypages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: scrollByPages() method

The **`Window.scrollByPages()`** method scrolls the current
document by the specified number of pages.

## Syntax

```js
scrollByPages(pages)
```

### Parameters

- `pages`
    The number of pages to scroll. It may be a positive or
    negative integer.

### Return value

None (`undefined`).

## Examples

```js
// scroll down the document by 1 page
window.scrollByPages(1);

// scroll up the document by 1 page
window.scrollByPages(-1);
```

## Specifications

DOM Level 0. Not part of specification.

## See also

- `window.scroll()`
- `window.scrollBy()`
- `window.scrollByLines()`
- `window.scrollTo()`
