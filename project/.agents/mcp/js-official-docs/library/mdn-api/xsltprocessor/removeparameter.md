---
title: "XSLTProcessor: removeParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xsltprocessor/removeparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XSLTProcessor: removeParameter() method

The `removeParameter()` method of the `XSLTProcessor` interface removes the parameter (`<xsl:param>`) and its value from the stylesheet imported in the processor.

## Syntax

```js
removeParameter(namespaceURI, localName)
```

### Parameters

- `namespaceURI`
    The namespace associated with the parameter name. A "null" value is treated the same as the empty string (`""`).
- `localName`
    The name of the parameter in the associated namespace.

### Return value

None (`undefined`).

## Examples

### Using removeParameter()

First, the `showItems` parameter is set to `"yes"`, which allows the list items to be displayed in the output.

After that, the `showItems` parameter is removed using `removeParameter()`, and the transformation is performed again, resulting in no items being displayed.

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
  <xsl:param name="showItems" select="'yes'"/>
  <xsl:template match="/">
    <!-- If showItems is 'yes', display the list of items -->
    <xsl:if test="$showItems = 'yes'">
      <ul>
        <xsl:for-each select="items/item">
          <li><xsl:value-of select="."/></li>
        </xsl:for-each>
      </ul>
    </xsl:if>
    <!-- If showItems is 'no', display a message -->
    <xsl:if test="$showItems = 'no'">
      <div>No content to show</div>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");
const xsltDoc = parser.parseFromString(xsltString, "application/xml");

const xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xsltDoc);

// Set 'showItems' to 'no' and perform the first transformation
xsltProcessor.setParameter(null, "showItems", "no");
const resultContainer = document.getElementById("result");
let resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);
resultContainer.appendChild(resultFragment);

// Add a horizontal rule to separate the results
resultContainer.appendChild(document.createElement("hr"));

// Remove the 'showItems' parameter, reverting it to the default value ('yes')
xsltProcessor.removeParameter(null, "showItems");
resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);
resultContainer.appendChild(resultFragment);
```

#### Result

## See also

- `XSLTProcessor.getParameter()`
- `XSLTProcessor.setParameter()`
- `XSLTProcessor.clearParameters()`
- `XSLTProcessor.reset()`
