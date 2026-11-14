---
title: "Storage: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage: clear() method

The **`clear()`** method of the `Storage`
interface clears all keys stored in a given `Storage` object.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The following function creates three data entries in local storage, and then deletes
them by using `clear()`.

```js
function populateStorage() {
  localStorage.setItem("bgcolor", "red");
  localStorage.setItem("font", "Helvetica");
  localStorage.setItem("image", "miGato.png");

  localStorage.clear();
}
```

> **Note:**
> For a real-world example, see our Web Storage Demo.

## See also

Using the Web Storage API
