---
title: "GeolocationCoordinates: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/geolocationcoordinates/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeolocationCoordinates: toJSON() method

The **`toJSON()`** method of the `GeolocationCoordinates` interface returns a JSON-serializable plain object representing the `GeolocationCoordinates` object.

The method is automatically called by `JSON.stringify()` when a `GeolocationCoordinates` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `accuracy`
- `latitude`
- `longitude`
- `altitude`
- `altitudeAccuracy`
- `heading`
- `speed`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `GeolocationCoordinates` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
navigator.geolocation.getCurrentPosition((position) => {
  const coords = position.coords;

  const json = coords.toJSON();
  console.log(json); // A plain object
  console.log(typeof json); // "object"
  console.log(json.latitude); // Same value as coords.latitude
});
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(coords));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "accuracy": 12.5,
  "latitude": 53.125,
  "longitude": 8.75,
  "altitude": null,
  "altitudeAccuracy": null,
  "heading": null,
  "speed": null
}
```

## See also

- `JSON`
