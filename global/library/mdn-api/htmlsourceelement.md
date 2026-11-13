---
title: "HTMLSourceElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlsourceelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLSourceElement

The **`HTMLSourceElement`** interface provides special properties (beyond the regular `HTMLElement` object interface it also has available to it by inheritance) for manipulating `` elements.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLSourceElement.height`
    A number that reflects the `height` HTML attribute, indicating the height of the image resource in CSS pixels. The property has a meaning only if the parent of the current `` element is a `` element.
- `HTMLSourceElement.media`
    A string reflecting the `media` HTML attribute, containing the intended type of the media resource.
- `HTMLSourceElement.sizes`
    A string representing image sizes between breakpoints
- `HTMLSourceElement.src`
    A string reflecting the `src` HTML attribute, containing the URL for the media resource. The `HTMLSourceElement.src` property has a meaning only when the associated `` element is nested in a media element that is a `` or an `<audio>` element. It has no meaning and is ignored when it is nested in a `` element.

    > **Note:**
    > If the `src` property is updated (along with any siblings), the parent `HTMLMediaElement`'s `load` method should be called when done, since `` elements are not re-scanned automatically.

- `HTMLSourceElement.srcset`
    A string reflecting the `srcset` HTML attribute, containing a list of candidate images, separated by a comma (`',', U+002C COMMA`). A candidate image is a URL followed by a `'w'` with the width of the images, or an `'x'` followed by the pixel density.
- `HTMLSourceElement.type`
    A string reflecting the `type` HTML attribute, containing the type of the media resource.
- `HTMLSourceElement.width`
    A number that reflects the `width` HTML attribute, indicating the width of the image resource in CSS pixels. The property has a meaning only if the parent of the current `` element is a `` element.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: ``.
- The HTML DOM APIs of the elements that can contain a `` element: `HTMLVideoElement`, `HTMLAudioElement`, `HTMLPictureElement`.
