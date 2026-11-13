---
title: "`crossorigin` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/crossorigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `crossorigin` HTML attribute

The **`crossorigin`** attribute, valid on the `<audio>`, ``, `<link>`, `<script>`, and `` elements, provides support for CORS, defining how the element handles cross-origin requests, thereby enabling the configuration of the CORS requests for the element's fetched data. Depending on the element, the attribute can be a CORS settings attribute.

The `crossorigin` content attribute on media elements is a CORS settings attribute.

These attributes are enumerated, and have the following possible values:

- `anonymous`
    Request uses CORS headers (`mode` is set to `cors`) and `credentials` is set to `'same-origin'`, meaning that credentials such as cookies, client-side TLS certificates, and HTTP authentication headers are only included if the destination has the same origin.
- `use-credentials`
    Request uses CORS headers (`mode` is set to `cors`) and `credentials` is set to `'include'`, so credentials are always included, even for cross-origin requests.
- `""`
    Setting the attribute name to an empty value, like `crossorigin` or `crossorigin=""`, is the same as `anonymous`. Invalid values are also treated as the empty string.

By default (that is, when the attribute is not specified), resources are generally fetched without CORS, except module scripts which always use CORS so only `crossorigin="use-credentials"` has an effect. The user agent will not ask for permission for full access to the resource and in the case of a cross-origin request, certain limitations will be applied based on the type of element concerned:

       | Element
       | Restrictions

       | `img`, `audio`, `video`
       |
        When resource is placed in `<canvas>`, element is marked as tainted.

       | `script`
       |
        Access to error logging via `window.onerror` will be limited.

       | `link`
       |
        Request with no appropriate `crossorigin` header may be discarded.

> **Note:**
> The `crossorigin` attribute is not supported for `rel="icon"` in Chromium-based browsers. See the open Chromium issue.

## Examples

### `crossorigin` with the `<script>` element

You can use the following `<script>` element to tell a browser to execute the `https://example.com/example-framework.js` script without sending user-credentials.

```html
<script
  src="https://example.com/example-framework.js"
  crossorigin="anonymous"></script>
```

### Web manifest with credentials

The `use-credentials` value must be used when fetching a manifest that requires credentials, even if the file is from the same origin.

```html
<link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials" />
```

## See also

- Cross-Origin Resource Sharing (CORS)
- HTML attribute: `rel`
