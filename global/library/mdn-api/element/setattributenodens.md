---
title: "Element: setAttributeNodeNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/setattributenodens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: setAttributeNodeNS() method

The **`setAttributeNodeNS()`** method of the `Element` interface adds a new namespaced `Attr` node to an element.

If you don't need to work with the attribute node (such as cloning from another element) before adding it, you can use the `setAttributeNS()` method instead.

If you are working with HTML documents and you don't need to specify the requested attribute as being part of a specific namespace, use the `setAttribute()` method instead.

## Syntax

```js
setAttributeNodeNS(attributeNode)
```

### Parameters

- `attributeNode`
    The `Attr` node to add to the element.

### Return value

The replaced attribute node, if any, returned by this function.

## Examples

```js
// <div id="one" xmlns:myNS="http://www.mozilla.org/ns/specialspace"
//            myNS:special-align="utterleft">one</div>
// <div id="two">two</div>

const myns = "http://www.mozilla.org/ns/specialspace";
const d1 = document.getElementById("one");
const d2 = document.getElementById("two");
const a = d1.getAttributeNodeNS(myns, "special-align");
d2.setAttributeNodeNS(a.cloneNode(true));
alert(d2.attributes[1].value); // returns: `utterleft'
```

## Notes

If the specified attribute already exists on the element, then that attribute is replaced with the new one and the replaced one is returned.

Note that if you try to set without cloning the node, you may see `NS_ERROR_DOM_INUSE_ATTRIBUTE_ERR` "Attribute already in use" error, as the DOM requires cloning for `Attr` to be reused (unlike other Nodes which can be moved).

## See also

- `Document.createAttribute()`
- `Document.createAttributeNS()`
- `Element.getAttributeNodeNS()`
