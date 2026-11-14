---
title: "Document: createCDATASection() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createcdatasection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createCDATASection() method

**`createCDATASection()`** creates a new CDATA section node,
and returns it.

## Syntax

```js
createCDATASection(data)
```

### Parameters

- `data`
    A string containing the data to be added to the CDATA Section.

### Return value

A CDATA Section node.

## Examples

```js
const doc = new DOMParser().parseFromString("<xml></xml>", "application/xml");
const cdata = doc.createCDATASection("Some <CDATA> data & then some");
doc.querySelector("xml").appendChild(cdata);
console.log(new XMLSerializer().serializeToString(doc));
// Displays: <xml><![CDATA[Some <CDATA> data & then some]]></xml>
```

## Notes

- This will only work with XML, not HTML documents (as HTML documents do not support
  CDATA sections); attempting it on an HTML document will throw
  `NOT_SUPPORTED_ERR`.
- Will throw a `NS_ERROR_DOM_INVALID_CHARACTER_ERR` exception if one tries
  to submit the closing CDATA sequence (`]]>`) as part of the data, so
  unescaped user-provided data cannot be safely used without this method getting this
  exception (`createTextNode()` can often be used
  in its place).
