---
title: "PressureObserver: knownSources static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/knownsources_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver: knownSources static property

The static **`knownSources`** read-only property of the `PressureObserver` interface returns an array of the `source` values supported by the user agent in alphabetical order.

> **Note:**
> The list of supported sources varies per browser, operating system, and hardware, and is evolving. This property is merely a hint about source types the user agents supports. Call `observe()` and check for a `NotSupportedError` to see if pressure observation is possible.

## Value

An array of `PressureRecord.source` values.

## Examples

### Using the console to see known sources

To find out which `source` values a browser knows, enter `PressureObserver.knownSources` into the console. This will return an array of known sources.

```js
PressureObserver.knownSources;
// returns ["cpu"] in Chrome 125
```
