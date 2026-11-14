---
title: "HTMLScriptElement: crossOrigin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/crossorigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: crossOrigin property

The **`crossOrigin`** property of the `HTMLScriptElement` interface reflects the Cross-Origin Resource Sharing settings for the script element. For classic scripts from other origins, this controls if full error information will be exposed. For module scripts, it controls the script itself and any script it imports. See CORS settings attributes for details.

## Value

A string of a keyword specifying the CORS mode to use when fetching the resource. Possible values are:

- `anonymous` or an empty string (`""`)
    Requests sent by the `HTMLScriptElement` will use the `cors` `mode` and the `same-origin` `credentials` mode. This means that CORS is enabled and credentials are sent _if_ the resource is fetched from the same origin from which the document was loaded.
- `use-credentials`
    Requests sent by the `HTMLScriptElement` will use the `cors` `mode` and the `include` `credentials` mode. All resources requests by the element will use CORS, regardless of which domain the fetch is from.

If the `crossOrigin` property is specified with any other value, it is the same as specifying it as the `anonymous`.

If the `crossOrigin` property is not specified, the resource is fetched without CORS (the `no-cors` `mode` and the `same-origin` `credentials` mode).

## See also

- `HTMLImageElement.crossOrigin`
- `HTMLLinkElement.crossOrigin`
- `HTMLMediaElement.crossOrigin`
