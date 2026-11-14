---
title: "`:defined` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_defined/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:defined` CSS pseudo-class

The **`:defined`** CSS pseudo-class represents any element that has been defined. This includes any standard element built into the browser and custom elements that have been successfully defined (i.e., with the `CustomElementRegistry.define()` method).

```css
/* Selects any defined element */
:defined {
  font-style: italic;
}

/* Selects any instance of a specific custom element */
custom-element:defined {
  display: block;
}
```

## Syntax

```css
:defined {
  /* ... */
}
```

## Examples

### Hiding elements until they are defined

In this demo, we define a basic <example-value> element named `<custom-element>` and use the `:not(:defined)` and `:defined` selectors to style the element before and after it is defined. This is useful if you have a complex custom element that takes a while to load into the page — you might want to hide instances of the element until the definition is complete so that you don't end up with flashes of ugly unstyled elements on the page.

#### HTML

The following HTML code uses the custom element but the element hasn't been defined yet. We also include a `` that will define the custom element when clicked, allowing you to see its state before and after definition.

```html
<custom-element>
  <p>
    Loaded content: Lorem ipsum tel sed tellus eiusmod tellus. Aenean. Semper
    dolor sit nisi. Elit porttitor nisi sit vivamus.
  </p>
</custom-element>

<button id="btn">define the <code>&lt;custom-element&gt;</code></button>
```

#### CSS

```css
custom-element {
  display: block;
  border: 5px dashed grey;
  border-radius: 1rem;
  height: 100px;
  width: 400px;
  padding: 1rem;
  position: relative;
  user-select: none;
}

code {
  background: #cccccc;
}

#btn {
  margin-top: 1rem;
  cursor: pointer;
}
```

In the following CSS, we use the `custom-element:not(:defined)` selector to select the element and color it gray while it is not defined and the `custom-element:defined` selector to select the element and color it black after it is defined.

```css
custom-element:not(:defined) {
  border-color: grey;
  color: grey;
}

custom-element:defined {
  background-color: wheat;
  border-color: black;
  color: black;
}

/* show loading message */
custom-element:not(:defined)::before {
  content: "Loading...";
  position: absolute;
  inset: 0;
  align-content: center;
  text-align: center;
  font-size: 2rem;
  background-color: white;
  border-radius: 1rem;
}

/* remove the loading message */
custom-element:defined::before {
  content: "";
}
```

We have also used the `::before` pseudo-element to show a "Loading..." overlay message until the element is defined. After definition, it is removed by setting the `content` to an empty string.

The following JavaScript has been used to define the custom element. To allow you to see the state of the custom element before and after definition we run the `define()` method when the button is clicked.

```js
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  customElements.define("custom-element", class extends HTMLElement {});
  btn.remove();
});
```

#### Result

## See also

- Web components
