---
title: "BackgroundFetchRecord"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchrecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRecord

The **`BackgroundFetchRecord`** interface of the `Background Fetch API` represents an individual request and response.

A `BackgroundFetchRecord` is created by the `BackgroundFetchRegistration.matchAll()` method, therefore there is no constructor for this interface.

There will be one `BackgroundFetchRecord` for each resource requested by `fetch()`.

## Instance properties

- `request` (read-only) (experimental)
    Returns a `Request`.
- `responseReady` (read-only) (experimental)
    Returns a promise that resolves with a `Response`.

## Examples

In this example an individual `BackgroundFetchRecord` is returned using `BackgroundFetchRegistration.matchAll()`. The `BackgroundFetchRecord.request` and `BackgroundFetchRecord.responseReady` are returned and logged to the console.

```js
bgFetch.match("/ep-5.mp3").then(async (record) => {
  if (!record) {
    console.log("No record found");
    return;
  }

  console.log(`Here's the request`, record.request);
  const response = await record.responseReady;
  console.log(`And here's the response`, response);
});
```
