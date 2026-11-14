---
title: "`prefers-reduced-data` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `prefers-reduced-data` CSS media feature

> **Warning:**
> This feature is not supported by any user agent and its specifics are subject to change.

The **`prefers-reduced-data`** CSS media feature is used to detect if the user has requested web content that consumes less internet traffic.

The browser typically achieves this by querying the underlying operating system's preferences for reduced data.

## Syntax

- `no-preference`
    Indicates that the user has made no preference known to the system. This keyword evaluates to false in the Boolean context.
- `reduce`
    Indicates that the user has expressed a preference for lightweight alternate content.

## Examples

### Basic usage

In this example, the `montserrat-regular.woff2` font file will neither be preloaded nor downloaded if the user prefers reduced data; in this case, the "system font stack" will serve as the fallback font:

### HTML

```html
<head>
  <link
    rel="preload"
    href="fonts/montserrat-regular.woff2"
    as="font"
    media="(prefers-reduced-data: no-preference)"
    crossorigin />
  <link rel="stylesheet" href="style.css" />
</head>
```

### CSS

```css
@media (prefers-reduced-data: no-preference) {
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    /* latin */
    src:
      local("Montserrat Regular"),
      local("Montserrat-Regular"),
      url("fonts/montserrat-regular.woff2") format("woff2");
    unicode-range:
      U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }
}

body {
  font-family:
    "Montserrat",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    sans-serif;
}
```

## See also

- `Save-Data` HTTP header
