---
title: "CustomElementRegistry: getName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/getname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: getName() method

The **`getName()`** method of the
`CustomElementRegistry` interface returns the name for a
previously-defined custom element.

## Syntax

```js
getName(constructor)
```

### Parameters

- `constructor`
    Constructor for the custom element.

### Return value

The name for the previously defined custom element, or `null` if there is no custom element defined with the constructor.

## Examples

```js
class MyParagraph extends HTMLElement {
  constructor() {
    const template = document.getElementById("custom-paragraph");
    super() // returns element this scope
      .attachShadow({ mode: "open" }) // sets AND returns this.shadowRoot
      .append(document.importNode(template.content, true));
  }
}

customElements.define("my-paragraph", MyParagraph);

// Return a reference to the my-paragraph constructor
customElements.getName(MyParagraph) === "my-paragraph";
```
