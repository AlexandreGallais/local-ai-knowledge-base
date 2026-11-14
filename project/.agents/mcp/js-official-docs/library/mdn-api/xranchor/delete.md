---
title: "XRAnchor: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xranchor/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRAnchor: delete() method

The **`delete()`** method of the `XRAnchor` interface removes an anchor. This can be useful when an application is no longer interested in receiving updates to an anchor.

## Syntax

```js
delete()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Removing all anchors

```js
let anchorsCollection = new Set();

// Upon creating anchors, add them to the Set
// anchorsCollection.add(anchor);

for (const anchor of anchorsCollection) {
  anchor.delete();
}

anchorsCollection.clear();
```
