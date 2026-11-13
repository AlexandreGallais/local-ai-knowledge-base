---
title: "HTMLIFrameElement: allow property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/allow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: allow property

The **`allow`** property of the `HTMLIFrameElement` interface indicates the Permissions Policy specified for this `` element. The policy defines what features are available to the `` element (for example, access to the `microphone`, `camera`, `battery`, `web-share`, etc.) based on the origin of the request.

The Permissions Policy specified by the `allow` attribute implements a further restriction on top of the policy specified in the `Permissions-Policy` header. It doesn't replace it.

See ``'s Permissions Policy syntax for more details.

It reflects the `allow` attribute of the `` element.

## Value

A string indicates the Permissions Policy specified for this `` element, each policy must be separated by space.

## Examples

```html
<iframe
  id="el"
  src="https://example.com"
  allow="geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'"></iframe>
```

```js
const el = document.getElementById("el");
console.log(el.allow); // Output: "geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'"
```

See Permissions Policy in `` element for more available examples.

## See also

- Permissions Policy
