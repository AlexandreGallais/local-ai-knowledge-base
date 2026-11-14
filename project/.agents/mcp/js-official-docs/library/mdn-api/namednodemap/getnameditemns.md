---
title: "NamedNodeMap: getNamedItemNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/getnameditemns/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: getNamedItemNS() method

The **`getNamedItemNS()`** method of the `NamedNodeMap` interface returns the `Attr` corresponding to the given local name in the given namespace, or `null` if there is no corresponding attribute.

## Syntax

```js
getNamedItemNS(namespace, localName)
```

### Parameters

- `namespace`
    A string with the namespace URI of the desired attribute.
    > **Warning:**
    > `namespace` is the URI of the namespace, not the prefix.
- `localName`
    A string with the localName of the desired attribute.

### Return value

An `Attr` corresponding to the namespace and local name given in parameters, or `null` if none has been found.

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

const value = warning.attributes.getNamedItemNS(
  "http://www.example.com/ob",
  "one",
).value;

pre.textContent = `The 'ob:one' attribute contains: ${value}.`;
```
