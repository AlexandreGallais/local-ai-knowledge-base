---
title: "PerformanceServerTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceservertiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceServerTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceServerTiming` interface returns a JSON-serializable plain object representing the `PerformanceServerTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceServerTiming` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `name`
- `duration`
- `description`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceServerTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

Server timing metrics require the server to send the `Server-Timing` header. For example:

```http
Server-Timing: cache;desc="Cache Read";dur=23.2
```

The `serverTiming` entries can live on `navigation` and `resource` entries.

Example using a `PerformanceObserver`, which notifies of new `navigation` and `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.serverTiming.forEach((serverTiming) => {
      const json = serverTiming.toJSON();
      console.log(json); // A plain object
      console.log(typeof json); // "object"
      console.log(json.name); // Same value as serverTiming.name
    });
  });
});

["navigation", "resource"].forEach((type) =>
  observer.observe({ type, buffered: true }),
);
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(serverTiming));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "cache",
  "duration": 23.2,
  "description": "Cache Read"
}
```
