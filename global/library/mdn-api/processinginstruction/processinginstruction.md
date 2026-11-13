---
title: "ProcessingInstruction: ProcessingInstruction() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/processinginstruction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: ProcessingInstruction() constructor

The **`ProcessingInstruction()`** constructor creates a new `ProcessingInstruction` object instance.

## Syntax

```js
new ProcessingInstruction(target, data)
```

### Parameters

- `target`
    A string representing the type of event.
- `data`
    A string containing any information the processing instruction should carry, after the target. The data is up to you, but it can't contain `?>`, since that closes the processing instruction.

### Return value

Processing instructions are, as the name suggests, are instructions about how to process the document. They can include stylesheets for XML documents, placeholders for HTML documents, or other processing instructions.

A new `ProcessingInstruction` object, if used internally by the browser.

Developers cannot use the `ProcessingInstruction()` constructor directly to create a new `ProcessingInstruction` instance, and must use the `document.createProcessingInstruction()` method instead. Attempting to use the `ProcessingInstruction()` constructor directly results in an "illegal constructor" error.

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if either of the following are true:
    - The `target` value is not a valid XML name; for example, it starts with a number, hyphen, or period, or contains characters other than alphanumeric characters, underscores, hyphens, or periods.
    - The _closing processing instruction sequence_ (`?>`) is part of the `data` value.

- `TypeError`
    Thrown with the message `"Illegal constructor"` when used directly.

## Examples

```js
const doc = new DOMParser().parseFromString("<foo />", "application/xml");
const pi = doc.createProcessingInstruction(
  "xml-stylesheet",
  'href="mycss.css"',
);
```

## See also

- document.createProcessingInstruction()
- The DOM API
