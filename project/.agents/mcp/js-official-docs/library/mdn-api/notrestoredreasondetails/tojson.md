---
title: "NotRestoredReasonDetails: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notrestoredreasondetails/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotRestoredReasonDetails: toJSON() method

The **`toJSON()`** method of the `NotRestoredReasonDetails` interface returns a JSON-serializable plain object representing the `NotRestoredReasonDetails` object.

The method is automatically called by `JSON.stringify()` when a `NotRestoredReasonDetails` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `reason`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `NotRestoredReasonDetails` object from the first navigation entry. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const navEntries = performance.getEntriesByType("navigation");
const navEntry = navEntries[0];
const reason = navEntry.notRestoredReasons.reasons[0];

const json = reason.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.reason); // Same value as reason.reason
```

### Serializing to a JSON string

The object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(reason));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "reason": "masked"
}
```

## See also

- `JSON`
- Monitoring bfcache blocking reasons
- `PerformanceNavigationTiming.notRestoredReasons`
