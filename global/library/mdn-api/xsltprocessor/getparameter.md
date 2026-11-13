---
title: "XSLTProcessor: getParameter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xsltprocessor/getparameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XSLTProcessor: getParameter() method

The `getParameter()` method of the `XSLTProcessor` interface returns the value of a parameter (`<xsl:param>`) from the stylesheet imported in the processor.

## Syntax

```js
getParameter(namespaceURI, localName)
```

### Parameters

- `namespaceURI`
    The namespace associated with the parameter name. A "null" value is treated the same as the empty string (`""`).
- `localName`
    The name of the parameter in the associated namespace.

### Return value

An object that is the value associated with the parameter. It can be of any type.

> **Note:**
> Firefox supports any kind of parameter. Chrome, Edge and Safari only support string parameters.

## Examples

### Using getParameter()

This example shows how to use `getParameter()` to check the value of a parameter that controls the behavior of an XSLT transformation.

```js
const xsltProcessor = new XSLTProcessor();
xsltProcessor.setParameter(null, "foo", "bar");
console.log(xsltProcessor.getParameter(null, "foo")); // "bar"
```

## See also

- `XSLTProcessor.setParameter()`
- `XSLTProcessor.removeParameter()`
- `XSLTProcessor.clearParameters()`
- `XSLTProcessor.reset()`
