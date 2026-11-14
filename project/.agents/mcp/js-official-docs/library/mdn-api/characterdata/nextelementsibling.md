---
title: "CharacterData: nextElementSibling property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/nextelementsibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: nextElementSibling property

The read-only **`nextElementSibling`** property of the `CharacterData` interface
returns the first `Element` node following the specified one in its parent's
children list, or `null` if the specified element is the last one in the list.

## Value

An `Element` object, or `null` if no sibling has been found.

## Example

```html
TEXT
<div id="div-01">Here is div-01</div>
TEXT2
<div id="div-02">Here is div-02</div>
<pre>Here is the result area</pre>
```

```js
// Initially, set node to the Text node with `TEXT`
let node = document.getElementById("div-01").previousSibling;

let result = "Next element siblings of TEXT:\n";

while (node) {
  result += `${node.nodeName}\n`;
  node = node.nextElementSibling; // The first node is a CharacterData, the others Element objects
}

document.querySelector("pre").textContent = result;
```

## See also

- `CharacterData.previousElementSibling`
