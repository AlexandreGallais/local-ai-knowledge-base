---
title: "Storage: getItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage/getitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage: getItem() method

The **`getItem()`** method of the `Storage`
interface, when passed a key name, will return that key's value, or `null` if
the key does not exist, in the given `Storage` object.

## Syntax

```js
getItem(keyName)
```

### Parameters

- `keyName`
    A string containing the name of the key you want to retrieve the
    value of.

### Return value

A string containing the value of the key. If the key does not exist,
`null` is returned.

## Examples

The following function retrieves three data items from local storage, then uses them to
set custom styles on a page.

```js
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
> To see this used within a real-world example, see our Web Storage Demo.

## See also

- Storage.setItem()
- Using the Web Storage API
