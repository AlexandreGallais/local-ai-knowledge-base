---
title: "HTMLImageElement: isMap property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/ismap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: isMap property

The **`isMap`** property of the `HTMLImageElement` interface indicates that the image is part of a server-side map. If so, the coordinates where the user clicked on the image are sent to the server. It reflects the `` element's `ismap` content attribute. This attribute is allowed only if the `` element is a descendant of an `` element with a valid `href` attribute.

> **Note:**
> For accessibility reasons, you should generally avoid using server-side image maps, as they require the use of a mouse. Use a client-side image map instead.

## Value

A Boolean value which is `true` if the image is being used for a server-side image map; otherwise, the value is `false`.

## Usage notes

When an image marked as being part of a server-side image map is clicked, the browser constructs the string "?x,y", where x and y indicate the coordinates at which the mouse was clicked as offsets from the top-left corner of the image, specified in CSS pixels.

The browser then fetches that URL from the server and displays or downloads it depending on the value of the `download` attribute.

Unlike server-side image maps, client-side image maps don't cause the `` element to adopt interactive content mode.
