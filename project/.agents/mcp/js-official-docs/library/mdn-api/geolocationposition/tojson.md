---
title: "GeolocationPosition: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocationposition/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeolocationPosition: toJSON() method

The **`toJSON()`** method of the `GeolocationPosition` interface returns a JSON-serializable plain object representing the `GeolocationPosition` object.

The method is automatically called by `JSON.stringify()` when a `GeolocationPosition` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `timestamp`
- `coords`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the `coords` property is further serialized using `GeolocationCoordinates.toJSON()`.

## Examples

### Calling toJSON() directly

This example obtains a `GeolocationPosition` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
navigator.geolocation.getCurrentPosition((position) => {
  const json = position.toJSON();
  console.log(json); // A plain object
  console.log(typeof json); // "object"
  console.log(json.timestamp); // Same value as position.timestamp
});
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(position));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "timestamp": 1717509611840,
  "coords": {
    "accuracy": 13.5,
    "latitude": 53.125,
    "longitude": 8.75,
    "altitude": null,
    "altitudeAccuracy": null,
    "heading": null,
    "speed": null
  }
}
```

## See also

- `JSON`
