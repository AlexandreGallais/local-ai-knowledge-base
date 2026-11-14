---
title: "DOMException: code property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domexception/code/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMException: code property

The **`code`** read-only property of the `DOMException` interface returns one of the legacy error code constants, or `0` if none match.

This field is used for historical reasons. New DOM exceptions don't use this anymore: they put this info in the `DOMException.name` attribute.

## Value

One of the error code constants, or `0` if none match.
