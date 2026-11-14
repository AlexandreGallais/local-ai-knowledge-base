---
title: "Element: localName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/localname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: localName property

The **`Element.localName`** read-only property returns the
local part of the qualified name of an element.

## Value

A string representing the local part of the element's qualified name.

## Examples

(Must be served with XML content type, such as `text/xml` or
`application/xhtml+xml`.)

```xml
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:svg="http://www.w3.org/2000/svg">
<head>
  <script><![CDATA[
function test() {
  const text = document.getElementById("text");
  const circle = document.getElementById("circle");

  text.value = `<svg:circle> has:
localName = "${circle.localName}"
namespaceURI = "${circle.namespaceURI}"`;
}
  ]]></script>
</head>
<body onload="test()">
  <svg:svg version="1.1"
    width="100px" height="100px"
    viewBox="0 0 100 100">
    <svg:circle cx="50" cy="50" r="30" fill="#aaaaaa" id="circle"/>
  </svg:svg>
  <textarea id="text" rows="4" cols="55"/>
</body>
</html>
```

## Notes

The local name of a node is that part of the node's qualified name that comes after the
colon. Qualified names are typically used in XML as part of the namespace(s) of the
particular XML documents. For example, in the qualified name
`comm:partners`, `partners` is the local name and
`comm` is the prefix:

```xml
<comm:business id="soda_shop" type="brick_n_mortar" xmlns:comm="http://example.com/comm">
  <comm:partners>
    <comm:partner id="1001">Tony's Syrup Warehouse
    </comm:partner>
  </comm:partner>
</comm:business>
```

> **Note:**
> While the property returns the case of the internal DOM storage, which is lower case, note that `tagName` property returns upper case for HTML elements in HTML DOMs.

## See also

- `Element.tagName`
- `Element.namespaceURI`
- `Element.prefix`
- `Attr.localName`
