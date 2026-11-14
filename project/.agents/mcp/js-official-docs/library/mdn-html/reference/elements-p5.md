---
title: "HTML elements reference (part 5 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML elements reference (part 5 of 7)

| ``      | Represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. This is rendered by default as a single solid underline but may be altered using CSS.                                                                                                                                                                                                                                                                                                                                 |
| ``    | Represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.                                                                                                                                                                                                                                                                                                                           |
| ``    | Represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.                                                                                                                                                                                                                                                                                                                                                 |

## Image and multimedia

HTML supports various multimedia resources such as images, audio, and video.

| Element                  | Description                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<area>`  | Defines an area inside an image map that has predefined clickable areas. An _image map_ allows geometric areas on an image to be associated with hyperlink.                                                                                               |
| `<audio>` | Used to embed sound content in documents. It may contain one or more audio sources, represented using the `src` attribute or the source element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a `MediaStream`. |
| ``   | Embeds an image into the document.                                                                                                                                                                                                                                                     |
| `<map>`   | Used with `<area>` elements to define an image map (a clickable link area).                                                                                                                                                                                             |
| `<track>` | Used as a child of the media elements, audio and video. It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (`.vtt` files)—Web Video Text Tracks.   |
| `` | Embeds a media player which supports video playback into the document. You can also use `` for audio content, but the audio element may provide a more appropriate user experience.                                                                                             |

## Embedded content

In addition to regular multimedia content, HTML can include a variety of other content, even if it's not always easy to interact with.

| Element                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``   | Embeds external content at the specified point in the document. This content is handled by the browser or an external application.                                                                                                                                                                                                                                                                                                                                                                        |
| ``  | Represents a nested browsing context, embedding another document into the current one.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `<object>`  | Represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.                                                                                                                                                                                                                                                                                                                                                                    |
| `` | Contains zero or more `` elements and one `` element to offer alternative versions of an image for different display/device scenarios.                                                                                                                                                                                                                                                                                                                         |
| ``  | Specifies multiple media resources for the picture, the audio element, or the video element. It is a void element, meaning that it has no content and does not have a closing tag. It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats. |

## SVG and MathML

You can embed SVG and MathML content directly into HTML documents, using the `` and  elements.

| Element                   | Description                                                                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``     | Container defining a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document. |
|  | The top-level element in MathML. Every valid MathML instance must be wrapped in it. In addition, you must not nest a second `<math>` element in another, but you can have an arbitrary number of other child elements in it.                       |

## Scripting

To create dynamic content and Web applications, HTML supports the use of scripting languages, most prominently JavaScript. Certain elements support this capability.

| Element                     | Description                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<canvas>`   | Container element to use with either the canvas scripting API or the WebGL API to draw graphics and animations.                                                                                                         |
| `<noscript>` | Defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.                                                                                                                                               |
| `<script>`   | Used to embed executable code or data; this is typically used to embed or refer to JavaScript code. The `<script>` element can also be used with other languages, such as WebGL's GLSL shader programming language and JSON. |

## Demarcating edits

These elements let you provide indications that specific parts of the text have been altered.

| Element                | Description                                                                                                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `` | Represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The `` element can be used for the opposite purpose: to indicate text that has been added to the document. |
| `` | Represents a range of text that has been added to a document. You can use the `` element to similarly represent a range of text that has been deleted from the document.                                                                                                   |
