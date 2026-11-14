---
title: "HTMLMediaElement: crossOrigin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/crossorigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: crossOrigin property

The **`HTMLMediaElement.crossOrigin`** property is the CORS setting for this media element. See CORS settings attributes for details.

## Value

A string of a keyword specifying the CORS mode to use when fetching the resource. Possible values are:

- `anonymous` or the empty string (`""`)
    Requests sent by the `HTMLMediaElement` will use the `cors` `mode` and the `same-origin` `credentials` mode. This means that CORS is enabled and credentials are sent _if_ the resource is fetched from the same origin from which the document was loaded.
- `use-credentials`
    Requests sent by the `HTMLMediaElement` will use the `cors` `mode` and the `include` `credentials` mode. All resources requests by the element will use CORS, regardless of what domain the fetch is from.

If the `crossOrigin` property is specified with any other value, it is the same as specifying as the `anonymous`.

If the `crossOrigin` property is not specified, the resource is fetched without CORS (the `no-cors` `mode` and the `same-origin` `credentials` mode).

## See also

- `HTMLImageElement.crossOrigin`
- `HTMLLinkElement.crossOrigin`
- `HTMLScriptElement.crossOrigin`
