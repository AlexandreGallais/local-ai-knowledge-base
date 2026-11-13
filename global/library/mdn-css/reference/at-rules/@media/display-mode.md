---
title: "`display-mode` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/display-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `display-mode` CSS media feature

The **`display-mode`** CSS media feature can be used to test whether a web app is being displayed in a normal browser tab or in some alternative way, such as a standalone app or fullscreen mode.

For example:

- A progressive web app can set its display mode by setting the `display` member in its manifest. In this case, the value of `display-mode` identifies the value that was set (but note that this may not be the same as the value requested in the manifest, since a browser may not support the requested mode).

- Any web app can use the Fullscreen API or the Document Picture-in-Picture API to set the display mode, and in this case the value of `display-mode` identifies the mode that was set.

The `display-mode` value applies to the top-level browsing context and any child browsing contexts.

## Syntax

The `display-mode` feature is specified as a keyword value chosen from the list below.

- `browser`
    The application opens in a conventional browser tab or new window, depending on the browser and platform.
- `fullscreen`
    All of the available display area is used and no user agent chrome is shown. This can be used to apply CSS only when the app has been put in fullscreen mode by the Fullscreen API or by using the `fullscreen` value of the `display` member of the Wep App Manifest.
- `minimal-ui`
    The application will look and feel like a standalone application, but will have a minimal set of UI elements for controlling navigation. The elements will vary by browser.
- `picture-in-picture`
    This mode allows users to continue consuming specific content while they interact with other sites or applications on their device. The app is displayed in a floating and always-on-top window. This can be used to apply CSS only when the app has been put in Picture-in-Picture mode by the Document Picture-in-Picture API.
- `standalone`
    The application will look and feel like a standalone application. This can include the application having a different window, its own icon in the application launcher, etc. In this mode, the user agent will exclude UI elements for controlling navigation, but can include other UI elements such as a status bar.
- `window-controls-overlay`
    In this mode, the application looks and feels like a standalone desktop application, and the Window Controls Overlay feature is enabled.

## Examples

### Apply CSS if the application is in fullscreen mode

```css
@media (display-mode: fullscreen) {
  body {
    margin: 0;
    border: 5px solid black;
  }
}
```

### Provide a light and dark color scheme to Picture-in-Picture content

In this example, we combine the `display-mode: picture-in-picture` value with the `prefers-color-scheme` media feature to create light and dark color schemes that are applied based on the user's color scheme preference, only when the app is being shown in Picture-in-Picture mode.

```css
@media (display-mode: picture-in-picture) and (prefers-color-scheme: light) {
  body {
    background: antiquewhite;
  }
}

@media (display-mode: picture-in-picture) and (prefers-color-scheme: dark) {
  body {
    background: #333333;
  }

  a {
    color: antiquewhite;
  }
}
```

See Using the Document Picture-in-Picture API for more information and a full example.

## See also

- Using Media Queries
- @media
