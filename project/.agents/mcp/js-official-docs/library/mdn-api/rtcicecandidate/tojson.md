---
title: "RTCIceCandidate: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidate/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidate: toJSON() method

The **`toJSON()`** method of the `RTCIceCandidate` interface returns a JSON-serializable plain object representing the `RTCIceCandidate` object.

The method is automatically called by `JSON.stringify()` when an `RTCIceCandidate` object is encountered during JSON serialization. The serialized value can then be deserialized using the `RTCIceCandidate()` constructor within the reviver of `JSON.parse()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `candidate`
- `sdpMid`
- `sdpMLineIndex`
- `usernameFragment`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example creates an `RTCIceCandidate` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const candidate = new RTCIceCandidate({
  candidate: "",
  sdpMid: "0",
  sdpMLineIndex: 0,
});

const json = candidate.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.candidate); // Same value as candidate.candidate
```

### Serializing to a JSON string

The `RTCIceCandidate` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
const jsonString = JSON.stringify(candidate);
console.log(jsonString);
```

This would log a JSON string like so (formatted for readability):

```json
{
  "candidate": "",
  "sdpMid": "0",
  "sdpMLineIndex": 0,
  "usernameFragment": null
}
```
