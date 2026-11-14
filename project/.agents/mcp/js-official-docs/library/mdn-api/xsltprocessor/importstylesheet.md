---
title: "XSLTProcessor: importStylesheet() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xsltprocessor/importstylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XSLTProcessor: importStylesheet() method

The `importStylesheet()` method of the `XSLTProcessor` interface imports an XSLT stylesheet for the processor.

## Syntax

```js
importStylesheet(style)
```

### Parameters

- `style`
    The `Node` to import. It can be an XML document (that is a `Document` with `doctype` whose `name` of `"xml"`) containing an XSLT stylesheet or a literal result element transform, or an `Element` representing an `<xsl:stylesheet>` or `<xsl:transform>`.

### Return value

None (`undefined`).

## Examples

### Using importStylesheet()

This example shows how `importStylesheet()` loads an XSLT stylesheet into an `XSLTProcessor` for use in transforming XML data.

#### HTML

```html
<div id="result"></div>
```

#### JavaScript

```js
const xmlString = `
<items>
  <item>Item 1</item>
  <item>Item 2</item>
</items>
`;

const xsltString = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <ul>
      <xsl:for-each select="items/item">
        <li><xsl:value-of select="."/></li>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");
const xsltDoc = parser.parseFromString(xsltString, "application/xml");

const xsltProcessor = new XSLTProcessor();

// Import the XSLT stylesheet into the XSLTProcessor
xsltProcessor.importStylesheet(xsltDoc);

// Perform the transformation from XML to HTML
const resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);

// Display the transformed result in the page
document.getElementById("result").appendChild(resultFragment);
```

#### Result
