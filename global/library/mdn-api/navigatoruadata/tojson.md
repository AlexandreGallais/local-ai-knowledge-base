---
title: "NavigatorUAData: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatoruadata/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorUAData: toJSON() method

The **`toJSON()`** method of the `NavigatorUAData` interface returns a JSON-serializable plain object representing the `NavigatorUAData` object. Only the low-entropy values are included. To get high-entropy values, use `NavigatorUAData.getHighEntropyValues()`.

The method is automatically called by `JSON.stringify()` when a `NavigatorUAData` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `brands`: the array and its objects with `brand` and `version` properties are copied into a new array and new objects
- `mobile`
- `platform`

Unless stated otherwise, each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Calling `toJSON()` directly on `navigator.userAgentData` returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const json = navigator.userAgentData.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.mobile); // Same value as navigator.userAgentData.mobile
```

### Serializing to a JSON string

The `NavigatorUAData` object is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(navigator.userAgentData));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "brands": [
    {
      "brand": "Chromium",
      "version": "126"
    },
    {
      "brand": "Not/A)Brand",
      "version": "8"
    }
  ],
  "mobile": false,
  "platform": "Windows"
}
```
