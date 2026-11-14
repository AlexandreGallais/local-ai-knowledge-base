---
title: "Element: shadowRoot property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/shadowroot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: shadowRoot property

The `Element.shadowRoot` read-only property
represents the shadow root hosted by the element.

Use `Element.attachShadow()` to add a shadow root to an existing element.

## Value

A `ShadowRoot` object instance, or `null` if the associated
shadow root was attached with its `mode` set to
`closed`. (See `Element.attachShadow()` for further details).

Some built-in elements, such as `` and ``, have user-agent shadow roots that are closed to script. Therefore, their `shadowRoot` property is always `null`.

## Examples

The following snippets are taken from our life-cycle-callbacks
example (see it live also), which creates an element that displays a square of a size and color
specified in the element's attributes.

Inside the `<custom-square>` element's class definition we include
some life cycle callbacks that make a call to an external function,
`updateStyle()`, which actually applies the size and color to the element.
You'll see that we are passing it `this` (the custom element itself) as a
parameter.

```js
class Square extends HTMLElement {
  connectedCallback() {
    console.log("Custom square element added to page.");
    updateStyle(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    updateStyle(this);
  }
}
```

In the `updateStyle()` function itself, we get a reference to the shadow DOM
using `Element.shadowRoot`. From here we use standard DOM traversal
techniques to find the `<style>` element inside the shadow DOM and then
update the CSS found inside it:

```js
function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  const childNodes = Array.from(shadow.childNodes);

  childNodes.forEach((childNode) => {
    if (childNode.nodeName === "STYLE") {
      childNode.textContent = `
        div {
          width: ${elem.getAttribute("l")}px;
          height: ${elem.getAttribute("l")}px;
          background-color: ${elem.getAttribute("c")};
        }
      `;
    }
  });
}
```
