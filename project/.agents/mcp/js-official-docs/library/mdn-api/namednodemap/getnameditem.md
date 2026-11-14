---
title: "NamedNodeMap: getNamedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/getnameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: getNamedItem() method

The **`getNamedItem()`** method of the `NamedNodeMap` interface returns the `Attr` corresponding to the given name, or `null` if there is no corresponding attribute.

> **Note:**
> This method is also called when you use the operator `[]` syntax.
> So, `myMap[str]` is equivalent to `myMap.getNamedItem(str)` where `str` is a string.

## Syntax

```js
getNamedItem(name)
[name]
```

### Parameters

- `name`
    A string with the name of the desired attribute.

### Return value

An `Attr` corresponding to the `name` given in parameter, or `null` if none has been found.

## Example

```html
<pre test="test"></pre>
```

```js
const pre = document.querySelector("pre");
const attrMap = pre.attributes;
const value = attrMap.getNamedItem("test").value;
pre.textContent = `The 'test' attribute contains ${value}.
And 'foo' has ${attrMap["foo"] ? "been" : "not been"} found.`;
```
