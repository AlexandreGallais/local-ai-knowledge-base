---
title: "Clipboard: read() method (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/read/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard: read() method

The **`read()`** method of the `Clipboard` interface returns a `Promise` that fulfills with a copy of the clipboard's contents.

Each item from the clipboard can provide different representations of the copied object, allowing apps to handle the types they understand and gracefully fall back for types they don't.
This is more flexible than `readText()`, which can only return text.

## Syntax

```js
read()
read(formats)
```

### Parameters

- `formats` (optional)
    An optional object with the following properties:
    - `unsanitized` (optional)
        An `Array` of strings containing MIME types of data formats that should not be sanitized when reading from the clipboard.

        Certain browsers may sanitize the clipboard data when it is read, to prevent malicious content from being pasted into the document. For example, Chrome (and other Chromium-based browsers) sanitizes HTML data by stripping `<script>` tags and other potentially dangerous content. Use the `unsanitized` array to specify a list of MIME types that should not be sanitized.

### Return value

A `Promise` that resolves with an array of `ClipboardItem` objects containing the clipboard's contents.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the reading from the clipboard is not allowed.

## Description

The resolved promise is an array of `ClipboardItem` instances representing the different items read from the clipboard.
Each `ClipboardItem` can contain one or more representations of the copied object, keyed by media type.
A web app reads the formats in an item and selects the best representation that it understands.
For example, an item for a custom data type on the clipboard might include a custom representation, an HTML version, and a plain text version.
An app that understands the custom format can use it directly, while one that doesn't can fall back to the text or HTML version.

Browsers commonly support reading text, HTML, and PNG image data, and may support web custom formats (see the Browser compatibility section of `ClipboardItem`).

## Security considerations

Reading from the clipboard can only be done in a secure context.

Additional security requirements are covered in the Security consideration section of the API overview topic.
