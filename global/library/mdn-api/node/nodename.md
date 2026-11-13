---
title: "Node: nodeName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/nodename/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: nodeName property

The read-only **`nodeName`** property of `Node` returns the name of the current node as a string.

## Value

A string. Values for the different types of nodes are:

- `Attr`
    The value of `Attr.name`, that is the _qualified name_ of the attribute.
- `CDATASection`
    The string `"#cdata-section"`.
- `Comment`
    The string `"#comment"`.
- `Document`
    The string `"#document"`.
- `DocumentFragment`
    The string `"#document-fragment"`.
- `DocumentType`
    The value of `DocumentType.name`
- `Element`
    The value of `Element.tagName`, that is the _uppercase_ name of the element tag if an HTML element,
    or the _lowercase_ element tag if an XML element (like an SVG or MathML element).
- `ProcessingInstruction`
    The value of `ProcessingInstruction.target`
- `Text`
    The string `"#text"`.

## Example

This example displays the node names of several nodes

```html
This is some HTML:
<div id="d1">Hello world</div>
<!-- Example of comment -->
Text <span>Text</span> Text<br />
<svg height="20" width="20">
  <circle cx="10" cy="10" r="5" stroke="black" stroke-width="1" fill="red" />
</svg>
<hr />
<output id="result">Not calculated yet.</output>
```

and the following script:

```js
let node = document.querySelector("body").firstChild;
let result = "Node names are:\n";
while (node) {
  result += `${node.nodeName}\n`;
  node = node.nextSibling;
}

const output = document.getElementById("result");
output.innerText = result;
```

## See also

- `Element.tagName`
- `Attr.name`
- `DocumentType.name`
- `ProcessingInstruction.target`
