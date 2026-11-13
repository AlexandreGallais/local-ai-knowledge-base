---
title: "HTMLCollection: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlcollection/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLCollection: length property

The **`HTMLCollection.length`** property returns the number of
items in a `HTMLCollection`.

## Value

An integer value representing the number of items in a `HTMLCollection`.

## Examples

The `length` property is often useful in DOM programming. It's often used to
test the length of a list, to see if it exists at all. It's also commonly used as the
iterator in a `for` loop, as in this example.

```js
// All the elements with the class ".test" in the document
const items = document.getElementsByClassName("test");

// For each test item in the list,
// append the entire element as a string of HTML
let gross = "";
for (let i = 0; i < items.length; i++) {
  gross += items[i].innerHTML;
}

// gross is now all the HTML for the test elements
```
