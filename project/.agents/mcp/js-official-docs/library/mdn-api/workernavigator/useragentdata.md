---
title: "WorkerNavigator: userAgentData property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/useragentdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: userAgentData property

The **`userAgentData`** read-only property of the `WorkerNavigator` interface returns a `NavigatorUAData` object which can be used to access the `User-Agent Client Hints API`.

## Value

A `NavigatorUAData` object.

## Examples

The following example prints the value of `NavigatorUAData.brands` to the console.

```js
console.log(navigator.userAgentData.brands);
```

## See also

- Improving user privacy and developer experience with User-Agent Client Hints
