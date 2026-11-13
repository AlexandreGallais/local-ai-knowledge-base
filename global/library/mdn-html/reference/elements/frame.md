---
title: "`<frame>` HTML frame element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/frame/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<frame>` HTML frame element

The **`<frame>`** HTML element defines a particular area in which another HTML document can be displayed. A frame should be used within a `<frameset>`.

Using the `<frame>` element is not encouraged because of certain disadvantages such as performance problems and lack of accessibility for users with screen readers. Instead of the `<frame>` element, `` may be preferred.

## Attributes

Like all other HTML elements, this element supports the global attributes.

- `src` (deprecated) (non-standard)
    This attribute specifies the document that will be displayed by the frame.
- `name` (deprecated) (non-standard)
    This attribute is used for labeling frames. Without labeling, every link will open in the frame that it's in – the closest parent frame. See the `target` attribute for more information.
- `noresize` (deprecated) (non-standard)
    This attribute prevents resizing of frames by users.
- `scrolling` (deprecated) (non-standard)
    This attribute defines the existence of a scrollbar. If this attribute is not used, the browser adds a scrollbar when necessary. There are two choices: "yes" for forcing a scrollbar even when it is not necessary and "no" for forcing no scrollbar even when it _is_ necessary.
- `marginheight` (deprecated) (non-standard)
    This attribute defines the height of the margin between frames.
- `marginwidth` (deprecated) (non-standard)
    This attribute defines the width of the margin between frames.
- `frameborder` (deprecated) (non-standard)
    This attribute allows you to specify a frame's border.

## Example

### A frameset document

A frameset document has a `<frameset>` element instead of a `<body>` element. The `<frame>` elements are placed within the `<frameset>`.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <!-- Document metadata goes here -->
  </head>
  <frameset cols="400, 500">
    <frame src="https://developer.mozilla.org/en/HTML/Element/iframe" />
    <frame src="https://developer.mozilla.org/en/HTML/Element/frame" />
  </frameset>
</html>
```

If you want to embed another HTML page into the `<body>` of a document, use an `` element.

## See also

- `<frameset>`
- ``
