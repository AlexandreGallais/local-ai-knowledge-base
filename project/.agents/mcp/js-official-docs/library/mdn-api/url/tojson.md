---
title: "URL: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: toJSON() method

The **`toJSON()`** method of the `URL` interface returns a string representing the `URL` object. This is the same string that `URL.toString()` returns.

The method is automatically called by `JSON.stringify()` when a `URL` object is encountered during JSON serialization. The serialized value can then be deserialized using the `URL()` constructor within the reviver of `JSON.parse()`.

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

Calling `toJSON()` directly returns a string containing the URL.

```js
const url = new URL(
  "https://developer.mozilla.org/en-US/docs/Web/API/URL/toString",
);

const json = url.toJSON();
console.log(json); // https://developer.mozilla.org/en-US/docs/Web/API/URL/toString
console.log(typeof json); // "string"
```

### Serializing to a JSON string

The `URL` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(url));
```

This would log the following JSON string, including the surrounding double quotes, which are part of the string's content:

```json
"https://developer.mozilla.org/en-US/docs/Web/API/URL/toString"
```

## See also

- Polyfill of `URL.prototype.toJSON` in `core-js`
