---
title: "Node: hasChildNodes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/haschildnodes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: hasChildNodes() method

The **`hasChildNodes()`** method of the `Node` interface
returns a boolean value indicating
whether the given `Node` has child nodes or not.

## Syntax

```js
hasChildNodes()
```

### Parameters

None.

### Return value

A boolean value that is `true` if the node has child nodes, and
`false` otherwise.

## Example

```js
let foo = document.getElementById("foo");

if (foo.hasChildNodes()) {
  // Do something with 'foo.childNodes'
}
```

## See also

- `Node.childNodes`
