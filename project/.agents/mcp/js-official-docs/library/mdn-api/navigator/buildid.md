---
title: "Navigator: buildID property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/buildid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: buildID property

The **`buildID`** read-only property of the `Navigator` interface returns the build identifier of the browser. In modern browsers this property now returns a fixed timestamp as a privacy measure, e.g., `20181001000000` in Firefox 64 onwards.

## Value

A string representing the build identifier of the application. The build ID is in the form `YYYYMMDDHHMMSS`.

## Examples

```js
console.log(navigator.buildID);
```

## Specifications

Not part of any public standard.
