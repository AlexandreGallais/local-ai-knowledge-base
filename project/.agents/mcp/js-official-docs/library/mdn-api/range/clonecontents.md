---
title: "Range: cloneContents() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/clonecontents/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: cloneContents() method

The **`cloneContents()`** method of the `Range` interface copies the selected `Node` children of the range's `commonAncestorContainer` and puts them in a new `DocumentFragment` object.

Nodes are cloned using the same algorithm as `Node.cloneNode()`, which means event listeners attached with scripts are not cloned. HTML `id` attributes are cloned, which can lead to an invalid document through cloning.

The first and last selected children of `commonAncestorContainer` may be partially selected. In this case, the child node itself is cloned, but its content is only the part that is selected, by recursively cloning the range between the original range's start/end boundary and that child node's end/start boundary.

```plain
<p>paragraph 1</p><p>paragraph 2</p><p>paragraph 3</p>
       ^----------- selection ------------^

cloneContents() returns:

<p>graph 1</p><p>paragraph 2</p><p>para</p>
```

## Syntax

```js
cloneContents()
```

### Parameters

None.

### Return value

A `DocumentFragment` object.

## Examples

```js
range = document.createRange();
range.selectNode(document.getElementsByTagName("div").item(0));
documentFragment = range.cloneContents();
document.body.appendChild(documentFragment);
```

## See also

- The DOM interfaces index
