---
title: "NamedNodeMap: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: item() method

The **`item()`** method of the `NamedNodeMap` interface
returns the item in the map matching the index.

> **Note:**
> This method is also called when you use the operator `[]` syntax.
> So, `myMap[i]` is equivalent to `myMap.item(i)` where `i` is a number.

## Syntax

```js
item(index)
[index]
```

### Parameters

- `index`
    A number representing the index of the item you want to return.

### Return value

An `Attr` or `null` if the number is greater than or equal to the `length` of
the map.

## Example

```html
<pre class="foo" id="bar" contenteditable></pre>
```

```js
const pre = document.querySelector("pre");
const attrMap = pre.attributes;

pre.textContent = `The attribute map contains:
0: ${attrMap.item(0).name}
1: ${attrMap[1].name}
2: ${attrMap.item(2).name}`;
```
