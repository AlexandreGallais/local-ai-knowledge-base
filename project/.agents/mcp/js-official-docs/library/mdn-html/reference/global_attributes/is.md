---
title: "`is` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/is/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `is` HTML global attribute

> **Note:**
> Safari does not plan to support customized built-in elements and browser vendors are exploring alternative solutions to customizing built-ins. Check the browser compatibility section for support information.

The **`is`** global attribute allows you to specify that a standard HTML element should behave like a defined customized built-in element (see Using custom elements for more details).

This attribute can only be used if the specified custom element name has been successfully defined in the current document, and extends the element type it is being applied to.

## Examples

The following code is taken from our word-count-web-component example (see it live also).

```js
// Create a class for the element
class WordCount extends HTMLParagraphElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Constructor contents omitted for brevity
    // …
  }
}

// Define the new element
customElements.define("word-count", WordCount, { extends: "p" });
```

```html
<p is="word-count"></p>
```

## See also

- All global attributes.
