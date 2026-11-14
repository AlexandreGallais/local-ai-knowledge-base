---
title: "NavigatorUAData: platform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatoruadata/platform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorUAData: platform property

The **`platform`** read-only property of the `NavigatorUAData` interface returns the platform brand information.

## Value

A string containing the platform brand.
For example, `"Windows"`.

## Examples

The following example prints the value of `platform` to the console.

```js
console.log(navigator.userAgentData.platform);
```

## See also

- The `Sec-CH-UA-Platform` header (a low-entropy client hint) contains the same information.
