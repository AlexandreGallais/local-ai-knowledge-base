---
title: "`<embed>` HTML embed external content element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/embed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<embed>` HTML embed external content element

The **``** HTML element embeds external content at the specified point in the document. This content is handled by the browser or an external application.

```html
<embed
  type="image/jpeg"
  src="/shared-assets/images/examples/flowers.jpg"
  width="250"
  height="200" />
```

## Attributes

This element's attributes include the global attributes.

- `height`
    The displayed height of the resource, in CSS pixels. This must be an absolute value; percentages are _not_ allowed.
- `src`
    The URL of the resource being embedded.
- `type`
    The MIME type of the embedded resource.
- `width`
    The displayed width of the resource, in CSS pixels. This must be an absolute value; percentages are _not_ allowed.

## Usage notes

Modern browsers no longer support browser plug-ins such as Flash, but `` can still display content handled by the browser itself, such as PDFs in a built-in PDF viewer.

For PDF previews, consider `<object>` or ``. Unlike `<object>`, `` cannot contain fallback content. Unlike ``, it has no attributes that control loading.

You can use the `object-position` property to adjust the positioning of the embedded object within the element's frame.

> **Note:**
> The `object-fit` property has no effect on `` elements.

## Accessibility

Use the `title` attribute on an `embed` element to label its content so that people navigating with assistive technology such as a screen reader can understand what it contains. The title's value should concisely describe the embedded content. Without a title, they may not be able to determine what its embedded content is. This context shift can be confusing and time-consuming, especially if the `embed` element contains interactive content like video or audio.

## Examples

```html
<embed
  type="video/quicktime"
  src="movie.mov"
  width="640"
  height="480"
  title="Title of my video" />
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, embedded content, interactive content,
        palpable content.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       | Any element that accepts embedded content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `application`, `document`,
        `img`, `none`,
        `presentation`

       | DOM interface
       | `HTMLEmbedElement`

## See also

- Other elements that are used for embedding content of various types include `<audio>`, `<canvas>`, ``, ``, , `<object>`, ``, and ``.
- Positioning and sizing the embedded content within its frame: `object-position` and `object-fit`
