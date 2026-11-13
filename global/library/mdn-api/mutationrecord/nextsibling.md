---
title: "MutationRecord: nextSibling property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationrecord/nextsibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationRecord: nextSibling property

The `MutationRecord` read-only property **`nextSibling`** is the next sibling of an added or removed child node of the `target` of a `MutationObserver`.

## Value

If a node is added to or removed from the `target` of a `MutationObserver`, the value is the `Node` that is the next sibling of the added or removed node: that is, the node immediately following this one in the parent's `childNodes` list.

The value is `null` if there are no added or removed nodes, or if the node is the last child of its parent.

## Examples

### Log the next sibling of a mutation

This adds/removes a node every time you click the button, but it performs the update at the _start of the target_, not the end. Then the observer logs the `textContent` of the `nextSibling` of the updated node.

#### HTML

```html
<button id="add-nodes">Add a node</button>
<button id="remove-nodes">Remove a node</button>
<button id="reset">Reset</button>

<pre id="log" class="log">Next sibling of updated node:</pre>
<div id="target"><p>Node #0</p></div>
```

```css
.log {
  border: 1px dotted black;
  padding: 0.5rem;
}
```

#### JavaScript

```js
const addNodes = document.querySelector("#add-nodes");
const removeNodes = document.querySelector("#remove-nodes");
const reset = document.querySelector("#reset");
const target = document.querySelector("#target");

addNodes.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Node #${target.childElementCount}`;
  target.insertBefore(newPara, target.firstChild);
});

removeNodes.addEventListener("click", () => {
  const oldPara = target.firstChild;
  if (oldPara) {
    target.removeChild(oldPara);
  }
});

reset.addEventListener("click", () => self.location.reload());

function logNextSibling(records) {
  for (const record of records) {
    if (record.type === "childList") {
      log.textContent = `Next sibling of updated node: ${record.nextSibling?.textContent ?? null}`;
    }
  }
}

const observer = new MutationObserver(logNextSibling);
observer.observe(target, { childList: true });
```

#### Result
