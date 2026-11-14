---
title: "Clipboard"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard

The **`Clipboard`** interface of the Clipboard API provides read and write access to the contents of the system clipboard.
This allows a web application to implement cut, copy, and paste features.

The system clipboard is exposed through the global `Navigator.clipboard` property.

All of the Clipboard API methods operate asynchronously; they return a `Promise` which is resolved once the clipboard access has been completed.
The promise is rejected if clipboard access is denied.

All the methods require a secure context.
Additional requirements for using the API are discussed in the Security consideration section of the API overview topic.

## Instance methods

_`Clipboard` is based on the `EventTarget` interface, and includes its methods._

- `read()`
    Reads the items on the system clipboard, returning a `Promise` that is fulfilled when the operation completes.
    Each item is a `ClipboardItem` that can contain several representations of the copied data, such as versions in HTML and text.
- `readText()`
    Requests text from the system clipboard, returning a `Promise` that is fulfilled with a string containing the clipboard's text once it's available.
- `write()`
    Writes one or more `ClipboardItem` objects to the system clipboard, returning a `Promise` that is fulfilled when the operation completes.
- `writeText()`
    Writes text to the system clipboard, returning a `Promise` that is resolved once the text is fully copied into the clipboard.

## Events

- `clipboardchange` (experimental)
    Fired when the system clipboard contents are changed in any way, for example via a system copy command, or via an API method such as `Clipboard.writeText()`.

## See also

- `Document.execCommand()`
