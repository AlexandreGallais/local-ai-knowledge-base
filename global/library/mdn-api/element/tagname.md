---
title: "Element: tagName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/tagname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: tagName property

The **`tagName`** read-only property
of the `Element` interface returns the tag name of the element on which
it's called.

For example, if the element is an ``, its
`tagName` property is `IMG` (for HTML documents; it may be cased
differently for XML/XHTML documents). Note: You can use the `localName` property
to access the Element's local name — which for the case in the example is `img` (lowercase).

## Value

A string indicating the element's tag name. This string's capitalization depends on the
document type:

- For DOM trees which represent HTML documents, the returned tag name is always in the
  canonical upper-case form. For example, `tagName` called on a
  `` element returns `"DIV"`.
- The tag names of elements in an XML DOM tree are returned in the same case in which
  they're written in the original XML file. If an XML document includes a tag
  `"<SomeTag>"`, then the `tagName` property's value is
  `"SomeTag"`.

For `Element` objects, the value of `tagName` is the same as
the value of the `nodeName` property the element object
inherits from `Node`.

## Examples

### HTML

```html
<span id="born">When I was born…</span>
```

### JavaScript

```js
const span = document.getElementById("born");
console.log(span.tagName);
```

In XHTML (or any other XML format), the original case will be maintained, so
`"span"` would be output in case the original tag name was created lowercase.
In HTML, `"SPAN"` would be output instead regardless of the case used while
creating the original document.

## See also

- `Element.localName`
