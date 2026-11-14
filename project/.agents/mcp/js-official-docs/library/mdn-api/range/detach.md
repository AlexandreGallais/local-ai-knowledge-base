---
title: "Range: detach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/detach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: detach() method

The **`Range.detach()`** method does nothing. It used to
disable the `Range` object and enable the browser to release associated
resources. The method has been kept for compatibility.

## Syntax

```js
detach()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const range = document.createRange();

range.selectNode(document.getElementsByTagName("div").item(0));
range.detach();
```

## See also

- The DOM interfaces index
