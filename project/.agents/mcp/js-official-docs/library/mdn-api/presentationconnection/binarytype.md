---
title: "PresentationConnection: binaryType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnection/binarytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnection: binaryType property

When a `PresentationConnection` object is created, its `binaryType` IDL attribute _MUST_ be set to the string `"arraybuffer"`. Upon getting, the attribute _MUST_ return its most recent value (the value it was last set as). Upon setting, the user agent _MUST_ set the IDL attribute to the new value.

> **Note:**
> The `binaryType` attribute allows authors to control how binary data is exposed to scripts. By setting the attribute to `"blob"`, binary data is returned in `Blob` form; by setting it to `"arraybuffer"`, it is returned in `ArrayBuffer` form. The attribute defaults to `"arraybuffer"`. This attribute has no effect on data sent in a string form.
