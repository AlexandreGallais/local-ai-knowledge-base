---
title: "MediaDeviceInfo: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediadeviceinfo/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaDeviceInfo: toJSON() method

The **`toJSON()`** method of the `MediaDeviceInfo` interface returns a JSON-serializable plain object representing the `MediaDeviceInfo` object.

The method is automatically called by `JSON.stringify()` when a `MediaDeviceInfo` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `deviceId`
- `kind`
- `label`
- `groupId`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `MediaDeviceInfo` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
} else {
  // List cameras and microphones.
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        const json = device.toJSON();
        console.log(json); // A plain object
        console.log(typeof json); // "object"
        console.log(json.deviceId); // Same value as device.deviceId
      });
    })
    .catch((err) => {
      console.log(`${err.name}: ${err.message}`);
    });
}
```

### Serializing to a JSON string

Within the `forEach()` callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(device));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "deviceId": "HJtTemQTM64Bivxv3ZEyKjCi1VR8042lPNpmXKObKJE=",
  "kind": "videoinput",
  "label": "",
  "groupId": "Okm2l1YZTrwy8awTxE8QSLNFoVMdIXx++wLh68tbmv0="
}
```

Each additional device is logged as a separate JSON string.

## See also

- `JSON`
