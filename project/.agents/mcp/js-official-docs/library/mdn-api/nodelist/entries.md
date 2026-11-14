---
title: "NodeList: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodelist/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeList: entries() method

The **`NodeList.entries()`** method returns an
`iterator` allowing you to go through all key/value pairs
contained in this object. The values are `Node` objects.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Example

```js
const node = document.createElement("div");
const kid1 = document.createElement("p");
const kid2 = document.createTextNode("hey");
const kid3 = document.createElement("span");
node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);

const list = node.childNodes;

// Using for...of
for (const entry of list.entries()) {
  console.log(entry);
}
```

results in:

```plain
Array [ 0, <p> ]
Array [ 1, #text "hey" ]
Array [ 2, <span> ]
```

## See also

- Polyfill of `NodeList.prototype.entries` in `core-js`
- `Node`
- `NodeList`
