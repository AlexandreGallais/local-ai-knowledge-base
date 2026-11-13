---
title: "`env()` CSS function (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/env/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `env()` CSS function (part 2 of 2)

## Examples

### Using env() to ensure buttons are not obscured by device UI

In the following example, `env()` is used to ensure that fixed app toolbar buttons are not obscured by device notifications appearing at the bottom of the screen. On the desktop `safe-area-inset-bottom` is `0`. However, in devices that display notifications at the bottom of the screen, such as iOS, it contains a value that leaves space for the notification to display. This can then be used in the value for `padding-bottom` to create a gap that appears natural on that device.

#### HTML

We have a `` section containing a fake application and a `` containing two `` elements:

```html
<main>Main content of app here</main>
<footer>
  <button>Go here</button>
  <button>Or here</button>
</footer>
```

#### CSS

Using CSS flexible box layout, we create a footer that is only as tall as it needs to be, while the main section containing the application fills up the rest of the viewport:

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font: 1em system-ui;
}

main {
  flex: 1;
  background-color: #eeeeee;
  padding: 1em;
}

footer {
  flex: none;
  display: flex;
  gap: 1em;
  justify-content: space-evenly;
  background: black;
}

button {
  padding: 1em;
  background: white;
  color: black;
  margin: 0;
  width: 100%;
  border: none;
  font: 1em system-ui;
}
```

We set `position: sticky` to stick the footer to the bottom of the viewport. We then use the `padding` shorthand to add padding to the footer. We include the value of the `safe-area-inset-bottom` environment value to an initial `1em` of bottom padding. A larger black area will display on devices that have a positive value for this variable, ensuring the buttons in the footer are never obscured.

```css
footer {
  position: sticky;
  bottom: 0;

  padding: 1em 1em calc(1em + env(safe-area-inset-bottom));
}
```

#### Results

### Using a fallback value

This example makes use of the optional second parameter of `env()`, which provides a fallback value in case the environment variable is not available.

#### HTML

We include a paragraph of text:

```html
<p>
  If the <code>env()</code> function is supported in your browser, this
  paragraph's text will have 50px of padding between it and the left border —
  but not the top, right and bottom. This is because the accompanying CSS is the
  equivalent of <code>padding: 0 0 0 50px</code>, because, unlike other CSS
  properties, user agent property names are case-sensitive.
</p>
```

#### CSS

We set a `width` of `300px` and a `border`. We then add `padding`, using the `env()` function with a fallback for the size of the padding on each side. We intentionally set an invalid value for the left padding (remember, environment variable names are case-sensitive), to demonstrate the use of the fallback value.

```css
p {
  width: 300px;
  border: 2px solid red;
  padding: env(safe-area-inset-top, 50px) env(safe-area-inset-right, 50px)
    env(safe-area-inset-bottom, 50px) env(SAFE-AREA-INSET-LEFT, 50px);
}
```

#### Results

### Using env() to ensure content is not obscured by window control buttons in desktop PWAs

In the following example, `env()` ensures that content displayed in a desktop Progressive Web App that uses the Window Controls Overlay API is not obscured by the operating system's window control buttons. The `titlebar-area-*` values define a rectangle where the title bar would normally have been displayed. On devices that do not support the Window Controls Overlay feature, such as mobile devices, the fallback values are used.

Here is what a PWA installed on a desktop device normally looks like:

With the Window Controls Overlay feature, the web content covers the whole app window surface area, with the window controls and PWA buttons displayed as overlays:

```html
<header>Title of the app here</header>
<main>Main content of app here</main>
```

```css
header {
  position: fixed;
  left: env(titlebar-area-x);
  top: env(titlebar-area-y);
  width: env(titlebar-area-width);
  height: env(titlebar-area-height);
}

main {
  margin-top: env(titlebar-area-height);
}
```

> **Note:**
> Using `position:fixed` makes sure the header does not scroll with the rest of the content, and instead stays aligned with the window control buttons, even on device/browsers that support elastic overscroll (also known as rubber banding).

### Viewport segments

The Viewport segment API demo and Using the Viewport Segments API guide provides a demonstration and explanation of using the `env()` function with the `viewport-segments-*` environment variables.

## See also

- Using environment variables
- CSS environment variables module
- `var`
- CSS custom properties for cascading variables module
- Custom properties (`--*`): CSS variables
- `<meta name="text-scale">`
- Using CSS custom properties (variables)
- Viewport Segments API
- Customize the window controls overlay of your PWA's title bar
- Display content in the title bar
- Breaking Out of the Box
