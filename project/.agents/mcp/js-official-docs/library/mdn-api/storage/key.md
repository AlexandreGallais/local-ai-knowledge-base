---
title: "Storage: key() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/key/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage: key() method

The **`key()`** method of the `Storage` interface,
when passed a number n, returns the name of the nth key in a given `Storage`
object. The order of keys is user-agent defined, so you should not rely on it.

## Syntax

```js
key(index)
```

### Parameters

- `index`
    An integer representing the number of the key you want to get the name of. This is a
    zero-based index.

### Return value

A string containing the name of the key. If the index does not exist,
`null` is returned.

## Examples

The following function iterates over the local storage keys:

```js
function forEachKey(callback) {
  for (let i = 0; i < localStorage.length; i++) {
    callback(localStorage.key(i));
  }
}
```

The following function iterates over the local storage keys and gets the value set for
each key:

```js
for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)));
}
```

> **Note:**
> For a real-world example, see our Web Storage Demo.

## See also

- Using the Web Storage API
