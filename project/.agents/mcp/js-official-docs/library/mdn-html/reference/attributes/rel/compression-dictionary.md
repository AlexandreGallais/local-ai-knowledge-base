---
title: "`rel=\"compression-dictionary\"` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/rel/compression-dictionary/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rel="compression-dictionary"` HTML attribute value

The **`compression-dictionary`** keyword for the `rel` attribute of the `<link>` element is a link that browsers can use to download a compression dictionary that can be used to compress future downloads for resources on this site so the download sizes of those resources are smaller than standard compression.

**Note:** if the website has a `Content-Security-Policy` header, the `connect-src` directive (or `default-src`, if `connect-src` is not set) must permit the location of the dictionary resource to avoid the request being blocked.

See the Compression Dictionary Transport guide for more information.

## See also

- Compression Dictionary Transport guide
