---
title: "Navigator: productSub property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/productsub/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: productSub property

The **`Navigator.productSub`** read-only property that returns either the string "20030107", or the string "20100101".

## Value

Either "20030107", or "20100101".

## Examples

```js
document.body.textContent = `productSub: ${navigator.productSub}`;
```

## Notes

On IE, this property returns undefined.

On Apple Safari and Google Chrome this property always returns `20030107`.

On Firefox, this property always returns `20100101`.
