---
title: "AudioParam: cancelAndHoldAtTime() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioparam/cancelandholdattime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioParam: cancelAndHoldAtTime() method

The **`cancelAndHoldAtTime()`** method of the
`AudioParam` interface cancels all scheduled future changes to the
`AudioParam` but holds its value at a given time until further changes are
made using other methods.

## Syntax

```js
cancelAndHoldAtTime(cancelTime)
```

### Parameters

- `cancelTime`
    A double representing the time (in seconds) after the `AudioContext` was
    first created after which all scheduled changes will be canceled.

### Return value

A reference to the `AudioParam` it was called on.
