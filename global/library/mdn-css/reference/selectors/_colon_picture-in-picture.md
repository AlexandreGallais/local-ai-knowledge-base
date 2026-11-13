---
title: "`:picture-in-picture` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_picture-in-picture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:picture-in-picture` CSS pseudo-class

The **`:picture-in-picture`** CSS pseudo-class matches the element which is currently in picture-in-picture mode.

## Syntax

```css
:picture-in-picture {
  /* ... */
}
```

## Usage notes

The `:picture-in-picture` pseudo-class lets you configure your stylesheets to automatically adjust the size, style, or layout of content when a video switches back and forth between picture-in-picture and traditional presentation modes.

## Examples

In this example, a video has a box shadow when it is displayed in the floating window.

### HTML

The page's HTML looks like this:

```html
<h1>MDN Web Docs Demo: :picture-in-picture pseudo-class</h1>

<p>
  This demo uses the <code>:picture-in-picture</code> pseudo-class to
  automatically change the style of a video entirely using CSS.
</p>

<video id="pip-video"></video>
```

The `` with the ID `"pip-video"` will change between having a red box shadow or not, depending on whether or not it is displayed in the picture-in-picture floating window.

### CSS

The magic happens in the CSS.

```css
:picture-in-picture {
  box-shadow: 0 0 0 5px red;
}
```

## See also

- Picture-in-picture API
- `HTMLVideoElement.requestPictureInPicture()`
- `HTMLVideoElement.disablePictureInPicture`
- `Document.pictureInPictureEnabled`
- `Document.exitPictureInPicture()`
- `Document.pictureInPictureElement`
