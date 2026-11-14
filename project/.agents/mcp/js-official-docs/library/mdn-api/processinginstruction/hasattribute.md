---
title: "ProcessingInstruction: hasAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/hasattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: hasAttribute() method

The **`hasAttribute()`** method of the `ProcessingInstruction` interface returns a
boolean value indicating whether the specified element has the
specified attribute or not.

## Syntax

```js
hasAttribute(name)
```

### Parameters

- `name`
    A string representing the name of the attribute.

### Return value

A boolean.

## Examples

### Basic usage

```js
const pi = document.createProcessingInstruction("start", 'name="placeholder"');

console.log(pi.hasAttribute("name"));
// logs:
// true
```

## See also

- `ProcessingInstruction.hasAttributes()`
- `ProcessingInstruction.getAttribute()`
- `ProcessingInstruction.getAttributeNames()`
- `ProcessingInstruction.setAttribute()`
- `ProcessingInstruction.removeAttribute()`
- `ProcessingInstruction.toggleAttribute()`
