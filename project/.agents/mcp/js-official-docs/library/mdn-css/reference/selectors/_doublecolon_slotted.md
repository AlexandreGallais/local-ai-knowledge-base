---
title: "`::slotted()` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_slotted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::slotted()` CSS pseudo-element

The **`::slotted()`** CSS pseudo-element represents any element that has been placed into a slot inside an HTML template (see Using templates and slots for more information).

This only works when used inside CSS placed within a shadow DOM. Note that this selector won't select a text node placed into a slot; it only targets actual elements.

```css
/* This CSS is being applied inside the shadow DOM. */

::slotted(.content) {
  background-color: aqua;
}

h2 ::slotted(span) {
  background: silver;
}
```

```html
<template id="card-template">
  <div>
    <h2><slot name="caption">title goes here</slot></h2>
    <slot name="content">content goes here</slot>
  </div>
</template>

<my-card>
  <span slot="caption">Error</span>
  <p class="content" slot="content">Build failed!</p>
</my-card>
```

```js
customElements.define(
  "my-card",
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById("card-template");
      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(document.importNode(template.content, true));

      const elementStyle = document.createElement("style");
      elementStyle.textContent = `
        div {
          width: 200px;
          border: 2px dotted red;
          border-radius: 4px;
        }`;
      shadow.appendChild(elementStyle);

      const cssTab = document.querySelector("#css-output");
      const editorStyle = document.createElement("style");
      editorStyle.textContent = cssTab.textContent;
      shadow.appendChild(editorStyle);
      cssTab.addEventListener("change", () => {
        editorStyle.textContent = cssTab.textContent;
      });
    }
  },
);
```

```css
/* Selects any element placed inside a slot */
::slotted(*) {
  font-weight: bold;
}

/* Selects any <span> placed inside a slot */
::slotted(span) {
  font-weight: bold;
}
```

## Syntax

```css
::slotted(<compound-selector>) {
  /* ... */
}
```

## Examples

### Highlighting slotted elements

In this example, we use a template with three slots:

```html
<template id="person-template">
  <div>
    <h2>Personal ID Card</h2>
    <slot name="person-name">NAME MISSING</slot>
    <ul>
      <li><slot name="person-age">AGE MISSING</slot></li>
      <li><slot name="person-occupation">OCCUPATION MISSING</slot></li>
    </ul>
  </div>
</template>
```

We define the `<person-details>` custom element. In this case, we add styles with JavaScript, though we could have added them in a `<style>` block within the `<template>` with the same effect:

```js
customElements.define(
  "person-details",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("person-template");

      const shadowRoot = this.attachShadow({ mode: "open" });

      const style = document.createElement("style");
      style.textContent =
        "div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }" +
        "h2 { margin: 0 0 10px; }" +
        "ul { margin: 0; }" +
        "p { margin: 10px 0; }" +
        "::slotted(*) { color: gray; font-family: sans-serif; } " +
        "::slotted(span) {text-decoration: underline;} ";

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(document.importNode(template.content, true));
    }
  },
);
```

When filling the `style` element with content, you'll see that we select all slotted elements (`::slotted(*)`) and give them a different font and color. This differentiates them from the slots that haven't been filled. We styled all the slotted ``s (`::slotted(span)`) to differentiate the ``s from the ``s.

Our markup includes three custom elements, including a custom element with an invalid slot name in a source order that differs from the `<template>`:

```html
<person-details>
  <p slot="person-name">Wonder Woman</p>
  <span slot="person-age">Immortal</span>
  <span slot="person-occupation">Superhero</span>
</person-details>

<person-details>
  <p slot="person-name">Malala Yousafzai</p>
  <span slot="person-age">17</span>
  <span slot="person-occupation">Activist</span>
</person-details>

<person-details>
  <span slot="person-age">44</span>
  <span slot="not-a-slot-name">Time traveler</span>
  <p slot="person-name">Dr. Who</p>
</person-details>
```

#### Result

## See also

- `:host`
- `:host()`
- `:host-context()`
- `:has-slotted`
- CSS scoping module
- HTML `slot` attribute
- HTML `<slot>` element
- HTML `<template>` element
- Web components
