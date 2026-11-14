---
title: "Document: createElement() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createElement() method

The **`createElement()`** method of the `Document` interface creates a new `HTMLElement` that has the specified `localName`.

If `localName` isn't recognized, the method creates an `HTMLUnknownElement`.

## Syntax

```js
createElement(localName)
createElement(localName, options)
```

### Parameters

- `localName`
    A string that specifies the type of element to be created.
    Don't use qualified names (like "html:a") with this method.
    When called on an HTML document, `createElement()` converts `localName` to lowercase before creating the element.
    In Firefox, Opera, and Chrome, `createElement(null)` works like `createElement("null")`.
- `options` (optional)
    An object with the following optional properties (note that only one of `is` and `customElementRegistry` may be set):
    - `is` (optional)
        A string defining the tag name for a custom element previously defined using `customElements.define()`.
        The new element will be given an `is` attribute whose value is the custom element's tag name.
        See Web component example for more details.
    - `customElementRegistry` (optional)
        A `CustomElementRegistry` that sets the Scoped custom element registry of a custom element.

### Return value

The new `Element`.

> **Note:**
> A new `HTMLElement` is returned if the document is an `HTMLDocument`, which is the most common case.
> Otherwise a new `Element` is returned.

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if the `localName` value is not a valid element name.
    A string is a valid element name if its length is at least 1 and:
    - it starts with an alphabet character and does not contain ASCII whitespace, `NULL`, `/`, or `>` (U+0000, U+002F, or U+003E, respectively).
    - it starts with `:` (U+003A), `_` (U+005F), or any characters in the range U+0080 to U+10FFFF (inclusive), _and_ the remaining code points only include those same characters along with the ASCII alphanumeric characters, `-` (U+002D), and `.` (U+002E),

    > **Note:**
    > Earlier versions of the specification were more restrictive, requiring that the `localName` be a valid XML name.

- `NotSupportedError` `DOMException`
    Thrown if both the `is` and `customElementRegistry` options are specified.

## Examples

### Basic <example-value>

This creates a new `` and inserts it before the element with the ID `div1`.

#### HTML

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Working with elements</title>
  </head>
  <body>
    <div id="div1">The text above has been created dynamically.</div>
  </body>
</html>
```

#### JavaScript

```js
function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

addElement();
```

#### Result

### Web component example

> **Note:**
> Check the browser compatibility section for support, and the `is` attribute reference for caveats on implementation reality of customized built-in elements.

The following example snippet is taken from our expanding-list-web-component example (see it live also). In this case, our custom element extends the `HTMLUListElement`, which represents the `` element.

```js
// Create a class for the element
class ExpandingList extends HTMLUListElement {
  constructor() {
    // Always call super first in constructor
    super();

    // constructor definition left out for brevity
    // …
  }
}

// Define the new element
customElements.define("expanding-list", ExpandingList, { extends: "ul" });
```

If we wanted to create an instance of this element programmatically, we'd use a call along the following lines:

```js
let expandingList = document.createElement("ul", { is: "expanding-list" });
```

The new element will be given an `is` attribute whose value is the custom element's tag name.

> **Note:**
> For backwards compatibility, some browsers will allow you to pass a string here instead of an object, where the string's value is the custom element's tag name.

## See also

- `Node.removeChild()`
- `Node.replaceChild()`
- `Node.appendChild()`
- `Node.insertBefore()`
- `Node.hasChildNodes()`
- `document.createElementNS()` — to explicitly specify the namespace URI for the element.
