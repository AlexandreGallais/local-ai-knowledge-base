---
title: "PerformanceTiming: domInteractive property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/dominteractive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: domInteractive property

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The legacy
**`PerformanceTiming.domInteractive`**
read-only property returns an `unsigned long long` representing the moment,
in milliseconds since the UNIX epoch, when the parser finished its work on the main
document, that is when its `Document.readyState` changes to
`'interactive'` and the corresponding `readystatechange` event is
thrown.

This property can be used to measure the speed of loading websites that users
_feels_. Nevertheless there are a few caveats that happens if scripts are
blocking rendering and not loaded asynchronously or with custom Web fonts. Check if you are in one of these cases before using this property as a proxy for the
user experience of a website's speed of loading.

## Value

An `unsigned long long`.

## See also

- The `PerformanceTiming` interface it belongs to.
- The article "domInteractive: is it? really?" explaining when you can use this property as a proxy for the
  user experience of loading a website.
