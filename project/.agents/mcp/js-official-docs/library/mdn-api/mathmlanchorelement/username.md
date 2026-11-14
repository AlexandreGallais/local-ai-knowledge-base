---
title: "MathMLAnchorElement: username property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/username/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: username property

The **`username`** property of the `MathMLAnchorElement` interface is a string containing the username component of the `` element's `href`. If the URL does not have a username, this property contains an empty string, `""`.

This property can be set to change the username of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect.

The username is percent-encoded when setting but not percent-decoded when reading.

See `URL.username` for more information.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="<example-value>" href="<example-value>"> ... </a>
</math>
```

you can get the `username` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.username; // returns 'foo'
```

## See also

- The MathML `` element
