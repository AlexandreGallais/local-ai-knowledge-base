---
title: "ChapterInformation: artwork property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/chapterinformation/artwork/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ChapterInformation: artwork property

The **`artwork`** read-only property of the
`ChapterInformation` interface returns an `Array` of objects representing images associated with the chapter.

## Value

An `Array` of objects. Each object contains the following properties:

- `src`
    A string representing the URL from which the user agent fetches the image's data.
- `sizes`
    A string representing one or more sizes for the resource. Its value can be the keyword `any` (representing a scalable vector format such as SVG), or a space-separated list of tokens in the format `<width in pixels>x<height in pixels>` or `<width in pixels>X<height in pixels>`. If multiple sizes are provided, the user agent can load the size most appropriate for the current context, provided those sizes are available in the linked resource.
- `type`
    A string representing a MIME type hint that allows the user agent to ignore image types that it doesn't support. However, the user agent may still use MIME-type sniffing after downloading the image to determine its type.

## Examples

See the main `ChapterInformation` page for an example.

## See also

- `ChapterInformation`
