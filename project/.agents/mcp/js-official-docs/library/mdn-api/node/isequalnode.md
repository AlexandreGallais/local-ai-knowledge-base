---
title: "Node: isEqualNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/isequalnode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: isEqualNode() method

The **`isEqualNode()`** method of the `Node` interface tests whether two nodes are equal.
Two nodes are equal when they have the same type, defining characteristics (for
elements, this would be their ID, number of children, and so forth), its attributes
match, and so on. The specific set of data points that must match varies depending on
the types of the nodes.

## Syntax

```js
isEqualNode(otherNode)
```

### Parameters

- `otherNode`
    The `Node` to compare equality with.
    > **Note:**
    > This parameter is not optional, but can be set to `null`.

### Return value

A boolean value that is `true` if the two nodes are equals, or `false` if not.
If `otherNode` is `null`, `isEqualNode()` always return false.

## Example

In this example, we create three `` blocks. The first and third
have the same contents and attributes, while the second is different. Then we run some
JavaScript to compare the nodes using `isEqualNode()` and output the results.

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

output.innerText += `div 0 equals div 0: ${divList[0].isEqualNode(
  divList[0],
)}\n`;
output.innerText += `div 0 equals div 1: ${divList[0].isEqualNode(
  divList[1],
)}\n`;
output.innerText += `div 0 equals div 2: ${divList[0].isEqualNode(
  divList[2],
)}\n`;
```

## See also

- `Node.isSameNode()`
