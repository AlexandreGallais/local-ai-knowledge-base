---
title: "ProcessingInstruction: setAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/setattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: setAttribute() method

The **`setAttribute()`** method of the `ProcessingInstruction` interface sets the value of an attribute on the processing instruction.
If the attribute already exists, the value is updated; otherwise, a new attribute is added with the specified name and value.

## Syntax

```js
setAttribute(qualifiedName, value)
```

### Parameters

- `qualifiedName`
    A string containing the qualified name of the attribute whose value is to be set.

    The format of the qualified name is `prefix:localName` or `localName`, where the parts are defined as:
    - `prefix` (optional)
        A "short alias" for the namespace, as returned by the `Attr.prefix` property.
    - `localName`
        The local name of the attribute, as returned by the `Attr.localName` property.

- `value`
    A string containing the value to assign to the attribute.

    Specified non-string values are automatically converted into strings.

    For boolean attributes, you should, by convention, set `value` to the empty string (`""`) or the attribute's name, with no leading or trailing whitespace.

### Return value

None (`undefined`).

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if either the `prefix` or `localName` is not valid:
    - The `prefix` must have at least one character, and cannot contain ASCII whitespace, `NULL`, `/`, or `>` (U+0000, U+002F, or U+003E, respectively).
    - The `localName` must have at least one character, and may not contain ASCII whitespace, `NULL`, `/`, `=` or `>` (U+0000, U+002F, U+003D, or U+003E, respectively).

## Description

**`setAttribute()`** sets the value of an attribute on the specified processing instruction.
If the attribute already exists, the value is updated; otherwise, a new attribute is added with the specified name and value.

To set the value of a Boolean attribute, such as `disabled`, you can specify any value.
It doesn't matter what value you use; if the attribute is present, its value is considered to be `true`.
By convention, we enable boolean attributes by setting their value to either the name of the attribute or the empty string (`""`).
The absence of a boolean attribute means its value is `false`; you must call `ProcessingInstruction.removeAttribute()` to "undo" the effect of enabling a boolean attribute.

To get the current value of an attribute, use `getAttribute()`; to remove an attribute, call `removeAttribute()`.

## Examples

### Basic usage

```js
const pi = document.createProcessingInstruction("start", 'name="placeholder"');

pi.setAttribute("name", "new text");
console.log(pi);
// logs:
// <?start name="new text"?>
```

## See also

- `ProcessingInstruction.hasAttribute()`
- `ProcessingInstruction.hasAttributes()`
- `ProcessingInstruction.getAttribute()`
- `ProcessingInstruction.getAttributeNames()`
- `ProcessingInstruction.removeAttribute()`
- `ProcessingInstruction.toggleAttribute()`
