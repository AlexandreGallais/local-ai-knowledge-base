---
title: "CustomElementRegistry: whenDefined() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/whendefined/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: whenDefined() method

The **`whenDefined()`** method of the `CustomElementRegistry` interface returns a `Promise` that resolves when the named element is defined.

## Syntax

```js
whenDefined(name)
```

### Parameters

- `name`
    The name of the custom element.

### Return value

A `Promise` that fulfills with the custom element's constructor when a custom element becomes defined with the given name.
If a custom element has already been defined with the name, the promise will immediately fulfill.

### Exceptions

- `SyntaxError` `DOMException`
    The provided name is not a valid custom element name.

## Examples

### Basic usage

This example uses `whenDefined()` to detect when the custom elements that make up a menu are defined.
The menu displays placeholder content until the actual menu content is ready to display.

```html
<nav id="menu-container">
  <div class="menu-placeholder">Loading…</div>
  <nav-menu>
    <menu-item>Item 1</menu-item>
    <menu-item>Item 2</menu-item>
    …
    <menu-item>Item N</menu-item>
  </nav-menu>
</nav>
```

```js
const container = document.getElementById("menu-container");
const placeholder = container.querySelector(".menu-placeholder");
// Fetch all the children of menu that are not yet defined.
const undefinedElements = container.querySelectorAll(":not(:defined)");

async function removePlaceholder() {
  // Filter the elements down to unique localNames
  const tags = new Set(
    [...undefinedElements].map((button) => button.localName),
  );
  const promises = [...tags].map((tag) => customElements.whenDefined(tag));

  // Wait for all the children to be upgraded
  await Promise.all(promises);
  // then remove the placeholder
  container.removeChild(placeholder);
}

removePlaceholder();
```
