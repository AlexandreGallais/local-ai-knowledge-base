---
title: "Document: createProcessingInstruction() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createprocessinginstruction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createProcessingInstruction() method

The **`createProcessingInstruction()`** method of the `Document` interface creates a new `ProcessingInstruction` object and returns it.

## Syntax

```js
createProcessingInstruction(target, data)
```

### Parameters

- `target`
    A string containing the first part of the processing instruction (i.e., `<?target … ?>`)
- `data`
    A string containing any information the processing instruction should carry, after the target. The data can contain any character pattern, except that it can't contain `?>`, since that closes the processing instruction.

### Return value

- A `ProcessingInstruction` node.

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if either of the following are true:
    - The `target` value is not a valid XML name; for example, it starts with a number, hyphen, or period, or contains characters other than alphanumeric characters, underscores, hyphens, or periods.
    - The _closing processing instruction sequence_ (`?>`) is included as part of the `data` value.

## Description

The `createProcessingInstruction()` method creates a new processing instruction. The new node will usually be inserted into a document to accomplish a task with it, using a method such as `node.insertBefore`.

Initially, `ProcessingInstruction` nodes were only supported in XML documents, not in HTML documents. In non-supporting browsers, a processing instruction will be interpreted as a comment and represented as a `Comment` object in the DOM tree.

## Examples

### Basic usage

This example creates an `<xml-stylesheet>` processing instruction and adds it to the top of an example XML document.

```js
const doc = new DOMParser().parseFromString("<foo />", "application/xml");
const pi = doc.createProcessingInstruction(
  "xml-stylesheet",
  'href="mycss.css"',
);

doc.insertBefore(pi, doc.firstChild);

console.log(new XMLSerializer().serializeToString(doc));
// Displays: <?xml-stylesheet href="mycss.css" type="text/css"?><foo/>
```
