---
title: "Storage: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage: length property

The **`length`** read-only property of the
`Storage` interface returns the number of data items stored in a given
`Storage` object.

## Value

The number of items stored in the `Storage` object.

## Examples

The following function adds three data items to the local storage for the current
domain, then returns the number of items in the storage:

```js
function populateStorage() {
  localStorage.setItem("bgcolor", "yellow");
  localStorage.setItem("font", "Helvetica");
  localStorage.setItem("image", "cats.png");

  return localStorage.length; // Should return 3
}
```

> **Note:**
> For a real-world example, see our Web Storage Demo.

## See also

- Using the Web Storage API
