---
title: "XSLTProcessor: transformToFragment() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xsltprocessor/transformtofragment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XSLTProcessor: transformToFragment() method

The `transformToFragment()` method of the `XSLTProcessor` interface transforms a provided `Node` source to a `DocumentFragment` using the XSLT stylesheet associated with the `XSLTProcessor`.

## Syntax

```js
transformToFragment(source, document)
```

### Parameters

- `source`
    The `Node` source to apply the XSLT stylesheet to.
- `document`
    The `Document` the document fragment will be associated with. (Any document fragment is associated with a document it can be added to).

### Return value

A `DocumentFragment`.

## Examples

### Using transformToFragment()

This example demonstrates how to use `transformToFragment()` to transform XML data into HTML, which can then be directly inserted into the DOM as a document fragment.

#### HTML

```html
<div id="result"></div>
```

#### JavaScript

```js
const xmlString = `
<books>
  <book>
    <title>Book 1</title>
    <author>Author 1</author>
  </book>
  <book>
    <title>Book 2</title>
    <author>Author 2</author>
  </book>
</books>
`;

const xsltString = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <ul>
      <xsl:for-each select="books/book">
        <li>
          <strong><xsl:value-of select="title"/></strong>
          by <em><xsl:value-of select="author"/></em>
        </li>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");
const xsltDoc = parser.parseFromString(xsltString, "application/xml");

const xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xsltDoc);

// Perform the transformation, returning the result as a document fragment
const resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);

// Insert the result into the page
document.getElementById("result").appendChild(resultFragment);
```

#### Result

## See also

- `XSLTProcessor.transformToDocument()`
