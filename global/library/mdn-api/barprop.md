---
title: "BarProp"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/barprop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BarProp

The **`BarProp`** interface of the Document Object Model represents the web browser user interface elements that are exposed to scripts in web pages. Each of the following interface elements are represented by a `BarProp` object.

- `Window.locationbar`
    The browser location bar.
- `Window.menubar`
    The browser menu bar.
- `Window.personalbar`
    The browser personal bar.
- `Window.scrollbars`
    The browser scrollbars.
- `Window.statusbar`
    The browser status bar.
- `Window.toolbar`
    The browser toolbar.

The `BarProp` interface is not accessed directly, but via one of these elements.

## Instance properties

- `BarProp.visible` (read-only)
    A `Boolean`, which is true if the bar represented by the used interface element is visible.

## Examples

The following example prints a `BarProp` object to the console that represents the location bar.

```js
console.log(window.locationbar);
```
