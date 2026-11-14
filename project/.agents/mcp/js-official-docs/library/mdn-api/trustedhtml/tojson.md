---
title: "TrustedHTML: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedhtml/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedHTML: toJSON() method

The **`toJSON()`** method of the `TrustedHTML` interface returns a string representing the `TrustedHTML` object. This is the same string that `TrustedHTML.toString()` returns.

The method is automatically called by `JSON.stringify()` when a `TrustedHTML` object is encountered during JSON serialization. The serialized value can then be converted back using the `TrustedTypePolicy.createHTML()` method within the reviver of `JSON.parse()`, which runs the policy's transformation on it again.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A string.

## Examples

### Calling toJSON() directly

This example creates a `TrustedHTML` object. Calling `toJSON()` directly returns its stored string value.

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/</g, "&lt;"),
});

const escaped = escapeHTMLPolicy.createHTML("<img src=x onerror=alert(1)>");

const json = escaped.toJSON();
console.log(json); // Same value as escaped.toString()
console.log(typeof json); // "string"
```

### Serializing to a JSON string

The `TrustedHTML` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(escaped));
```

This would log the following JSON string, including the surrounding double quotes, which are part of the string's content:

```json
"&lt;img src=x onerror=alert(1)>"
```
