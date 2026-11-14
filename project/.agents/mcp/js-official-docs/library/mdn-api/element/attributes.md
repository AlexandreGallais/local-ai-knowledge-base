---
title: "Element: attributes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/attributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: attributes property

The **`attributes`** read-only property of the `Element` interface returns a live collection of all attribute nodes registered to the specified node. It is a `NamedNodeMap`, not an `Array`, so it has no `Array` methods and the `Attr` nodes' indexes may differ among browsers. To be more specific, `attributes` is a key/value pair of strings that represents any information regarding that attribute.

## Value

A `NamedNodeMap` object.

## Examples

### Basic <example-value>

```js
// Get the first <p> element in the document
const paragraph = document.querySelector("p");
const attributes = paragraph.attributes;
```

### Enumerating elements attributes

You can enumerate through an element's attributes using `for...of`.
The following example runs through the attribute nodes for the element in the document
with id "paragraph", and prints each attribute's value.

```html
<p id="paragraph" class="green" contenteditable>Sample Paragraph</p>
<input type="button" value="Show paragraph attribute name and value" />
<pre id="result"></pre>
```

```css
.green {
  color: green;
}
```

```js
const paragraph = document.getElementById("paragraph");
const result = document.getElementById("result");
const btn = document.querySelector("input[type='button']");

btn.addEventListener("click", () => {
  // First, let's verify that the paragraph has some attributes
  if (paragraph.hasAttributes()) {
    let output = "Attributes of first paragraph:\n";
    for (const attr of paragraph.attributes) {
      output += `${attr.name} -> ${attr.value}\n`;
    }
    result.textContent = output;
  } else {
    result.textContent = "No attributes to show";
  }
});
```

## See also

- `NamedNodeMap`, the interface of the returned object
- Cross-browser compatibility considerations: on quirksmode
