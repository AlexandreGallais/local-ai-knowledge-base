---
title: "`<url>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/url_value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<url>` CSS type

The **`<url>`** CSS data type is a pointer to a resource.

## Syntax

```plain
<url> = url()
```

### Values

The value may be an absolute or relative URL.

- `<url()>`
    The `url()` function accepts a URL, which may be written as a quoted string or as an unquoted URL token.

> **Note:**
> The CSS values and units module also introduces the `src()` function as a `<url>` value. Currently, no browser supports this feature.

## Description

The `<url>` data type, written with the `url()` function, represents a `URL`, which is a pointer to an internal or external resource. The resource can be an image, a video, a CSS file, a font file, an SVG feature, etc. The URL may be absolute or relative.

```css
/* Relative URL */
url("styles.css")
url("assets/icon.svg")
url("../assets/image.png")

/* Absolute URL */
url("http://example.com/fonts/myFont.woff2")
url("https://example.com/images/background.jpg")

/* Data URL */
url("data:image/svg+xml,%3Csvg'%3E%3Cpath d='M10 10h60' stroke='%2300F' stroke-width='5'/%3E%3Cpath d='M10 20h60' stroke='%230F0' stroke-width='5'/%3E%3C/svg%3E")
url("data:image/png;base64,iVBORw0KGgoAAA...")
```

### External resources and CORS

The ability to import external resources via the `<url>` value is implementation-defined and often restricted for security reasons.

Depending on the CSS property on which a `<url>` referencing external resources is applied, the resource may be subject to Cross-Origin Resource Sharing (CORS) restrictions.

Some CSS properties, including `mask-image`, `filter`, as well as `clip-path` and a few others when referring to `` image elements, may require successful CORS validation when they cause external, cross-origin resources to be fetched in CORS mode. If CORS validation fails, the resource may be blocked and therefore not used for rendering.

Note that the `<url>` value type does not enforce CORS validation itself, but individual CSS properties do.

When opening an HTML file directly with `file://`, resources may fail because CORS rules apply locally. Modern browsers treat `file://` as a unique origin, meaning cross-file resources can get blocked. In this case, an HTTP server may be hosted to avoid CORS errors. The security behavior of `file://` URLs also varies depending on the browser and the operating system's file permissions.

## Examples

Relative URL

```css
body {
  background-image: url("images/background.jpg");
}
```

Absolute URL

```css
body {
  background-image: url("https://example.com/images/background.jpg");
}
```

## See also

- `url()`
