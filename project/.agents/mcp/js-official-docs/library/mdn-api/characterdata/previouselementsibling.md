---
title: "CharacterData: previousElementSibling property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/previouselementsibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: previousElementSibling property

The read-only **`previousElementSibling`** property of the `CharacterData` interface
returns the first `Element` before the current node in its parent's children list,
or `null` if there is none.

## Value

An `Element` object, or `null` if no sibling has been found.

## Example

```html
<div id="div-01">Here is div-01</div>
TEXT
<div id="div-02">Here is div-02</div>
SOME TEXT
<div id="div-03">Here is div-03</div>
<pre>Result</pre>
```

```js
// Initially set node to the Text node with `SOME TEXT`
let node = document.getElementById("div-02").nextSibling;

let result = "Previous element siblings of SOME TEXT:\n";

while (node) {
  result += `${node.nodeName}\n`;
  node = node.previousElementSibling;
}

document.querySelector("pre").textContent = result;
```

## See also

- `CharacterData.nextElementSibling`
