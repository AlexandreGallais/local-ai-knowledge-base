---
title: "NamedNodeMap: removeNamedItemNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/removenameditemns/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: removeNamedItemNS() method

The **`removeNamedItemNS()`** method of the `NamedNodeMap` interface
removes the `Attr` corresponding to the given namespace and local name from the map.

## Syntax

```js
removeNamedItemNS(namespace, localName)
```

### Parameters

- `namespace`
    The namespace of the attribute to remove from the map
    > **Warning:**
    > `namespace` is the URI of the namespace, not the prefix.

- `localName`
    The local name of the attribute to remove from the map.

### Return value

The removed `Attr`.

### Exceptions

- `NotFoundError` `DOMException`
    Thrown if there is no attribute with the given namespace and local name.

## Example

```html
<pre></pre>
```

```js
const parser = new DOMParser();
const xmlString =
  '<warning ob:one="test" xmlns:ob="http://www.example.com/ob">Beware!</warning>';
const doc = parser.parseFromString(xmlString, "application/xml");

const pre = document.querySelector("pre");
const warning = doc.querySelector("warning");
const attrMap = warning.attributes;

let result = `The 'ob:one' attribute initially contains '${attrMap["ob:one"].value}'.\n`;

result += "We remove it.\n\n";
attrMap.removeNamedItemNS("http://www.example.com/ob", "one");

result += attrMap["ob:one"]
  ? "And 'ob:one' still exists."
  : "And 'ob:one' is no more to be found.";

pre.textContent = result;
```
