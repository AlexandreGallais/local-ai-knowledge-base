---
title: "PressureObserver: unobserve() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/unobserve/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver: unobserve() method

The **`unobserve()`** method of the `PressureObserver` interface stops the pressure observer callback from receiving pressure records from the specified source.

## Syntax

```js
unobserve(source)
```

### Parameters

- `source`
    A string specifying which `source` to unobserve.

### Return value

None (`undefined`).

## Examples

### Stop observing a specific source

The following example shows how to stop observing the "gpu" source after the observer previously observed both, the "cpu" and "gpu" sources.

```js
const observer = new PressureObserver(callback);

observer.observe("cpu");
observer.observe("gpu");

// Callback now gets called whenever the pressure state changes for 'cpu' or 'gpu'.

observer.unobserve("gpu");

// Callback now only gets called whenever the pressure state changes for 'cpu'.
```
