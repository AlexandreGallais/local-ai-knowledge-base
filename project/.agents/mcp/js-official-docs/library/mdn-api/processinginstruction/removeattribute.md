---
title: "ProcessingInstruction: removeAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/removeattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: removeAttribute() method

The **`removeAttribute()`** method of the `ProcessingInstruction` removes the attribute with the specified name from the processing instruction.

## Syntax

```js
removeAttribute(attrName)
```

### Parameters

- `attrName`
    A string specifying the name of the attribute to remove from the
    processing instruction. If the specified attribute does not exist, `removeAttribute()`
    returns without generating an error.

### Return value

None (`undefined`).

## Usage notes

You should use `removeAttribute()` instead of setting the attribute value to `null` (either directly or using `setAttribute()`).
Many attributes will not behave as expected if you set them to `null`.

## Examples

### Basic usage

```js
const pi = document.createProcessingInstruction("start", 'name="placeholder"');

pi.removeAttribute("name");
console.log(pi);
// logs:
// <?start?>
```

## See also

- `ProcessingInstruction.hasAttribute()`
- `ProcessingInstruction.hasAttributes()`
- `ProcessingInstruction.getAttribute()`
- `ProcessingInstruction.getAttributeNames()`
- `ProcessingInstruction.setAttribute()`
- `ProcessingInstruction.toggleAttribute()`
