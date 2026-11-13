---
title: "Working with the drag data store (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_drag_and_drop_api/drag_data_store/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Working with the drag data store (part 2 of 2)

## Common drag data types

The spec only defines the behavior for a few data types, but browsers sometimes have native support for more types. In general, types are intended as a _protocol_ just like MIME types, and you can use any type as long as the receiving end (another webpage, another part of the same webpage, or even somewhere outside the browser) understands it. This section describes some common conventions and browsers' default behaviors.

Note that the scenarios below refer to the _intention_ and not the _behavior_. For example, when we say "dragging a link", the user may not be dragging an actual `` element; they may be dragging a container that contains one or more links, but the intention is to transfer the link(s) as data, so the data store you prepare can be the same as if the user were dragging an actual link.

### Dragging text

For dragging text, use the `text/plain` type, with the dragged string as the value. For example:

```js
event.dataTransfer.items.add("This is text to drag", "text/plain");
```

You should always add data of the `text/plain` type as a fallback for applications or drop targets that do not support other types, unless there is no logical text alternative. Always add this `text/plain` type last, as it is the least specific and shouldn't be preferred.

In `getData()`, `setData()`, and `clearData()`, the `Text` type (case-insensitive) is treated as `text/plain`.

By default, when a selection is dragged, the following data items are created:

- `text/plain`: containing the selected text. Firefox and Safari sorts this item after `text/html`, although the spec requires it to be first.
- `text/html`: containing the full HTML source of the selected elements (with all styles inlined).

The spec also requires another item of type `application/microdata+json`, containing the microdata extracted from the element(s) in the dragged selection. No browser implements this item.

When dropping onto an editable text field, such as a `<textarea>` or ``, the `text/plain` item gets copied into the field by default (without any event handling).

### Dragging links

Dragged hyperlinks should include data of two types: `text/uri-list`, and `text/plain`. _Both_ types should use the link's URL for their data. Note: the URL type is `uri-list` with an _I_, not an _L_.

As usual, set the `text/plain` type last, as a fallback for the `text/uri-list` type. For example:

```js
event.dataTransfer.items.add("https://www.mozilla.org", "text/uri-list");
event.dataTransfer.items.add("https://www.mozilla.org", "text/plain");
```

To drag multiple links, separate each link inside the `text/uri-list` data with a CRLF linebreak. Lines that begin with a number sign (`#`) are comments, and should not be considered URLs. You can use comments to indicate the purpose of a URL, the title associated with a URL, or other data.

> **Warning:**
> The `text/plain` fallback for multiple links should include all URLs, but no comments.

For example, this sample `text/uri-list` data contains two links and a comment:

```plain
https://www.mozilla.org
#A second link
http://www.example.com
```

When retrieving a dropped link, ensure you handle when multiple links are dragged, including any comments.

In `getData()`, `setData()`, and `clearData()`, the `URL` type (case-insensitive) is treated as `text/uri-list`. For `getData()`, the result only contains the first URL in the list.

By default, when an `` element is dragged, the following data items are created:

- `text/x-moz-url` (Firefox-only): containing both the `href` attribute and the link text, separated by a line break.
- `text/x-moz-url-data` (Firefox-only): containing just the `href`.
- `text/x-moz-url-desc` (Firefox-only): containing just the link text.
- `text/uri-list`: containing the `href` attribute.
- `text/html` (Chrome and Firefox only): containing the full HTML source of the `` element (with all styles inlined).
- `text/plain`: also containing the `href` attribute. Chrome sorts this item before `text/uri-list`.

### Dragging images

Direct image dragging (that is, the data is the pixel content) is not common, and may be unsupported on certain platforms. Instead, images are usually dragged only by their URLs. To do this, use the `text/uri-list` type as with other URLs. The data should be the URL of the image, or a `data:` URL if the image is not stored on a website or disk.

As with links, the data for the `text/plain` type should also contain the URL. However, a `data:` URL is not usually useful in a text context, so you may wish to exclude the `text/plain` data in this situation.

```js
event.dataTransfer.items.add(imageURL, "text/uri-list");
event.dataTransfer.items.add(imageURL, "text/plain");
```

By default, when an `` element is dragged, the following data items are created:

- `text/x-moz-url` (Firefox-only): containing both the `src` attribute and the alt text (or the `src` again if the alt is empty), separated by a line break.
- `text/x-moz-url-data` (Firefox-only): containing just the `src` attribute.
- `text/x-moz-url-desc` (Firefox-only): containing just the alt text (or the `src` if the alt is empty).
- `text/uri-list`: containing the `src` attribute.
- `text/html`: containing the full HTML source of the `` element (with all styles inlined).
- `text/plain` (Firefox-only): containing the `src` attribute.

Safari also creates a file item containing the image data, with the appropriate MIME type such as `image/png`.

### Dragging elements

When the dragged item is an arbitrary element with `draggable="true"`, what data to set depends on what you intend to transfer.

A common way to transfer the element is to use the `text/html` type containing serialized HTML source code, which the receiving end can then parse and insert. For example, it would be suitable to set its data to the value of the `outerHTML` property of an element. `text/xml` can be used too, but ensure that the data is well-formed XML.

You may also include a plain text representation of the HTML or XML data using the `text/plain` type. The data should be just the text without any of the source tags or attributes. For instance:

```js
event.dataTransfer.items.add(element.outerHTML, "text/html");
event.dataTransfer.items.add(element.innerText, "text/plain");
```

You can also use other types that you invent for custom purposes. Strive to always include a `text/plain` alternative, unless the dragged object is specific to a particular site or application. In this case, the custom type ensures that the data cannot be dropped elsewhere.

### Dragging files from an operating system file explorer

When the dragged item is a file, an item of kind `file` is added to the drag data. The MIME type is usually determined based on the extension without inspecting the file's contents. All browsers return an empty string when the MIME type cannot be determined, although the specification requires `application/octet-stream`. Currently, dragged files can only originate outside of the browser, such as from a file explorer.

Firefox also adds a non-standard text item of type `application/x-moz-file` containing the full path of the file on the user's file system. Unless within privileged code (such as an extension), its value is the empty string.

### Dragging files to an operating system file explorer

What can be transferred out of the browser mostly depends on the browser and where it is dragged to. Dragging images to the local file system is commonly supported and results in the image being downloaded.

Chrome supports the non-standard `DownloadURL` type. The payload should be text in the form `<MIME type>:<file name>:<file URL>`. For example:

```js
event.dataTransfer.items.add(
  "image/png:example.png:data:image/png;base64,iVBORw0K...",
  "DownloadURL",
);
```

This allows an arbitrary file to be downloaded when dragged to the file explorer, or, when dropping into another browser window, as if a file is being dropped (although CORS restrictions may apply). See Drag out files like Gmail for a practical use case.

## See also

- HTML Drag and Drop API (Overview)
- Drag Operations
