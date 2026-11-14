---
title: "`<body>` HTML document body element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/body/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<body>` HTML document body element

The **`<body>`** HTML element represents the content of an HTML document. There can be only one `<body>` element in a document.

## Attributes

This element includes the global attributes, event attributes, and deprecated attributes:

### Event attributes

> **Note:**
> Each of the below event attribute names is linked to its equivalent `Window` interface event. You can listen to these events using `addEventListener()` instead of adding the `oneventname` attribute to the `<body>` element.

- `onafterprint`
    Function to call after the user has printed the document.
- `onbeforeprint`
    Function to call when the user requests printing of the document.
- `onbeforeunload`
    Function to call when the document is about to be unloaded.
- `onblur`
    Function to call when the document loses focus.
- `onerror`
    Function to call when the document fails to load properly.
- `onfocus`
    Function to call when the document receives focus.
- `onhashchange`
    Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed.
- `onlanguagechange`
    Function to call when the preferred languages changed.
- `onload`
    Function to call when the document has finished loading.
- `onmessage`
    Function to call when the document has received a message.
- `onmessageerror`
    Function to call when the document has received a message that cannot be deserialized.
- `onoffline`
    Function to call when network communication has failed.
- `ononline`
    Function to call when network communication has been restored.
- `onpageswap`
    Function to call when you navigate across documents, when the previous document is about to unload.
- `onpagehide`
    Function to call when the browser hides the current page in the process of presenting a different page from the session's history.
- `onpagereveal`
    Function to call when a document is first rendered, either when loading a fresh document from the network or activating a document.
- `onpageshow`
    Function to call when the browser displays the window's document due to navigation.
- `onpopstate`
    Function to call when the user has navigated session history.
- `onresize`
    Function to call when the document has been resized.
- `onrejectionhandled`
    Function to call when a JavaScript `Promise` is handled late.
- `onstorage`
    Function to call when the storage area has changed.
- `onunhandledrejection`
    Function to call when a JavaScript `Promise` that has no rejection handler is rejected.
- `onunload` (deprecated)
    Function to call when the document is going away.

### Deprecated attributes

> **Warning:**
> Do not use these deprecated attributes; opt for the CSS alternatives listed with each deprecated attribute instead.

- `alink` (deprecated)
    Color of text for hyperlinks when selected.
    Use the CSS `color` property in conjunction with the `:active` and `:focus` pseudo-classes instead.
- `background` (deprecated)
    URI of an image to use as a background.
    Use the CSS `background-image` property instead.
- `bgcolor` (deprecated)
    Background color for the document.
    Use the CSS `background-color` property instead.
- `bottommargin` (deprecated)
    Ignored.
- `leftmargin` (deprecated)
    The margin of the left and right of the body.
    Use the CSS `margin-left` and `margin-right` properties (or the logical `margin-inline` property) instead.
- `link` (deprecated)
    Color of text for unvisited hypertext links.
    Use the CSS `color` property in conjunction with the `:link` pseudo-class instead.
- `rightmargin` (deprecated)
    Ignored.
- `text` (deprecated)
    Foreground color of text.
    Use the CSS `color` property instead.
- `topmargin` (deprecated)
    The margin of the top and bottom of the body.
    Use the CSS `margin-top` and `margin-bottom` properties (or the logical `margin-block` property) instead.
- `vlink` (deprecated)
    Color of text for visited hypertext links.
    Use the CSS `color` property in conjunction with the `:visited` pseudo-class instead.

## Examples

```html
<html lang="en">
  <head>
    <title>Document title</title>
  </head>
  <body>
    <p>
      The <code>&lt;body&gt;</code> HTML element represents the content of an
      HTML document. There can be only one <code>&lt;body&gt;</code> element in
      a document.
    </p>
  </body>
</html>
```

## Technical summary

       |
        Content categories

       |
        None.

       | Permitted content
       |
        Flow content.

       | Tag omission
       |
        The start tag may be omitted if the element is empty, or if the first
        thing inside it is not ASCII whitespace or a comment, except if the
        first thing inside it is a `<meta>`,
        `<noscript>`, `<link>`,
        `<script>`, `<style>`, or
        `<template>` element. The end tag may be omitted if the
        `&#x3C;body>` element is not immediately followed by a
        comment.

       | Permitted parents
       |
        It must be the second element of an `<html>`
        element.

       | Implicit ARIA role
       |
        <code
          >generic</code
        >

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       |
        `HTMLBodyElement`

            The `&#x3C;body>` element exposes the
            `HTMLBodyElement` interface.

            You can access the `&#x3C;body>` element through the
            `document.body` property.

## See also

- `<html>`
- `<head>`
- Event handling overview
