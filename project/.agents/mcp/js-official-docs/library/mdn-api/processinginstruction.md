---
title: "ProcessingInstruction"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction

The **`ProcessingInstruction`** interface represents a processing instruction — a `Node` that embeds an instruction targeting a specific application, which can be ignored by any application that doesn't recognize the instruction.

## Constructor

- `ProcessingInstruction.ProcessingInstruction()`
    Creates a new ProcessingInstruction object instance.

    Developers cannot use the `ProcessingInstruction()` constructor directly to create a new `ProcessingInstruction` instance; doing so results in an "illegal constructor" error. Instead, use the `document.createProcessingInstruction()` method.

## Instance properties

_This interface also inherits properties from its parent interfaces, `CharacterData`, `Node`, and `EventTarget`._

- `ProcessingInstruction.sheet` (read-only)
    Returns the associated `StyleSheet` object, if any; or `null` if none.

- `ProcessingInstruction.target` (read-only)
    A name identifying the application to which the instruction is targeted.

## Instance methods

_This interface also inherits methods from its parent interfaces, `CharacterData`, `Node`, and `EventTarget`._

- `ProcessingInstruction.getAttribute()` (experimental)
    Retrieves the value of the named attribute from the current node and returns it as a string.
- `ProcessingInstruction.getAttributeNames()` (experimental)
    Returns an array of attribute names from the current node.
- `ProcessingInstruction.hasAttribute()` (experimental)
    Returns a boolean value indicating if the element has the specified attribute or not.
- `ProcessingInstruction.hasAttributes()` (experimental)
    Returns a boolean value indicating if the element has one or more HTML attributes present.
- `ProcessingInstruction.removeAttribute()` (experimental)
    Removes the named attribute from the current node.
- `ProcessingInstruction.setAttribute()` (experimental)
    Sets the named attribute of the current node to a new value.
- `ProcessingInstruction.toggleAttribute()` (experimental)
    Toggles a boolean attribute, removing it if it is present and adding it if it is not present, on the specified element.

These methods provide easier access to the `data` string attributes.

## Description

Processing instructions, as the name suggests, specify how to process a document. They can include stylesheets for XML documents, placeholders for HTML documents, or other processing instructions.

Processing instructions are `Nodes` rather than `Elements`. They don't have children or cause nesting (as demonstrated in our Patching example, and therefore don't change the shape of the Document Object Model (DOM).

Initially, `ProcessingInstruction` nodes were only supported in XML documents, not HTML documents. In non-supporting browsers, processing instructions will be interpreted as comments and represented as `Comment` objects in the DOM tree.

When written in documents directly, rather than created by `document.createProcessingInstruction()`, they begin and end with `<?` and `?>` delimiters, and contain a `target` and optional `data` attributes. For example:

```xml
<?my-target name="my-name"?>
```

When written in HTML, processing instructions can be provided with or without the trailing `?`, and the browser will add it if not supplied when parsing the DOM. Both `<?my-target?>` and `<?my-target>` are therefore valid. XML is stricter and requires the trailing `?`.

HTML also has more restrictions on the `target` name in the HTML parser for backwards compatibility. Effectively, it must match `A-Za-z_*` or it is processed as a comment.

Although the syntax is identical to that of processing instructions, the XML declaration (`<?xml version="1.0"?>`) is not considered to be a processing instruction and is not added to the DOM.

User-defined processing instructions cannot begin with `"xml"`, as `xml`-prefixed processing-instruction target names are reserved by the XML specification for particular, standard uses (for example, `<?xml-stylesheet ?>`).

For backwards compatibility, if the target is `xml` or `xml-stylesheet`, the processing instruction is parsed as a comment in an HTML document. This applies whether it is included in the original HTML or inserted using a method such as `Element.innerHTML`.

## Examples

### Basic usage

This example shows a processing instruction with a `target` of `display` and `data` of `table-view`.

```xml
<?display table-view?>
```

### Reserved XML target example

```xml
<?xml-stylesheet href="styles.css"?>
```

This example shows a processing instruction with a target of `xml-stylesheet` and `data` of `href="styles.css"`.

### Usage with `<template for>` patching

This example uses the `<?start>` and `<?end>` processing instructions as placeholders and later on fills in the contents using `<template for>`. Both exclude the optional trailing `?`.

```html
<body>
  <div>
    <?start name="placeholder">
    Loading...
    <?end>
  </div>
  ...
  <template for="placeholder">
    Lorem Ipsum...
  </template>
  ...
</body>
```

This example also demonstrates the lack of processing instruction children and nesting. The `<?start>` and `<?end>` processing instructions, although linked in terms of `<template for>`, are not linked in terms of the DOM and do not cause the `Loading...` content in between to be a child (as demonstrated by the lack of indentation).

### Using methods as opposed to the `data` attribute

This example creates a processing instruction using the `createProcessingInstruction()` method. It then logs the processing instruction's data (accessed via its `CharacterData.data` property) and then its two attributes individually (accessed via its `ProcessingInstruction.getAttribute()` method).

```js
const pi = document.createProcessingInstruction(
  "my-target",
  "my-data1='value1' my-data2='value2'",
);

console.log(pi.data);
console.log(pi.getAttribute("my-data1"));
console.log(pi.getAttribute("my-data2"));
// logs
// my-data1='value1' my-data2='value2'
// value1
// value2
```

## See also

- document.createProcessingInstruction()
- The DOM API
