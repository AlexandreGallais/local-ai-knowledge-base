---
title: "MutationRecord: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationrecord/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationRecord: target property

The `MutationRecord` read-only property **`target`** is the target (i.e., the mutated/changed node) of a mutation observed with a `MutationObserver`.

## Value

The `Node` that the mutation affected.

- If the record's `type` is `attributes`, this is the `Element` whose attributes changed.
- If the record's `type` is `characterData`, this is the `CharacterData` node.
- If the record's `type` is `childList`, this is the `Node` whose children changed.

## Examples

### Logging the target of a mutation

In the following example, there are two divs: a red div (`#red-div`) and a blue div (`#blue-div`), inside a container div `#container`. A `MutationObserver` is created to observe the container. The observer is observing changes to the childlist, and also has `subtree: true` so it will observe changes to the children of the container's children.

The observer callback logs the `target` of the mutation record. When we add nodes to the `#red-div` or the `#blue-div`, the `target` will be the `#red-div` or the `#blue-div`, respectively.

#### HTML

```html
<pre id="log">Target of mutation:</pre>
<button id="add-nodes-to-red-div">Add a node to red div</button>
<button id="add-nodes-to-blue-div">Add a node to blue div</button>
<button id="reset">Reset</button>
<div id="container">
  <div id="red-div"></div>
  <div id="blue-div"></div>
</div>
```

```css
#log {
  border: 1px dotted black;
  padding: 0.5rem;
}

#red-div {
  border: 1px solid red;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  overflow: auto;
}

#blue-div {
  border: 1px solid blue;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  overflow: auto;
}

#container {
  display: grid;
  grid-template-columns: 50% auto;
}
```

#### JavaScript

```js
const container = document.querySelector("#container");
const redDiv = document.querySelector("#red-div");
const blueDiv = document.querySelector("#blue-div");
const addToRed = document.querySelector("#add-nodes-to-red-div");
const addToBlue = document.querySelector("#add-nodes-to-blue-div");
const reset = document.querySelector("#reset");
const log = document.querySelector("#log");

addToRed.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Current time: ${Date.now()}`;
  redDiv.appendChild(newPara);
});

addToBlue.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Current time: ${Date.now()}`;
  blueDiv.appendChild(newPara);
});

reset.addEventListener("click", () => self.location.reload());

function logMutationTarget(records) {
  for (const record of records) {
    log.textContent = `Target of mutation: ${record.target.id}`;
  }
}

const observer = new MutationObserver(logMutationTarget);
observer.observe(container, { childList: true, subtree: true });
```

#### Result
