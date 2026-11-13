---
title: "Node: nodeValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/nodevalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: nodeValue property

The **`nodeValue`** property of the `Node` interface returns or sets the value of the current node.

## Value

A string containing the value of the current node, if any.
For the document itself, `nodeValue` returns `null`.
For text, comment, and CDATA nodes, `nodeValue` returns the content of the node.
For attribute nodes, the value of the attribute is returned.

The following table shows the return values for different types of nodes.

| Node                                 | Value of nodeValue                  |
| ------------------------------------ | ----------------------------------- |
| `CDATASection`          | Content of the CDATA section        |
| `Comment`               | Content of the comment              |
| `Document`              | `null`                              |
| `DocumentFragment`      | `null`                              |
| `DocumentType`          | `null`                              |
| `Element`               | `null`                              |
| `NamedNodeMap`          | `null`                              |
| `ProcessingInstruction` | Entire content excluding the target |
| `Text`                  | Content of the text node            |

> **Note:**
> When `nodeValue` is defined to be `null`, setting it has no effect.

## Example

```html
<div id="d1">Hello world</div>
<!-- Example of comment -->
<output id="result">Not calculated yet.</output>
```

and the following script:

```js
let node = document.querySelector("body").firstChild;
let result = "Node names are:\n";
while (node) {
  result += `Value of ${node.nodeName}: ${node.nodeValue}\n`;
  node = node.nextSibling;
}

const output = document.getElementById("result");
output.innerText = result;
```
