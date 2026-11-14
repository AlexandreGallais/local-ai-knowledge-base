---
title: "`<meta name=\"theme-color\">` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/meta/name/theme-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<meta name="theme-color">` HTML attribute value

The **`theme-color`** value for the `name` attribute of the `<meta>` element indicates a suggested color that user agents should use to customize the display of the page or of the surrounding user interface.
If specified, you define a theme color using a `content` attribute in the `<meta>` element as a CSS `<color>` value.

For example, to indicate that a document should use `cornflowerblue` as a theme color, set the `<meta>` as:

```html
<meta name="theme-color" content="cornflowerblue" />
```

To set the media to which the theme color metadata applies, include the `media` attribute with a valid media query list (see the `theme-color` media query example).

## Usage notes

A `<meta name="theme-color">` element has the following additional attributes:

- `content`
    A `<meta>` element with `name=theme-color` must have a `content` attribute that defines the theme color.
    The value of `content` attribute is as follows:
    - `<color>` value
        A valid color value, such as hexadecimal, RGB, named color, etc.
- `media` (optional)
    Any valid media type or query.
    If provided, the options for the document's theme color defined in the `content` attribute are suggested to the browser when the media query matches.

## Examples

### Setting a color value

Consider the following code that uses `<meta>` to set a theme color:

```html
<meta name="theme-color" content="#4285f4" />
```

The following image shows the effect of this setting in Chrome on an Android mobile device:

_Image credit: from Icons & Browser Colors, created and shared by Google and used according to terms described in the Creative Commons 4.0 Attribution License._

### Using a media query with `theme-color`

You can provide a media type or query inside the `media` attribute.
The `theme-color` will then only be set if the media condition is true.
For example:

```html
<meta
  name="theme-color"
  content="cornflowerblue"
  media="(prefers-color-scheme: light)" />
<meta
  name="theme-color"
  content="dimgray"
  media="(prefers-color-scheme: dark)" />
```

## See also

- `<meta>` `name` attribute `color-scheme` value
- `color-scheme` CSS property
- `@media/prefers-color-scheme` media query
