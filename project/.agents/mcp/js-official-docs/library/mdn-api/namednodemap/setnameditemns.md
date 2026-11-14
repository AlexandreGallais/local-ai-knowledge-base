---
title: "NamedNodeMap: setNamedItemNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/setnameditemns/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: setNamedItemNS() method

The **`setNamedItemNS()`** method of the `NamedNodeMap` interface
puts the `Attr` identified by its name in the map.
If there was already an `Attr` with the same name in the map,
it is _replaced_.

> **Note:**
> This method is an alias of `setNamedItem()` you can use them
> interchangeably.

## Syntax

```js
setNamedItemNS(attr)
```

### Parameters

- `attr`
    The attribute to insert in the map.

### Return value

Returns the old attribute if replaced, or `null` if the attribute is new.

### Exceptions

- `InUseAttributeError` `DOMException`
    Thrown if the attribute is still part of another map.

## Example

```html
<span ob:one="one"></span>
<pre></pre>
```

```js
const parser = new DOMParser();
// ob:one in <span> is not in a namespace, while ob:one in <warning>, is.
const xmlString =
  '<warning ob:one="test" xmlns:ob="http://www.example.com/ob">Beware!</warning>';
const doc = parser.parseFromString(xmlString, "application/xml");

const span = document.querySelector("span");
const pre = document.querySelector("pre");
const warning = doc.querySelector("warning");
const attrMap = span.attributes;

let result = `The '<span>' element initially contains ${attrMap.length} attribute.\n\n`;

result += "We remove `one` from '<span>' and adds it to '<pre>'.\n";
const one = warning.attributes.removeNamedItemNS(
  "http://www.example.com/ob",
  "one",
);
attrMap.setNamedItemNS(one);
result += `The '<span>' element now contains ${span.attributes.length} attributes:\n\n`;
result += "Prefix\tLocal name\tQualified name\n";
result += "=========================================\n";

for (const attr of attrMap) {
  result += `${attr.prefix}\t${attr.localName}\t\t${attr.name}\n`;
}

pre.textContent = result;
```
