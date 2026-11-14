---
title: "RTCSessionDescription: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsessiondescription/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSessionDescription: toJSON() method

The **`toJSON()`** method of the `RTCSessionDescription` interface returns a JSON-serializable plain object representing the `RTCSessionDescription` object.

The method is automatically called by `JSON.stringify()` when an `RTCSessionDescription` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `type`
- `sdp`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example creates an `RTCSessionDescription` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const description = new RTCSessionDescription({ type: "rollback", sdp: "" });

const json = description.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.type); // Same value as description.type
```

### Serializing to a JSON string

The `RTCSessionDescription` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(description));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "type": "rollback",
  "sdp": ""
}
```

## See also

- WebRTC
