---
title: "Common media types (part 1 of 4)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/mime_types/common_types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Common media types

This topic lists the most common MIME types with corresponding document types, ordered by their common extensions.

The following two important MIME types are the default types:

- `text/plain` is the default value for textual files. A textual file should be human-readable and must not contain binary data.
- `application/octet-stream` is the default value for all other cases. An unknown file type should use this type. When navigating to a resource served with this type, browsers generally download it instead of displaying it as a page, to avoid executing scripts in the serving site's origin. However, such resources may still be used in other contexts, including being executed as JavaScript when referenced by a classic `<script>` element—to prevent such behavior, send `X-Content-Type-Options: nosniff`.

IANA is the official registry of MIME media types and maintains a list of all the official MIME types. This table lists important MIME types for the Web:
