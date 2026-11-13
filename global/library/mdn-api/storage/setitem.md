---
title: "Storage: setItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/setitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage: setItem() method

The **`setItem()`** method of the `Storage`
interface, when passed a key name and value, will add that key to the given
`Storage` object, or update that key's value if it already exists.

## Syntax

```js
setItem(keyName, keyValue)
```

### Parameters

- `keyName`
    A string containing the name of the key you want to create/update.
- `keyValue`
    A string containing the value you want to give the key you are
    creating/updating.

### Return value

None (`undefined`).

### Exceptions

- `QuotaExceededError`
    Thrown if the storage run out of disk quota or the user declined to grant you more space.

## Examples

The following function creates three data items inside local storage.

```js
function populateStorage() {
  localStorage.setItem("bgcolor", "red");
  localStorage.setItem("font", "Helvetica");
  localStorage.setItem("image", "myCat.png");
}
```

> **Note:**
> To see this used within a real-world example, see our Web Storage Demo.

`Storage` only supports storing and retrieving strings. If you want to save other data types, you have to convert them to strings. For plain objects and arrays, you can use `JSON.stringify()`.

```js
const person = { name: "Alex" };
localStorage.setItem("user", person);
console.log(localStorage.getItem("user")); // "[object Object]"; not useful!
localStorage.setItem("user", JSON.stringify(person));
console.log(JSON.parse(localStorage.getItem("user"))); // { name: "Alex" }
```

However, there's no generic way to store arbitrary data types. Furthermore, the retrieved object is a deep copy of the original object and mutations to it do not affect the original object.

## See also

- Storage.getItem()
- Storage.removeItem()
- Using the Web Storage API
