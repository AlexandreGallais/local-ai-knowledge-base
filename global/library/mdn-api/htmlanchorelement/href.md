---
title: "HTMLAnchorElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: href property

The **`href`** property of the `HTMLAnchorElement` interface is a stringifier that returns the absolute URL corresponding to the element's `href` attribute (or an empty string if `href` is unset). Setting this property updates the element's `href` attribute to the provided value.

## Value

A string.

- If the `href` attribute is absent, the value is an empty string (`""`).
- If the `href` attribute is present but is not a valid relative or absolute URL, the value is the attribute's value as-is.
- If the `href` attribute is present and is a valid relative or absolute URL, the value is the absolute URL, resolved relative to the document's base URL. The empty string (`""`) is considered a valid relative URL, resolving to the document's base URL.

## Examples

A freshly created `` element has no `href` attribute, so its `href` property returns an empty string.

```js
const anchor = document.createElement("a");
console.log(anchor.href); // ""
```

If the attribute is set to an empty string, the property returns the document's base URL because the empty string is a valid relative URL.

```js
anchor.href = "";
console.log(anchor.href); // "https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/href"
```

If the attribute is set to a relative URL, the property returns the absolute URL resolved against the document's base URL.

```js
anchor.href = "../../..";
console.log(anchor.href); // "https://developer.mozilla.org/en-US/docs/"
```

Note that the attribute's value remains as set, without resolution.

```js
console.log(anchor.getAttribute("href")); // "../../.."
```

If the attribute is set to an absolute URL, the property returns that absolute URL as-is.

```js
anchor.href = "https://example.com/path";
console.log(anchor.href); // "https://example.com/path"
```

If the attribute is set to an invalid URL, the property returns the attribute's value as-is.

```js
anchor.href = "https://";
console.log(anchor.href); // "https://"
```

## See also

- The `HTMLAnchorElement` interface it belongs to.
