---
title: "Storage"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage

The **`Storage`** interface of the Web Storage API provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items.

To manipulate, for instance, the session storage for a domain, a call to `Window.sessionStorage` is made; whereas for local storage the call is made to `Window.localStorage`.

## Instance properties

- `Storage.length` (read-only)
    Returns an integer representing the number of data items stored in the `Storage` object.

## Instance methods

- `Storage.key()`
    When passed a number `n`, this method will return the name of the nth key in the storage.
- `Storage.getItem()`
    When passed a key name, will return that key's value.
- `Storage.setItem()`
    When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
- `Storage.removeItem()`
    When passed a key name, will remove that key from the storage.
- `Storage.clear()`
    When invoked, will empty all keys out of the storage.

## Examples

Here we access a `Storage` object by calling `localStorage`. We first test whether the local storage contains data items using `!localStorage.getItem('bgcolor')`. If it does, we run a function called `setStyles()` that grabs the data items using `Storage.getItem()` and uses those values to update page styles. If it doesn't, we run another function, `populateStorage()`, which uses `Storage.setItem()` to set the item values, then runs `setStyles()`.

```js
if (!localStorage.getItem("bgcolor")) {
  populateStorage();
} else {
  setStyles();
}

function populateStorage() {
  localStorage.setItem("bgcolor", document.getElementById("bgcolor").value);
  localStorage.setItem("font", document.getElementById("font").value);
  localStorage.setItem("image", document.getElementById("image").value);

  setStyles();
}

function setStyles() {
  const currentColor = localStorage.getItem("bgcolor");
  const currentFont = localStorage.getItem("font");
  const currentImage = localStorage.getItem("image");

  document.getElementById("bgcolor").value = currentColor;
  document.getElementById("font").value = currentFont;
  document.getElementById("image").value = currentImage;

  htmlElem.style.backgroundColor = `#${currentColor}`;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute("src", currentImage);
}
```

> **Note:**
> To see this running as a complete working example, see our Web Storage Demo.

## See also

- Using the Web Storage API
- `Window.localStorage`
- `Window.sessionStorage`
- `CacheStorage`
