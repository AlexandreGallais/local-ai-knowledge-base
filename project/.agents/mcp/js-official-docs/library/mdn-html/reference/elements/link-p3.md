---
title: "`<link>` HTML external resource link element (part 3 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/link/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<link>` HTML external resource link element (part 3 of 3)

## Examples

### Including a stylesheet

To include a stylesheet in a page, use the following syntax:

```html
<link href="style.css" rel="stylesheet" />
```

### Providing alternative stylesheets

You can also specify alternative style sheets.

The user can choose which style sheet to use by choosing it from the **View > Page Style** menu.
This provides a way for users to see multiple versions of a page.

```html
<link href="default.css" rel="stylesheet" title="Default Style" />
<link href="fancy.css" rel="alternate stylesheet" title="Fancy" />
<link href="basic.css" rel="alternate stylesheet" title="Basic" />
```

### Providing icons for different usage contexts

You can include links to several icons on the same page, and the browser will choose which one works best for its particular context using the `rel` and `sizes` values as hints.

```html
<!-- iPad Pro with high-resolution Retina display: -->
<link
  rel="apple-touch-icon"
  sizes="167x167"
  href="/apple-touch-icon-167x167.png" />
<!-- 3x resolution iPhone: -->
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/apple-touch-icon-180x180.png" />
<!-- non-Retina iPad, iPad mini, etc.: -->
<link
  rel="apple-touch-icon"
  sizes="152x152"
  href="/apple-touch-icon-152x152.png" />
<!-- 2x resolution iPhone and other devices: -->
<link rel="apple-touch-icon" href="/apple-touch-icon-120x120.png" />
<!-- basic <example-value> -->
<link rel="icon" href="/favicon.ico" />
```

For information about what `sizes` to choose for Apple icons, see Apple's documentation on configuring web applications and the referenced Apple human interface guidelines. Usually, it is sufficient to provide a large image, such as 192x192, and let the browser scale it down as needed, but you may want to provide images with different levels of detail for different sizes, as the Apple design guideline recommends. Providing smaller icons for lower resolutions also saves bandwidth.

It may not be necessary to provide `<link>` elements at all. For example, browsers automatically request `/favicon.ico` from the root of a site, and Apple also automatically requests `/apple-touch-icon-[size].png`, `/apple-touch-icon.png`, etc. However, providing explicit links protects you against changes to these conventions.

### Conditionally loading resources with media queries

You can provide a media type or query inside a `media` attribute;
this resource will then only be loaded if the media condition is true. For example:

```html
<link href="print.css" rel="stylesheet" media="print" />
<link href="mobile.css" rel="stylesheet" media="all" />
<link href="desktop.css" rel="stylesheet" media="screen and (width >= 600px)" />
<link
  href="highres.css"
  rel="stylesheet"
  media="screen and (resolution >= 300dpi)" />
```

### Stylesheet load events

You can determine when a style sheet has been loaded by watching for a `load` event to fire on it; similarly, you can detect if an error has occurred while processing a style sheet by watching for an `error` event:

```html
<link rel="stylesheet" href="mystylesheet.css" id="my-stylesheet" />
```

```js
const stylesheet = document.getElementById("my-stylesheet");

stylesheet.onload = () => {
  // Do something interesting; the sheet has been loaded
};

stylesheet.onerror = () => {
  console.log("An error occurred loading the stylesheet!");
};
```

> **Note:**
> The `load` event fires once the stylesheet and all of its imported content has been loaded and parsed, and immediately before the styles start being applied to the content.

### Preload examples

You can find a number of `<link rel="preload">` examples in Preloading content with `rel="preload"`.

### Blocking rendering till a resource is fetched

You can include `render` token <example-value> a `blocking` attribute;
the rendering of the page will be blocked till the resource and its critical subresources are fetched and applied to the document. For example:

```html
<link blocking="render" rel="stylesheet" href="example.css" crossorigin />
```

## Technical summary

       |
        Content categories

       |
        Metadata content.
        If <code>itemprop</code> is present:
        Flow content and
        phrasing content.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |
        Any element that accepts metadata elements.
        If itemprop is present: any element that accepts
        phrasing content.

       | Implicit ARIA role
       | `link` with `href` attribute

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLLinkElement`

## See also

- `Link` HTTP header
- `Referrer-Policy` HTTP header
