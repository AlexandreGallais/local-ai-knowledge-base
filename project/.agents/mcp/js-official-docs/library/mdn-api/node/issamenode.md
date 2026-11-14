---
title: "Node: isSameNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/issamenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: isSameNode() method

The **`isSameNode()`** method of the `Node` interface
is a legacy alias the for the `===` strict equality operator.
That is, it tests whether two nodes are the same
(in other words, whether they reference the same object).

> **Note:**
> There is no need to use `isSameNode()`; instead use the `===` strict equality operator.

## Syntax

```js
isSameNode(otherNode)
```

### Parameters

- `otherNode`
    The `Node` to test against.
    > **Note:**
    > This parameter is not optional, but can be set to `null`.

### Return value

A boolean value that is `true` if both nodes are strictly equal, `false` if not.

## Example

In this example, we create three `` blocks. The first and third
have the same contents and attributes, while the second is different. Then we run some
JavaScript to compare the nodes using `isSameNode()` and output the results.

### HTML

```html
<div>This is the first element.</div>
<div>This is the second element.</div>
<div>This is the first element.</div>

<p id="output"></p>
```

```css
#output {
  width: 440px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  display: block;
}
```

### JavaScript

```js
const output = document.getElementById("output");
const divList = document.getElementsByTagName("div");

output.innerText += `div 0 same as div 0: ${divList[0].isSameNode(
  divList[0],
)}\n`;
output.innerText += `div 0 same as div 1: ${divList[0].isSameNode(
  divList[1],
)}\n`;
output.innerText += `div 0 same as div 2: ${divList[0].isSameNode(
  divList[2],
)}\n`;
```

## See also

- `Node.isEqualNode()`
