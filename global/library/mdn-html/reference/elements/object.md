---
title: "`<object>` HTML external object element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/object/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<object>` HTML external object element

The **`<object>`** HTML element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.

```html
<object
  type="video/mp4"
  data="/shared-assets/videos/flower.mp4"
  width="250"
  height="200"></object>
```

## Attributes

This element includes the global attributes.

- `archive` (deprecated)
    A space-separated list of URIs for archives of resources for the object.
- `border` (deprecated)
    The width of a border around the control, in pixels.
- `classid` (deprecated)
    The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute.
- `codebase` (deprecated)
    The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document.
- `codetype` (deprecated)
    The content type of the data specified by **classid**.
- `data`
    The address of the resource as a valid URL. At least one of **data** and **type** must be defined.
- `declare` (deprecated)
    The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. Repeat the `<object>` element completely each time the resource is reused.
- `form`
    The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a `<form>` element in the same document.
- `height`
    The height of the displayed resource, as in `<integer>` in CSS pixels.
- `name`
    The name of valid browsing context (HTML5), or the name of the control (HTML 4). The name becomes a property of the `Window` and `Document` objects, containing a reference to the embedded window or the element itself.
- `standby` (deprecated)
    A message that the browser can show while loading the object's implementation and data.
- `type`
    The content type of the resource specified by **data**. At least one of **data** and **type** must be defined.
- `usemap` (deprecated)
    A hash-name reference to a `<map>` element; that is a '#' followed by the value of a `name` of a map element.
- `width`
    The width of the display resource, as in `<integer>` in CSS pixels.

## Usage notes

The `<object>` element can display PDFs using the browser's built-in PDF viewer. Its children provide fallback content when the resource cannot be displayed. You can use this to provide a link to the PDF, but also provide a link outside the element so it remains available if the viewer loads but fails to display the PDF.

Unlike ``, `<object>` has no attributes that control loading. The embedding page's Content Security Policy controls its sources through .

## Examples

### Embed a video

#### HTML

```html
<object
  type="video/webm"
  data="/shared-assets/videos/flower.webm"
  width="600"
  height="140">
  <img
    src="/shared-assets/images/examples/flowers.jpg"
    alt="Some beautiful flowers" />
</object>
```

#### Result

If the video in the example fails to load, the user will be provided with an image as fallback content. The `` tag is used to display an image. We include the `src` attribute set to the path to the image we want to embed. We also include the `alt` attribute, which provides the image with an accessible name. If the image also fails to load, the content of the `alt` attribute will be displayed.

## Technical summary

       |
        Content categories

       |
        Flow content;
        phrasing content;
        embedded content, palpable content; if the element has a
        `usemap` attribute, interactive content;
        listed,
        submittable
        form-associated element.

       | Permitted content
       |
        zero or more `<param>` elements, then
        transparent.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts embedded content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `application`, `document`, `img`

       | DOM interface
       | `HTMLObjectElement`

## See also

- ``
- `<param>`
