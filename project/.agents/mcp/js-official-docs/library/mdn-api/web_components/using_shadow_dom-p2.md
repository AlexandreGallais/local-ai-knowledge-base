---
title: "Using shadow DOM (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_components/using_shadow_dom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using shadow DOM (part 2 of 2)

## Shadow DOM and custom elements

Without the encapsulation provided by shadow DOM, custom elements would be impossibly fragile. It would be too easy for a page to accidentally break a custom element's behavior or layout by running some page JavaScript or CSS. As a custom element developer, you'd never know whether the selectors applicable inside your custom element conflicted with those that applied in a page that chose to use your custom element.

Custom elements are implemented as a class which extends either the base `HTMLElement` or a built-in HTML element such as `HTMLParagraphElement`. Typically, the custom element itself is a shadow host, and the element creates multiple elements under that root, to provide the internal implementation of the element.

The example below creates a `<filled-circle>` custom element that just renders a circle filled with a solid color.

```js
class FilledCircle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // Create a shadow root
    // The custom element itself is the shadow host
    const shadow = this.attachShadow({ mode: "open" });

    // create the internal implementation
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", this.getAttribute("color"));
    svg.appendChild(circle);

    shadow.appendChild(svg);
  }
}

customElements.define("filled-circle", FilledCircle);
```

```html
<filled-circle color="blue"></filled-circle>
```

For more examples, illustrating different aspects of custom element implementation, see our guide to custom elements.

## See also

- Using custom elements
- Using templates and slots
- `Element.attachShadow()`
- `ShadowRoot.adoptedStyleSheets`
- `CSSStyleSheet.replace()`
- `CSSStyleSheet.replaceSync()`
- `<template>`
- CSS scoping module
- `:host`
- `:host()`
- `:host-context()`
- `::slotted()`
- CSS shadow parts module
- `::part`
