---
title: "ProcessingInstruction: hasAttributes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/hasattributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: hasAttributes() method

The **`hasAttributes()`** method of the `ProcessingInstruction`
interface returns a boolean value indicating whether the current element has any
attributes or not.

## Syntax

```js
hasAttributes()
```

### Parameters

None.

### Return value

A boolean.

## Examples

### Basic usage

```js
const pi = document.createProcessingInstruction("start", 'name="placeholder"');

const pi2 = document.createProcessingInstruction("start", "");

console.log(pi.hasAttributes());
console.log(pi2.hasAttributes());
// logs:
// true
// false
```

## See also

- `ProcessingInstruction.hasAttribute()`
- `ProcessingInstruction.getAttribute()`
- `ProcessingInstruction.getAttributeNames()`
- `ProcessingInstruction.setAttribute()`
- `ProcessingInstruction.removeAttribute()`
- `ProcessingInstruction.toggleAttribute()`
