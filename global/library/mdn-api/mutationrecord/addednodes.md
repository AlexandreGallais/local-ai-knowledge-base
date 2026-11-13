---
title: "MutationRecord: addedNodes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationrecord/addednodes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationRecord: addedNodes property

The `MutationRecord` read-only property **`addedNodes`** is a `NodeList` of nodes added to a target node by a mutation observed with a `MutationObserver`.

## Value

A `NodeList` containing the nodes added to the target of the mutation observed by the `MutationObserver`.

## Examples

### Update when adding a node

In the following example, there are two buttons: one to add new nodes to a target node, and one to remove them. A `MutationObserver` is used to observe the target node for changes; when a change is detected, the observer calls a function, `logNewNodes()`.

The `logNewNodes()` function checks that the MutationRecord's `type` is `childList`, which means that the target node's children have changed. If the type is `childList` the function updates the total number of new nodes that have been added. However, note that clicking the "Remove a node" button will not increment the total number of new nodes, because in this case `record.addedNodes` will have a length of `0`.

#### HTML

```html
<button id="add-nodes">Add a node</button>
<button id="remove-nodes">Remove a node</button>
<button id="reset">Reset</button>

<pre id="counter">Total added nodes: 0</pre>
<div id="target"></div>
```

```css
#counter {
  border: 1px dotted black;
  padding: 0.5rem;
}
```

#### JavaScript

```js
const addNodes = document.querySelector("#add-nodes");
const removeNodes = document.querySelector("#remove-nodes");
const reset = document.querySelector("#reset");
const counter = document.querySelector("#counter");
const target = document.querySelector("#target");
let totalAddedNodes = 0;

addNodes.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Current time: ${Date.now()}`;
  target.appendChild(newPara);
});

removeNodes.addEventListener("click", () => {
  const lastChild = target.lastChild;
  if (lastChild) {
    target.removeChild(lastChild);
  }
});

reset.addEventListener("click", () => self.location.reload());

function logNewNodes(records) {
  for (const record of records) {
    // Check if the childList of the target node has been mutated
    if (record.type === "childList") {
      totalAddedNodes += record.addedNodes.length;
      // Log the number of nodes added
      counter.textContent = `Total added nodes: ${totalAddedNodes}`;
    }
  }
}

const observer = new MutationObserver(logNewNodes);
observer.observe(target, { childList: true });
```

#### Result
