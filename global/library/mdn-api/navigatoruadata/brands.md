---
title: "NavigatorUAData: brands property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatoruadata/brands/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorUAData: brands property

The **`brands`** read-only property of the `NavigatorUAData` interface returns an array of brand information.

## Value

An array containing the following information for each brand:

- `brand`
    A string containing the brand. For example, `"Google Chrome"`.
- `version`
    A string containing the version. For example, `"91"`.

## Examples

The following example prints the value of `brands` to the console.

```js
console.log(navigator.userAgentData.brands);
```

## See also

- `Sec-CH-UA` (a low-entropy client hint) contains the same information.
