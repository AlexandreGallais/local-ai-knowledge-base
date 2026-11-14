---
title: "HTMLAllCollection: namedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlallcollection/nameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAllCollection: namedItem() method

The **`namedItem()`** method of the `HTMLAllCollection` interface returns the first `Element` in the collection whose `id` or `name` attribute matches the specified name, or `null` if no element matches.

## Syntax

```js
namedItem(name)
```

### Parameters

- `name`
    A string representing the value of the `id` or `name` attribute of the element we are looking for.

### Return value

The first `Element` in the `HTMLAllCollection` matching the `name`, or `null`, if there are none.
