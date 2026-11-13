---
title: "MimeType"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mimetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MimeType

The **`MimeType`** interface provides contains information about a MIME type associated with a particular plugin. `Navigator.mimeTypes` returns an array of this object.

## Instance properties

- `MimeType.type` (read-only) (deprecated)
    Returns the MIME type of the associated plugin.
- `MimeType.description` (read-only) (deprecated)
    Returns a description of the associated plugin or an empty string if there is none.
- `MimeType.suffixes` (read-only) (deprecated)
    A string containing valid file extensions for the data displayed by the plugin, or an empty string if an extension is not valid for the particular module. For example, a browser's content decryption module may appear in the plugin list but support more file extensions than can be anticipated. It might therefore return an empty string.
- `MimeType.enabledPlugin` (read-only) (deprecated)
    Returns an instance of `Plugin` containing information about the plugin itself.
