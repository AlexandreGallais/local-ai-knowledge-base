---
title: "NavigatorUAData: mobile property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatoruadata/mobile/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorUAData: mobile property

The **`mobile`** read-only property of the `NavigatorUAData` interface returns a value indicating whether the device is a mobile device.

## Value

A `Boolean`, `true` if this is a mobile device.

## Examples

The following example prints the value of `mobile` to the console.

```js
console.log(navigator.userAgentData.mobile);
```

## See also

- The `Sec-CH-UA-Mobile` header (a low-entropy client hint) contains the same information.
