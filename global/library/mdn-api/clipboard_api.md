---
title: "Clipboard API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard API

The **Clipboard API** provides the ability to respond to clipboard commands (cut, copy, and paste), as well as to asynchronously read from and write to the system clipboard.

> **Note:**
> Use this API in preference to the deprecated `document.execCommand()` method for accessing the clipboard.

> **Note:**
> This API is _not available_ in Web Workers (not exposed via `WorkerNavigator`).

## Concepts and usage

The _system clipboard_ is a data buffer belonging to the operating system hosting the browser, which is used for short-term data storage and/or data transfers between documents or applications.
It is usually implemented as an anonymous, temporary data buffer, sometimes called the _paste buffer_, that can be accessed from most or all programs within the environment via defined programming interfaces.

The Clipboard API allows users to asynchronously read and write text and other kinds of data to and from the system clipboard in secure contexts, provided the user has met the criteria outlined in the Security considerations.

The system clipboard is accessed through the `Navigator.clipboard` global.

### Text vs. multiple representations

The `Clipboard` interface offers two ways to work with clipboard data:

- `readText()` and `writeText()` can be used if you just want to read and write text from the clipboard.
- `read()` and `write()` allow you to read and write arrays of `ClipboardItem` objects to the system clipboard.
  Each `ClipboardItem` can hold several representations of the same content, keyed by media type.
  This enables data to be copied in multiple formats, such as an HTML table, a tab-separated plain text, or an image, and the pasting application to pick the best representation that it understands.
  For example, an application that can't render HTML could fall back gracefully to a text version.

  Note that some browsers/OS only allow one `ClipboardItem` to be written, and will error if more than one is attempted (see `Clipboard.write()` for more information).

Browsers are required to support `text/plain`, `text/html`, and `image/png` representations with `read()` and `write()`.
Other types, such as `image/svg+xml` and the custom formats described in the next section, are optional.
You can use `ClipboardItem.supports()` to check whether a particular format is supported (see Reading and writing multiple representations below for an example).

### Custom clipboard formats

A `ClipboardItem` can also carry a custom format: a Media type ("MIME type") prefixed with `"web "` (the word "web" followed by a space).
This lets a web app define its own clipboard format for data that has no standard representation, without colliding with the OS's native clipboard formats or another site's custom formats.

Custom formats are useful because they can preserve information a standard representation can't, for example structured metadata alongside a visual or text version of the same content.
An app that recognizes its own custom format can paste it without data loss for users who copy from it, while other apps still receive whichever standard representations you also provide.
One important use case enabled by this feature is that you can copy and paste to your own application, either in the same page or running in different tabs or browsers.

Support for custom formats currently varies by browser, so check Browser compatibility and `ClipboardItem.supports()` before relying on one.
See Reading and writing custom formats below for a complete example.

### Clipboard and cut/copy/paste events

Events are fired as the result of `cut`, `copy`, and `paste` operations modifying the clipboard.
The events have a default action, for example the `copy` action copies the current selection to the system clipboard by default.
The default action can be overridden by the event handler — see each of the events for more information.

There is also a `clipboardchange` event fired directly on the `Clipboard` object whenever the system clipboard's contents are changed. This is useful for notifying apps of a change to the system clipboard, for example if they have their own clipboard that needs to be kept in sync.

See Overriding cut, copy, and paste events below for an example that overrides the `copy` and `paste` events, and listens for `cut` and `clipboardchange`.

## Interfaces

- `Clipboard` (secure context)
    Provides an interface for reading and writing text and data to or from the system clipboard.
    The specification refers to this as the 'Async Clipboard API'.
- `ClipboardChangeEvent`
    Represents events fired whenever the contents of the system clipboard are changed.
- `ClipboardEvent`
    Represents events providing information related to modification of the clipboard, that is `cut`, `copy`, and `paste` events.
    The specification refers to this as the 'Clipboard Event API'.
- `ClipboardItem` (secure context)
    Represents a single clipboard entry that can hold one or more media-type representations of the same data (such as versions in HTML and text).

### Extensions to other interfaces

The Clipboard API extends the following APIs, adding the listed features.

- `Navigator.clipboard` (read-only) (secure context)
    Returns a `Clipboard` object that provides read and write access to the system clipboard.
- `Element` `copy` event
    An event fired whenever the user initiates a copy action.
- `Element` `cut` event
    An event fired whenever the user initiates a cut action.
- `Element` `paste` event
    An event fired whenever the user initiates a paste action.

## Security considerations

The Clipboard API allows users to programmatically read and write text and other kinds of data to and from the system clipboard in secure contexts.

When reading from the clipboard, the specification requires that a user has recently interacted with the page (transient user activation) and that the call is made as a result of the user interacting with a browser or OS "paste element" (such as choosing "Paste" on a native context menu). In practice, browsers often allow read operations that do not satisfy these requirements, while placing other requirements instead (such as a permission or per-operation prompt).
For writing to the clipboard the specification expects that the page has been granted the Permissions API `clipboard-write` permission, and the browser may also require transient user activation.
Browsers may place additional restrictions over use of the methods to access the clipboard.

The `clipboardchange` event is only fired with sticky activation or after the `clipboard-read` permission is granted.

Browser implementations have diverged from the specification.
The differences are captured in the Browser compatibility section and the current state is summarized below:

Chromium browsers:

- If a read isn't allowed by the spec and the document has focus, it triggers a request to use permission `clipboard-read`, and succeeds if the permission is granted (either because the user accepted the prompt, or because the permission was granted already).
- Writing requires either the `clipboard-write` permission or transient activation.
  If the permission is granted, it persists, and further transient activation is not required.
- The HTTP Permissions-Policy permissions `clipboard-read` and `clipboard-write` must be allowed for `` elements that access the clipboard.

Firefox & Safari:

- If a read isn't allowed by the spec but transient user activation is still met, it triggers a user prompt in the form of an ephemeral context menu with a single "Paste" option (which becomes enabled after 1 second) and succeeds if the user chooses the option.
- Writing requires transient activation.
- The paste-prompt is suppressed if reading same-origin clipboard content, but not cross-origin content.
- The `clipboard-read` and `clipboard-write` permissions are not supported (and not planned to be supported) by Firefox or Safari.

Firefox web extensions:

- Reading is available to extensions with the web extension `clipboardRead` permission. With this permission, the extension doesn't require transient activation or use the paste prompt. From Firefox 147, reading is also available without the permission in a secure context, with transient activation, and after the user clicks the paste prompt in an ephemeral context menu.
- Writing is available in a secure context and with transient activation. However, with the web extension `clipboardWrite` permission transient activation is not required.
