---
title: "Range: setStart() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/setstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: setStart() method

The **`Range.setStart()`** method sets the start position of a
`Range`.

If the `startNode` is a `Node` of type `Text`,
`Comment`, or `CDataSection`, then `startOffset` is
the number of characters from the start of `startNode`. For other
`Node` types, `startOffset` is the number of child nodes between
the start of the `startNode`.

Setting the start point below (lower in the document) the end point will result in a
collapsed range with the start and end points both set to the specified start position.

## Syntax

```js
setStart(startNode, startOffset)
```

### Parameters

- `startNode`
    The `Node` where the `Range` should start.
- `startOffset`
    An integer greater than or equal to zero representing the offset for the start of
    the `Range` from the start of `startNode`.

### Return value

None (`undefined`).

## Examples

### Highlight part of an element

This example uses the `Range.setStart()` and `Range.setEnd()`
methods to add part of an address to a range. The selected range is then highlighted
using `Range.surroundContents()`.

The address contains nine nodes: five text nodes, and four ``
elements.

#### HTML

```html
<p id="address">
  Wyatt Earp<br />
  101 E. Main St.<br />
  Dodge City, KS<br />
  67801<br />
  USA
</p>

<hr />
<p>Nodes in the original address:</p>
<ol id="log"></ol>
```

#### JavaScript

```js
const address = document.getElementById("address");
const log = document.getElementById("log");

// Log info
address.childNodes.forEach((node) => {
  const li = document.createElement("li");
  li.textContent = `${node.nodeName}, ${node.nodeValue}`;
  log.appendChild(li);
});

// Highlight the street and city
const startOffset = 2; // Start at third node: 101 E. Main St.
const endOffset = 5; // End at fifth node: Dodge City, KS
const range = document.createRange();
range.setStart(address, startOffset);
range.setEnd(address, endOffset);

const mark = document.createElement("mark");
range.surroundContents(mark);
```

#### Result

### Get characters from a text node

This example uses the `Range.setStart()` and `Range.setEnd()`
methods to define the contents of a range. The resulting range contains the first
through fifth characters within a text node.

#### HTML

```html
<p id="content">0123456789</p>
<p id="log"></p>
```

#### JavaScript

```js
const element = document.getElementById("content");
const textNode = element.childNodes[0];
const range = document.createRange();
range.setStart(textNode, 0); // Start at first character
range.setEnd(textNode, 5); // End at fifth character
document.getElementById("log").textContent = range;
```

#### Result

## See also

- The DOM interfaces index
