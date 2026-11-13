---
title: "SharedStorageSelectURLOperation: run() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedstorageselecturloperation/run/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedStorageSelectURLOperation: run() method

The **`run()`** method of the `SharedStorageSelectURLOperation` interface defines the structure to which the `run()` method defined inside a URL Selection output gate operation should conform.

## Syntax

```js
run(urls, data)
```

### Parameters

- `urls`
    An array of objects representing the URLs to be chosen by the URL Selection operation. Each object contains two properties:
    - `url`
        A string representing the URL.
    - `reportingMetadata` (optional)
        An object containing properties where names are event types and values are URLs pointing to reporting destinations, for example `"click" : "my-reports/report1.html"`. The URLs act as destinations for reports submitted with a destination of type `"shared-storage-select-url"`, typically submitted via a `Fence.reportEvent()` or `Fence.setReportEventDataForAutomaticBeacons()` method call.
- `data`
    An object representing any data required for executing the operation.

### Return value

A `Promise` that fulfills with a number defining the array index of the URL selected by the operation.

## Examples

See the main `SharedStorageSelectURLOperation` page for an example.

## See also

- Shared Storage API
