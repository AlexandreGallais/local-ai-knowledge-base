---
title: "HTMLMediaElement: buffered property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/buffered/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: buffered property

The **`buffered`** read-only property of `HTMLMediaElement` objects returns a new static normalized `TimeRanges` object that represents the ranges of the media resource, if any, that the user agent has buffered at the moment the `buffered` property is accessed.

## Value

A new static normalized TimeRanges object that represents the ranges of the media resource, if any, that the user agent has buffered at the moment the `buffered` property is accessed.

## Examples

```js
const obj = document.createElement("video");
console.log(obj.buffered); // TimeRanges { length: 0 }
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.buffered` property
