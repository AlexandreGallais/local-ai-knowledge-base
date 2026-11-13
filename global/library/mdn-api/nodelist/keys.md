---
title: "NodeList: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodelist/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeList: keys() method

The **`NodeList.keys()`** method returns an
`iterator` allowing you to go through all keys contained
in this object. The keys are `unsigned integer`.

## Syntax

```js
keys()
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

let list = node.childNodes;

// Using for...of
for (const key of list.keys()) {
  console.log(key);
}
```

The result is:

```plain
0
1
2
```

## See also

- Polyfill of `NodeList.prototype.keys` in `core-js`
- `Node`
- `NodeList`
