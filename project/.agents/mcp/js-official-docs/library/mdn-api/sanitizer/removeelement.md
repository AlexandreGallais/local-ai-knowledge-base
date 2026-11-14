---
title: "Sanitizer: removeElement() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/removeelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: removeElement() method

The **`removeElement()`** method of the `Sanitizer` interface sets the specified element be removed from the output when the sanitizer is used.

The method can be used with either an allow configuration or a remove configuration.
If used with a remove configuration, the specified element is added to the `removeElements` array.
If used with an allow configuration, the element is removed from the `elements` array (if present).

## Syntax

```js
removeElement(element)
```

### Parameters

- `element`
    A string indicating the name of the element to be disallowed, or an object with the following properties:
    - `name`
        A string containing the name of the element.
    - `namespace` (optional)
        A string containing the namespace of the element.
        The default namespace is `"http://www.w3.org/1999/xhtml"`.

### Return value

`true` if the operation changed the configuration to disallow the element, and `false` if the element was already disallowed.

Note that `false` might be returned if the internal configuration:

- defines an `elements` array and the element is already omitted (it does not need to be removed)
- instead defines the `removeElements` array and the specified element is already present (and is hence already filtered)

## Examples

### How to disallow elements

This example shows how `removeElement()` is used to specify an element to be "disallowed".

```html
<pre id="log"></pre>
```

```css
#log {
  height: 420px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
```

#### JavaScript

The code first creates a new `Sanitizer` object that initially allows `` and `<script>` elements, and that replaces `` elements with their child elements.

The code then calls `removeElement()` to add ``, `<script>` and `` elements to the `removeElements` list in the configuration.
Note that adding `<script>` and `` removes the elements from their original lists.

```js
if ("Sanitizer" in window) {
```

```js
// Create sanitizer using SanitizerConfig
const sanitizer = new Sanitizer({
  elements: ["div", "script"],
  replaceWithChildrenElements: ["span"],
});

// Disallow the <p> element
sanitizer.removeElement("p");

// Disallow the <script> element
sanitizer.removeElement("script");
// Disallow the <span> element
sanitizer.removeElement("span");

// Log the sanitizer configuration
let sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

> **Note:**
> This configuration is provided for demonstration only.
> Sanitizer configurations should include either just the allowed elements (`elements`) or just the disallowed elements (`removeElements`), but not both.
> In this case only the `` element is allowed and all other elements will be removed from the input: so the removed elements have no effect.

#### Results

The final configuration is logged below.
