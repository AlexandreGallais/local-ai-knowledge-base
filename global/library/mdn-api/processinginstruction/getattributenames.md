---
title: "ProcessingInstruction: getAttributeNames() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/getattributenames/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: getAttributeNames() method

The **`getAttributeNames()`** method of the
`ProcessingInstruction` interface returns the attribute names of the processing instruction as an
`Array` of strings. If the processing instruction has no attributes it returns an empty
array.

## Syntax

```js
getAttributeNames()
```

### Parameters

None.

### Return value

An `Array` of strings.

## Description

Using `getAttributeNames()` along with
`getAttribute()` is a memory-efficient and
performant alternative to accessing `ProcessingInstruction.data`.

The names returned by **`getAttributeNames()`** are _qualified_ attribute names, meaning that attributes with a namespace prefix have their names returned with that namespace prefix (_not_ the actual namespace), followed by a colon, followed by the attribute name (for example, **`xlink:href`**). Any attributes without a namespace prefix have their names returned as-is (for example, **`href`**).

## Examples

### Basic usage

```js
const pi = document.createProcessingInstruction(
  "start",
  'name="placeholder" more="info"',
);

console.log(pi.getAttributeNames());
// logs:
// ['name', 'more']

// Iterate over processing instruction's attributes
for (const name of pi.getAttributeNames()) {
  const value = pi.getAttribute(name);
  console.log(name, value);
}
// logs:
// name placeholder
// more info
```

## See also

- `ProcessingInstruction.hasAttribute()`
- `ProcessingInstruction.hasAttributes()`
- `ProcessingInstruction.getAttribute()`
- `ProcessingInstruction.setAttribute()`
- `ProcessingInstruction.removeAttribute()`
- `ProcessingInstruction.toggleAttribute()`
