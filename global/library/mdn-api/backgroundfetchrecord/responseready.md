---
title: "BackgroundFetchRecord: responseReady property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchrecord/responseready/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRecord: responseReady property

The **`responseReady`** read-only property of the `BackgroundFetchRecord` interface returns a `Promise` that resolves with a `Response`.

## Value

A `Promise` that resolves with a `Response`.

## Examples

In this example an individual `BackgroundFetchRecord` is returned using `BackgroundFetchManager.fetch()`. The value of `responseReady` is returned and logged to the console.

```js
bgFetch.match("/ep-5.mp3").then(async (record) => {
  if (!record) {
    console.log("No record found");
    return;
  }

  const response = await record.responseReady;
  console.log(`Here's the response`, response);
});
```
