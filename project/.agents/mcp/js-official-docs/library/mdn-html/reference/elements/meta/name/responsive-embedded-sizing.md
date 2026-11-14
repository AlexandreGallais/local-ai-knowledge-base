---
title: "<meta name=\"responsive-embedded-sizing\">"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/meta/name/responsive-embedded-sizing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <meta name="responsive-embedded-sizing">

The **`responsive-embedded-sizing`** value for the `name` attribute of a `<meta>` element opts in a document embedded in an `` to sharing its size information with the parent document. The frame can then be sized relative to its contained document's layout size using the `frame-sizing` CSS property.

## Description

For security and privacy reasons, `` elements do not by default expose any information to the parent document about the size of the content in the document they are embedding.

To enable responsive sizing of `` elements based on their content, the `<meta name="responsive-embedded-sizing">` tag can be included in an embedded document to opt it in to sharing its size information with the parent document.

The `frame-sizing` CSS property can then be set on the `` to cause it to adopt the same horizontal or vertical size as the embedded document's actual content size (termed the **internal layout intrinsic size** in the spec, but abbreviated to "layout size" in our documentation). This allows `` content to fit seamlessly into the embedding element and avoid unnecessary scrollbars.

To resize the `` dynamically as the embedded document changes layout size, you can call the `Window.requestResize()` method from the embedded document to make it report an updated size.

## Examples

See the `frame-sizing` and `Window.requestResize()` pages for complete examples.

## See also

- `Window.requestResize()`
- `frame-sizing` CSS property
- CSS box sizing module
