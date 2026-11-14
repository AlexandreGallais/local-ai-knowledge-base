---
title: "ProcessingInstruction: getAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/getattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: getAttribute() method

The **`getAttribute()`** method of the
`ProcessingInstruction` interface returns the value of a specified attribute on the
processing instruction.

If the given attribute does not exist, the value returned will be `null`.

## Syntax

```js
getAttribute(attributeName)
```

### Parameters

- `attributeName`
    The name of the attribute whose value you want to get.

### Return value

A string containing the value of `attributeName` if the attribute exists; otherwise `null`.

## Description

### Casing

Processing instruction arguments are case-sensitive.

### Decoded character references in attribute values

HTML character references in an attribute's source markup (for example, `<`, `&`, or `&#x3C;`) are decoded by the HTML parser when the document is parsed, so `getAttribute()` returns the decoded value, not the source.

For example:

```js
const pi = document.createProcessingInstruction(
  "start",
  'data-payload="&lt;b&gt;hi&lt;/b&gt;"',
);

pi.getAttribute("data-payload");
// <b>hi</b>
```

## Examples

### Basic usage

```js
const pi = document.createProcessingInstruction("start", 'name="placeholder"');

console.log(pi.getAttribute("name"));
// Logs:
// "placeholder"
```

## See also

- `ProcessingInstruction.hasAttribute()`
- `ProcessingInstruction.hasAttributes()`
- `ProcessingInstruction.getAttributeNames()`
- `ProcessingInstruction.setAttribute()`
- `ProcessingInstruction.removeAttribute()`
- `ProcessingInstruction.toggleAttribute()`
