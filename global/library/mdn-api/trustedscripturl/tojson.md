---
title: "TrustedScriptURL: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedscripturl/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedScriptURL: toJSON() method

The **`toJSON()`** method of the `TrustedScriptURL` interface returns a string representing the `TrustedScriptURL` object. This is the same string that `TrustedScriptURL.toString()` returns.

The method is automatically called by `JSON.stringify()` when a `TrustedScriptURL` object is encountered during JSON serialization. The serialized value can then be converted back using the `TrustedTypePolicy.createScriptURL()` method within the reviver of `JSON.parse()`, which runs the policy's transformation on it again.

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

This example creates a `TrustedScriptURL` object. Calling `toJSON()` directly returns its stored string value.

```js
const sanitized = scriptPolicy.createScriptURL(
  "https://example.com/my-script.js",
);

const json = sanitized.toJSON();
console.log(json); // Same value as sanitized.toString()
console.log(typeof json); // "string"
```

### Serializing to a JSON string

The `TrustedScriptURL` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(sanitized));
```

This would log the following JSON string, including the surrounding double quotes, which are part of the string's content:

```json
"https://example.com/my-script.js"
```
