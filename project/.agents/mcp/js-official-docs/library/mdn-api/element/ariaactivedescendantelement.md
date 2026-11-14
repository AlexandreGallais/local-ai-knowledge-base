---
title: "Element: ariaActiveDescendantElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaactivedescendantelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaActiveDescendantElement property

The **`ariaActiveDescendantElement`** property of the `Element` interface represents the current active element when focus is on a `composite` widget, `combobox`, `textbox`, `group`, or `application`.

The `aria-activedescendant` topic contains additional information about how the attribute and property should be used.

## Value

A subclass of `HTMLElement` that represents the active descendant, or `null` if there is no active descendant.

## Description

The property is a flexible alternative to using the `aria-activedescendant` attribute.
Unlike `aria-activedescendant`, the element assigned to this property does not have to have an `id` attribute.

The property reflects the element's `aria-activedescendant` attribute when it is defined, but only for reference `id` values that match valid in-scope elements.
If the property is set, then the corresponding attribute is cleared.
For more information about reflected element references and scope see Reflected element references in the _Reflected attributes_ guide.

## Examples

### Get the active descendant

This example shows how `ariaActiveDescendantElement` can be used to get the current active descendant.

#### HTML

The HTML defines a listbox for selecting different kinds of streets, consisting of a `` element with the `listbox` role and nested `` items for each of the options.
The active descendant is initially set to the element with `id` of `avenue` using `aria-activedescendant`.

```html
<div id="streetType" role="listbox" aria-activedescendant="avenue">
  <div>Street</div>
  <div id="avenue">Avenue</div>
  <div>Lane</div>
</div>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 70px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

The code below first checks whether the `ariaActiveDescendantElement` is supported.
It the property is supported the code then logs the value of `aria-activedescendant` (the `id` of the referenced element) using `Element.getAttribute()`, the property element, and the element's text content.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
// Feature test for ariaActiveDescendantElement
if ("ariaActiveDescendantElement" in Element.prototype) {
  log(`getAttribute(): ${streetType.getAttribute("aria-activedescendant")}`);
  log(`ariaActiveDescendantElement: ${streetType.ariaActiveDescendantElement}`);
  log(`text: ${streetType.ariaActiveDescendantElement?.textContent.trim()}`);
} else {
  log("ariaActiveDescendantElement not supported by browser");
}
```

#### Result

The log below shows the output of the above code.
The value returned from the `aria-activedescendant` property should be `"avenue"`, the associated element should be a `HTMLDivElement` element, and the text in that element should be `Avenue`.

## See also

- `aria-activedescendant` attribute
- `ElementInternals.ariaActiveDescendantElement`
- Reflected element references in the _Attribute reflection_ guide.
