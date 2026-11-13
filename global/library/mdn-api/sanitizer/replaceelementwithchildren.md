---
title: "Sanitizer: replaceElementWithChildren() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/replaceelementwithchildren/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: replaceElementWithChildren() method

The **`replaceElementWithChildren()`** method of the `Sanitizer` interface sets an element to be replaced by its child HTML elements when the sanitizer is used.
This is primarily used for stripping styles from text.

## Syntax

```js
replaceElementWithChildren(element)
```

### Parameters

- `element`
    A string indicating the name of the element to be replaced, or an object with the following properties:
    - `name`
        A string containing the name of the element.
    - `namespace` (optional)
        A string containing the namespace of the element.
        The default namespace is `"http://www.w3.org/1999/xhtml"`.

### Return value

A boolean value: `true` if the operation updated the `Sanitizer` configuration to replace the element with its children, and `false` otherwise.

The method returns `false` if the sanitizer is already configured to replace the given element, or if the resolved element is not allowed.

## Description

The **`replaceElementWithChildren()`** method specifies an element that will be replaced by its child elements and/or text nodes when the sanitizer is used.
This is primarily used for stripping styles from text.

### Disallowed replacement elements

The following elements are not allowed as replacement elements:

- `<html>` in the HTML namespace (`http://www.w3.org/1999/xhtml`).
- `` in the SVG namespace (`http://www.w3.org/2000/svg`).
-  in the MathML namespace (`http://www.w3.org/1998/Math/MathML`).

All the following method calls return `false` because the `Sanitizer` can't be updated for these elements:

```js
const sanitizer = new Sanitizer();

sanitizer.replaceElementWithChildren("html");
sanitizer.replaceElementWithChildren({ name: "html" });
sanitizer.replaceElementWithChildren({
  name: "html",
  namespace: "http://www.w3.org/1999/xhtml",
});
sanitizer.replaceElementWithChildren({
  name: "svg",
  namespace: "http://www.w3.org/2000/svg",
});
sanitizer.replaceElementWithChildren({
  name: "math",
  namespace: "http://www.w3.org/1998/Math/MathML",
});
```

## Examples

### Basic usage

This example shows the basic usage of the method, configuring a `Sanitizer` that replaces the `` element in inputs with its child content.

```js
// Create sanitizer (in this case the default)
const sanitizer = new Sanitizer();

// Replace <em> elements with their innerHTML
sanitizer.replaceElementWithChildren("em");
```

### How to strip styles from text

This example shows how `replaceElementWithChildren()` can be used to strip styles from text.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 480px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent += text;
}
```

#### JavaScript

The code first creates a new `Sanitizer` object that initially allows ``, ``, and `` elements.
We then call `replaceElementWithChildren()` on the sanitizer specifying that `` elements should be replaced.

The code defines a string that has `` elements and uses `Element.setHTML()` with the sanitizer to inject the string.
The original string, the sanitized HTML from the element, and the sanitizer are logged.

```js
if ("Sanitizer" in window) {
```

```js
// Create sanitizer using SanitizerConfig
const sanitizer = new Sanitizer({
  elements: ["p", "em", "strong"],
});

// Replace the <strong> element
sanitizer.replaceElementWithChildren("strong");

const unsanitizedString = `<p>This is a with <strong>important</strong> text <em>highlighted</em>.</p>`;
log(`unsanitizedHTMLString:\n ${unsanitizedString}`);

// Create a <div> element
const divElement = document.createElement("div");

divElement.setHTML(unsanitizedString, { sanitizer });
log(`\n\nsanitizedHTML:\n ${divElement.innerHTML}`);

// Log the sanitizer configuration
const sanitizerConfig = sanitizer.get();
log(`\n\nsanitizerConfig:\n ${JSON.stringify(sanitizerConfig, null, 2)}`);
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

#### Results

The original unsanitized HTML string, the sanitized string from the element, and the sanitizer are logged below.
Note that the `` styling is stripped from the text, but the `` element is not.
Note also that the `` element was originally in the `elements` list in the configuration, but was removed when it was added to the `replaceWithChildrenElements` list.
