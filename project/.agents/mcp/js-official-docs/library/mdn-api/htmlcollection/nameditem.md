---
title: "HTMLCollection: namedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcollection/nameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCollection: namedItem() method

The **`namedItem()`** method of the `HTMLCollection` interface returns
the first `Element` in the collection whose `id` or `name` attribute match the specified name, or `null` if no element matches.

In JavaScript, instead of calling `collection.namedItem("value")`, you can also directly access the name on the collection, like `collection["value"]`, unless the name collides with one of the existing `HTMLCollection` properties.

## Syntax

```js
namedItem(key)
```

### Parameters

- `key`
    A string representing the value of the `id` or `name` attribute of the element we are looking for.

### Return value

The first `Element` in the `HTMLCollection` matching the `key`, or `null` if there is none. Always returns `null` if `key` is the empty string.

## Example

### HTML

```html
<div id="personal">
  <span name="title">Dr.</span>
  <span name="first-name">Carina</span>
  <span name="last-name">Anand</span>
  <span id="degree">(MD)</span>
</div>
```

### JavaScript

```js
const container = document.getElementById("personal");

// Returns the HTMLSpanElement with the name "title" if no such element exists null is returned
const titleSpan = container.children.namedItem("title");

// The following variants return undefined instead of null if there's no element with a matching name or id
const firstNameSpan = container.children["first-name"];
const lastNameSpan = container.children["last-name"];

// Returns the span element with the id "degree"
const degreeSpan = container.children.namedItem("degree");

const output = document.createElement("div");
output.textContent = `Result: ${titleSpan.textContent} ${firstNameSpan.textContent} ${lastNameSpan.textContent} ${degreeSpan.textContent}`;

container.insertAdjacentElement("afterend", output);
```
