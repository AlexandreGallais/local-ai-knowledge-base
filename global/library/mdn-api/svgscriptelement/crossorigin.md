---
title: "SVGScriptElement: crossOrigin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgscriptelement/crossorigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGScriptElement: crossOrigin property

The **`crossOrigin`** property of the `SVGScriptElement` interface reflects the Cross-Origin Resource Sharing settings for the `<script>` element. For classic scripts from other origins, this controls whether full error information will be exposed. For module scripts, it controls the script itself and any scripts it imports. See CORS settings attributes for details.

## Value

A string containing a keyword specifying the CORS mode to use when fetching the resource. Possible values are:

- `anonymous` or an empty string (`""`)
    Requests sent by the `SVGScriptElement` will use the `cors` `Request.mode` and the `same-origin` `Request.credentials` mode. This means that CORS is enabled and credentials are sent _if_ the resource is fetched from the same origin from which the document was loaded.
- `use-credentials`
    Requests sent by the `SVGScriptElement` will use the `cors` `Request.mode` and the `include` `Request.credentials` mode. All resources requested by the element will use CORS, regardless of which domain the fetch is from.

If the `crossOrigin` property is specified with any other value, it is the same as specifying it as `anonymous`.

If the `crossOrigin` property is not specified, the resource is fetched without CORS (equivalent to using the `no-cors` `Request.mode` and the `same-origin` `Request.credentials` mode).

## Examples

### Accessing the `crossOrigin` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <script
    id="myScript"
    href="https://example.com/script.js"
    crossorigin="anonymous"></script>
</svg>
```

```js
const scriptElement = document.getElementById("myScript");
console.log(scriptElement.crossOrigin); // Output: "anonymous"
```

## See also

- `HTMLScriptElement.crossOrigin`
- `HTMLImageElement.crossOrigin`
- `HTMLLinkElement.crossOrigin`
- `HTMLMediaElement.crossOrigin`
