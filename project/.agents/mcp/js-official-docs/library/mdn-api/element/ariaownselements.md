---
title: "Element: ariaOwnsElements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaownselements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaOwnsElements property

The **`ariaOwnsElements`** property of the `Element` interface is an array containing the element (or elements) that define a visual, functional, or contextual relationship between a parent element that it is applied to, and its child elements.
This is used when the DOM hierarchy cannot be used to represent the relationship, and it would not otherwise be available to assistive technology,

The `aria-owns` topic contains additional information about how the attribute and property should be used.

## Value

An array of subclasses of `HTMLElement`.

When read, the returned array is static and read-only.
When written, the assigned array is copied: subsequent changes to the array do not affect the value of the property.

## Description

The property is a flexible alternative to using the `aria-owns` attribute to indicate ownership of an element.
Unlike `aria-owns`, the elements assigned to this property do not have to have an `id` attribute.

The property reflects the element's `aria-owns` attribute when it is defined, but only for listed reference `id` values that match valid in-scope elements.
If the property is set, then the corresponding attribute is cleared.
For more information about reflected element references and scope see Reflected element references in the _Reflected attributes_ guide.

## Examples

### Get the owned element

This example demonstrates how the `aria-owns` attribute and property are used.

The code defines a menu and its associated submenu in separate and non-nested `` elements.
Because these elements are not nested the ownership relationship between the menu and submenu is not captured by the DOM.
Here we provide that information to accessibility tools using the `aria-owns` attribute, but we could also do it using the reflected property.

Note that we could construct a menu where the submenu was nested: the example has been _contrived_ to make it easier to demonstrate a case where the relationship needs to be defined.

#### HTML

The HTML defines `` elements for the menu, with `id=parentMenu` and the submenu with `id="subMenu1"`.
We've added a `` in between just to make it even more obvious that there is no direct ownership model defined in the DOM.

The parent menu `` includes the attribute `aria-owns="subMenu1"` to create this ownership relationship.

```html
<div class="menu" id="parentMenu" role="menubar" aria-owns="subMenu1">
  Top level menu (hover over)
</div>

<div>Some other element</div>

<div class="submenu" id="subMenu1" role="menu">
  <a href="#" role="menuitem">Menu item 1</a>
  <a href="#" role="menuitem">Menu item 2</a>
  <a href="#" role="menuitem">Menu item 3</a>
</div>
```

#### CSS

The CSS styles the menu and submenu, and displays the submenu when the menu is hovered over.

```css
.menu {
  position: relative;
  display: inline-block;
  color: purple;
}

.submenu {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 0.2);
  z-index: 1;
  top: 20px;
  left: 0;
}

.menu:hover ~ .submenu {
  display: block;
}

.submenu a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.submenu a:hover {
  background-color: #f1f1f1;
}
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 80px;
  overflow: scroll;
  padding: 0.5rem;
  margin: 5px;
  border: 1px solid black;
}
```

#### JavaScript

The code first checks whether the `ariaOwnsElements` is supported.
If it is, we log the attribute, the elements in the property, and the `id` value for each element.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
// Feature test for ariaOwnsElements
if ("ariaOwnsElements" in Element.prototype) {
  const parentMenu = document.querySelector("#parentMenu");
  log(`parentMenu.getAttribute(): ${parentMenu.getAttribute("aria-owns")}`);
  log(`parentMenu.ariaOwnsElements: ${parentMenu.ariaOwnsElements}`);
  parentMenu.ariaOwnsElements?.forEach((elem) => {
    log(`  id: ${elem.id}`);
  });
} else {
  log("element.ariaOwnsElements: not supported by browser");
}
```

#### Result

The result of running the code is shown below.
The log shows that the relationship defined using the `aria-owns` attribute is reflected in the `ariaOwnsElements` property (elements in the array match the attribute element references).

## See also

- `aria-owns` attribute
- `ElementInternals.ariaOwnsElements`
- Reflected element references in the _Attribute reflection_ guide.
