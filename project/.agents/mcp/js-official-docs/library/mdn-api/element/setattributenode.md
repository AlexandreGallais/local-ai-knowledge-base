---
title: "Element: setAttributeNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/setattributenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: setAttributeNode() method

The **`setAttributeNode()`** method of the `Element` interface adds a new `Attr` node to the specified element.

If you don't need to work with the attribute node (such as cloning from another element) before adding it, you can use the `setAttribute()` method instead.

## Syntax

```js
setAttributeNode(attribute)
```

### Parameters

- `attribute`
    The `Attr` node to add to the element.

### Return value

The replaced attribute node, if any, returned by this function.

## Examples

This example copies the `lang` attribute from one element to another.

### HTML

```html
<div id="one" lang="en-US">one</div>
<div id="two">two</div>
```

### JavaScript

```js
const d1 = document.getElementById("one");
const d2 = document.getElementById("two");
const a = d1.getAttributeNode("lang");

d2.setAttributeNode(a.cloneNode(true));

// Returns: 'en-US'
console.log(d2.attributes[1].value);
```

## Notes

If the attribute named already exists on the element, that attribute is replaced with
the new one and the replaced one is returned.

## See also

- `Document.createAttribute()`
- `Element.getAttributeNode()`
- `Element.removeAttributeNode()`
