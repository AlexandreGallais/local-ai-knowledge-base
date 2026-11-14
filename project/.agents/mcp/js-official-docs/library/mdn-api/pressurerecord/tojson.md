---
title: "PressureRecord: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressurerecord/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureRecord: toJSON() method

The **`toJSON()`** method of the `PressureRecord` interface returns a JSON-serializable plain object representing the `PressureRecord` object.

The method is automatically called by `JSON.stringify()` when a `PressureRecord` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `source`
- `state`
- `time`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `PressureRecord` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
function callback(records) {
  const record = records[records.length - 1];

  const json = record.toJSON();
  console.log(json); // A plain object
  console.log(typeof json); // "object"
  console.log(json.state); // Same value as record.state
}

try {
  const observer = new PressureObserver(callback);
  await observer.observe("cpu", {
    sampleInterval: 1000, // 1000ms
  });
} catch (error) {
  // report error setting up the observer
}
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(record));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "source": "cpu",
  "state": "fair",
  "time": 1000.5
}
```

## See also

- `JSON`
