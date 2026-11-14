---
title: "`:fullscreen` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_fullscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:fullscreen` CSS pseudo-class

The **`:fullscreen`** CSS pseudo-class matches every element that is currently in fullscreen mode. If multiple elements have been put into fullscreen mode, this selects them all.

## Syntax

```css
:fullscreen {
  /* ... */
}
```

## Usage notes

The `:fullscreen` pseudo-class lets you configure your stylesheets to automatically adjust the size, style, or layout of content when elements switch back and forth between fullscreen and traditional presentations.

## Examples

### Styling a fullscreen element

This example applies a different background color to a `` element, depending on whether or not it is in fullscreen mode. It includes a `` to toggle fullscreen on and off.

```html
<div class="element">
  <h1><code>:fullscreen</code> pseudo-class demo</h1>

  <p>
    This demo uses the <code>:fullscreen</code> pseudo-class to automatically
    change the background color of the <code>.element</code> div.
  </p>

  <p>
    Normally, the background is light yellow. In fullscreen mode, the background
    is light pink.
  </p>

  <button class="toggle">Toggle Fullscreen</button>
</div>
```

The `:fullscreen` pseudo-class is used to override the `background-color` of the `` when it is in fullscreen mode.

```css
.element {
  background-color: lightyellow;
}

.element:fullscreen {
  background-color: lightpink;
}
```

The following JavaScript provides an event handler function that toggles fullscreen when the `` is clicked.

```js
document.querySelector(".toggle").addEventListener("click", (event) => {
  if (document.fullscreenElement) {
    // If there is a fullscreen element, exit full screen.
    document.exitFullscreen();
    return;
  }
  // Make the .element div fullscreen.
  document.querySelector(".element").requestFullscreen();
});
```

```css
.element {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  padding: 1.2em;
}
```

## See also

- `::backdrop`
- `:xr-overlay`
- CSS selectors module
- Guide to the Fullscreen API
- Fullscreen API
- DOM API: `Element.requestFullscreen()`, `Document.exitFullscreen()`, `Document.fullscreenElement`
- `allowfullscreen` attribute
