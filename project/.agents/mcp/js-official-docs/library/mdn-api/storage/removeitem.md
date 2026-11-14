---
title: "Storage: removeItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/removeitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage: removeItem() method

The **`removeItem()`** method of the `Storage`
interface, when passed a key name, will remove that key from the given
`Storage` object if it exists.
The **`Storage`** interface of the Web Storage API provides access to a
particular domain's session or local storage.

If there is no item associated with the given key, this method will do nothing.

## Syntax

```js
removeItem(keyName)
```

### Parameters

- `keyName`
    A string containing the name of the key you want to remove.

### Return value

None (`undefined`).

## Examples

The following function creates three data items inside local storage, then removes the
`image` data item.

```js
function populateStorage() {
  localStorage.setItem("bgcolor", "red");
  localStorage.setItem("font", "Helvetica");
  localStorage.setItem("image", "myCat.png");

  localStorage.removeItem("image");
}
```

We can do the same for the session storage.

```js
function populateStorage() {
  sessionStorage.setItem("bgcolor", "red");
  sessionStorage.setItem("font", "Helvetica");
  sessionStorage.setItem("image", "myCat.png");

  sessionStorage.removeItem("image");
}
```

> **Note:**
> To see this used within a real-world example, see our Web Storage Demo.

## See also

Using the Web Storage API
