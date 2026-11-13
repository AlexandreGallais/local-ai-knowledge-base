---
title: "CSSStyleDeclaration"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstyledeclaration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleDeclaration

The **`CSSStyleDeclaration`** interface is the base class for objects that represent CSS declaration blocks with different supported sets of CSS style information:

- `CSSStyleProperties` — CSS styles declared in stylesheet (`CSSStyleRule.style`), inline styles for an element such as `HTMLElement`, `SVGElement`, and `MathMLElement`, or the computed style for an element returned by `Window.getComputedStyle()`.
- `CSSPageDescriptors` — Styles for CSS at-rules.

The interface exposes style information and various style-related methods and properties.
For example, it provides `getPropertyValue()` for getting the value of a dash-named CSS property, such as `border-top`, which can't be directly accessed using dot notation because of the hyphens in its name.

> **Note:**
> Earlier versions of the specification used `CSSStyleDeclaration` to represent all CSS declaration blocks, and some browsers and browser versions may still do so (check the browser compatibility tables for the above APIs).
> Generally the same website code will be functional in both old and new versions, but some properties returned in a `CSSStyleDeclaration` may not be relevant in a particular context.

## Attributes

- `CSSStyleDeclaration.cssText`
    Textual representation of the declaration block, if and only if it is exposed via `HTMLElement.style`.
    Setting this attribute changes the inline style.
    If you want a text representation of a computed declaration block, you can get it with `JSON.stringify()`.
- `CSSStyleDeclaration.length` (read-only)
    The number of properties.
    See the `item()` method below.
- `CSSStyleDeclaration.parentRule` (read-only)
    The containing `CSSRule`.

### CSS Properties

- `CSSStyleDeclaration.cssFloat` (deprecated)
    Special alias for the `float` CSS property.
- `CSSStyleDeclaration` named properties
    Dashed and camel-cased attributes for all supported CSS properties.

## Instance methods

- `CSSStyleDeclaration.getPropertyPriority()`
    Returns the optional priority, "important".
- `CSSStyleDeclaration.getPropertyValue()`
    Returns the property value given a property name.
- `CSSStyleDeclaration.item()`
    Returns a CSS property name by its index, or the empty string if the index is out-of-bounds.
- `CSSStyleDeclaration.removeProperty()`
    Removes a property from the CSS declaration block.
- `CSSStyleDeclaration.setProperty()`
    Modifies an existing CSS property or creates a new CSS property in the declaration block.
- `CSSStyleDeclaration.getPropertyCSSValue()` (deprecated) (non-standard)
    **Only supported via getComputedStyle in Firefox.** Returns the property value as a `CSSPrimitiveValue` or `null` for shorthand properties.

## Example

```js
const styleObj = document.styleSheets[0].cssRules[0].style;
console.log(styleObj.cssText);

for (let i = styleObj.length; i--;) {
  const nameString = styleObj[i];
  styleObj.removeProperty(nameString);
}

console.log(styleObj.cssText);
```
