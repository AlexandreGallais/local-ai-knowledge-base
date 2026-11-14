---
title: "ElementInternals: ariaBrailleRoleDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/ariabrailleroledescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: ariaBrailleRoleDescription property

The **`ariaBrailleRoleDescription`** property of the `ElementInternals` interface reflects the value of the `aria-brailleroledescription` attribute, which defines the ARIA braille role description of the element.

This property may be used to provide an abbreviated version of the `aria-roledescription` value.
It should only be used if `aria-roledescription` is present and in the rare case where it is too verbose for braille.
The `aria-brailleroledescription` contains additional information about when the property should be set.

## Value

A string that is intended to be converted into braille.

## Examples

Assuming we have a custom slide element:

```js
class CustomSlide extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = "slide";
  }

  // …
}

customElements.define("custom-slide", CustomSlide);
```

```html
<custom-slide></custom-slide>
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(value) {
  logElement.textContent += `${value}\n`;
}
```

We can retrieve and set the value of the custom element's `aria-brailleroledescription` value:

```js
const customEl = document.querySelector("custom-slide");
log(customEl._internals.ariaBrailleRoleDescription);
customEl._internals.ariaBrailleRoleDescription = "sd";
log(customEl._internals.ariaBrailleRoleDescription);
```

## Browser compatibility

### See also

- ARIA roles
