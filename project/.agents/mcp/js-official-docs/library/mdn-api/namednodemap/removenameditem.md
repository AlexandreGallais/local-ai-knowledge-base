---
title: "NamedNodeMap: removeNamedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/removenameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: removeNamedItem() method

The **`removeNamedItem()`** method of the `NamedNodeMap` interface
removes the `Attr` corresponding to the given name from the map.

## Syntax

```js
removeNamedItem(attrName)
```

### Parameters

- `attrName`
    The name of the attribute to remove from the map.

### Return value

The removed `Attr`.

### Exceptions

- `NotFoundError` `DOMException`
    Thrown if there is no attribute with the given name.

## Example

```html
<pre test="testValue"></pre>
```

```js
const pre = document.querySelector("pre");
const attrMap = pre.attributes;

let result = `The 'test' attribute initially contains '${attrMap["test"].value}'.\n`;

result += "We remove it.\n\n";
attrMap.removeNamedItem("test");

result += attrMap.getNamedItem("test")
  ? "And 'test' still exists."
  : "And 'test' is no more to be found.";

pre.textContent = result;
```
