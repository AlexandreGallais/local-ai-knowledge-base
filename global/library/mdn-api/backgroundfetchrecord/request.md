---
title: "BackgroundFetchRecord: request property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchrecord/request/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRecord: request property

The **`request`** read-only property of the `BackgroundFetchRecord` interface returns the details of the resource to be fetched.

## Value

A `Request`.

## Examples

In this example an individual `BackgroundFetchRecord` is returned using `BackgroundFetchManager.fetch()`. The `request` is returned and logged to the console.

```js
bgFetch.match("/ep-5.mp3").then(async (record) => {
  if (!record) {
    console.log("No record found");
    return;
  }

  console.log(`Here's the request`, record.request);
});
```
