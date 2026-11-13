---
title: "WorkerNavigator: platform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/platform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: platform property

The **`platform`** read-only property of the `WorkerNavigator` interface returns a string representing the platform of the browser. The specification allows browsers to always return the empty string, so don't rely on this property to get a reliable answer.

## Value

A string identifying the platform on which the browser is running, or
an empty string if the browser declines to (or is unable to) identify the platform.
`platform` is a string that must be an empty string or a string representing
the platform on which the browser is executing.

For example: `"MacIntel"`, `"Win32"`, `"FreeBSD i386"`, `"WebTV OS"`.

> **Note:**
> On Windows, modern browsers return `"Win32"` even if running on a 64-bit version of Windows.

## Examples

```js
console.log(navigator.platform);
```
