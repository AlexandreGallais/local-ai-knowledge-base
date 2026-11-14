---
title: "PressureObserver: takeRecords() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/takerecords/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver: takeRecords() method

The **`takeRecords()`** method of the `PressureObserver` interface returns the current list of pressure records stored in the pressure observer, emptying it out.

It is useful when you want to a stop observing a source but would like to be sure to get any records that have not yet been passed into the observer callback.

## Syntax

```js
takeRecords()
```

### Parameters

None.

### Return value

An `Array` of `PressureRecord` objects.

## Examples

### Taking records

The following example stores the current list of pressure records into `records` and empties the pressure observer.

```js
const observer = new PressureObserver(callback);
observer.observe("cpu");

const records = observer.takeRecords();
observer.disconnect(); // shut down observer now that we've taken records

if (records.length > 0) {
  console.log(records[0].state);
  console.log(records[0].time);
}
```
