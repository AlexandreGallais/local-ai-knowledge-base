---
title: "MathMLElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLElement

The **`MathMLElement`** interface represents any MathML element.

## Instance properties

_Also inherits properties from its parent, `Element`_.

- `MathMLElement.attributeStyleMap` (read-only)
    A `StylePropertyMap` representing the declarations of the element's `style` attribute.
- `MathMLElement.autofocus`
    Whether the control should be focused when the page loads, or when a `<dialog>` or popover become shown.
- `MathMLElement.dataset` (read-only)
    A `DOMStringMap` object which provides a list of key/value pairs of named data attributes which correspond to custom data attributes attached to the element. These correspond to MathML's `data-*` global attributes.
- `MathMLElement.nonce`
    Returns the cryptographic number used once that is used by Content Security Policy to determine whether a given fetch will be allowed to proceed.
- `MathMLElement.style`
    A `CSSStyleDeclaration` representing the declarations of the element's `style` attribute.
- `MathMLElement.tabIndex`
    The position of the element in the tabbing order.

## Instance methods

_This interface also inherits methods from its parent, `Element`_.

- `MathMLElement.blur()`
    Removes keyboard focus from the currently focused element.
- `MathMLElement.focus()`
    Makes the element the current keyboard focus.

## Examples

### MathML

```html
<math>
  <msqrt>
    <mi>x</mi>
  </msqrt>
</math>
```

### JavaScript

```js
document.querySelector("msqrt").constructor.name; // MathMLElement
```

## See also

- `Element`
- `HTMLElement`
- `SVGElement`
