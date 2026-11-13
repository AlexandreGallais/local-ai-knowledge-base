---
title: "XSLTProcessor: setParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xsltprocessor/setparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XSLTProcessor: setParameter() method

The `setParameter()` method of the `XSLTProcessor` interface sets the value of a parameter (`<xsl:param>`) in the stylesheet imported in the processor.

## Syntax

```js
setParameter(namespaceURI, localName, value)
```

### Parameters

- `namespaceURI`
    The namespace associated with the parameter name. A "null" value is treated the same as the empty string (`""`).
- `localName`
    The name of the parameter in the associated namespace.
- `value`
    The value of the parameter.
    > **Note:**
    > Firefox supports any kind of parameter. Chrome, Edge and Safari only support string parameters.

### Return value

None (`undefined`).

## Examples

### Using setParameter()

This example demonstrates how to pass <example-value> from JavaScript to an XSLT stylesheet using `setParameter()`, allowing for dynamic modification of the transformation output based on these parameters.

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
  <item>Item 3</item>
</items>
`;

const xsltString = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="showItems" select="'yes'"/>
  <xsl:param name="highlightColor" select="'yellow'"/>
  <xsl:template match="/">
    <ul>
      <xsl:if test="$showItems = 'yes'">
        <xsl:for-each select="items/item">
          <li style="background-color: {$highlightColor};">
            <xsl:value-of select="."/>
          </li>
        </xsl:for-each>
      </xsl:if>
    </ul>
  </xsl:template>
</xsl:stylesheet>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");
const xsltDoc = parser.parseFromString(xsltString, "application/xml");

const xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xsltDoc);

xsltProcessor.setParameter(null, "showItems", "yes");
xsltProcessor.setParameter(null, "highlightColor", "lightblue");

// Perform the transformation from XML to HTML
const resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);

// Display the transformed result in the page
document.getElementById("result").appendChild(resultFragment);
```

#### Result

## See also

- `XSLTProcessor.getParameter()`
- `XSLTProcessor.removeParameter()`
- `XSLTProcessor.clearParameters()`
- `XSLTProcessor.reset()`
