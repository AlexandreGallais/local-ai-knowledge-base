---
title: "CustomElementRegistry: define() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customelementregistry/define/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomElementRegistry: define() method

The **`define()`** method of the `CustomElementRegistry` interface adds a definition for a custom element to the custom element registry, mapping its name to the constructor which will be used to create it.

## Syntax

```js
define(name, constructor)
define(name, constructor, options)
```

### Parameters

- `name`
    Name for the new custom element. Must be a valid custom element name.
- `constructor`
    Constructor for the new custom element. It can have the following instance methods (defined on `constructor.prototype`):
    - `connectedCallback`
    - `disconnectedCallback`
    - `connectedMoveCallback`
    - `adoptedCallback`
    - `attributeChangedCallback`

    It can have the following static properties:
    - `observedAttributes`: an array of strings. Only read if `attributeChangedCallback` is defined.
    - `disabledFeatures`: an array containing the values `"internals"` and/or `"shadow"`.
    - `formAssociated`: a boolean.

    If `formAssociated` is `true`, it can additionally have the following instance methods:
    - `formAssociatedCallback`
    - `formResetCallback`
    - `formDisabledCallback`
    - `formStateRestoreCallback`

    All of these methods and properties are only retrieved once when `define()` is called. For their behavior, see Using custom elements.

- `options` (optional)
    Object that controls how the element is defined. One option is currently supported:
    - `extends`
        String specifying the name of a built-in element to extend.
        Used to create a customized built-in element.

### Return value

None (`undefined`).

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if:
    - The `CustomElementRegistry` already contains an entry with the same name or the same constructor (or is otherwise already defined).
    - The `extends` option is specified and it is a valid custom element name (i.e., you're trying to extend a custom element).
    - The `extends` option is specified but the element it is trying to extend is an unknown element.
- `SyntaxError` `DOMException`
    Thrown if the provided name is not a valid custom element name.
- `TypeError`
    Thrown if the referenced constructor is not a constructor.

## Description

The `define()` method adds a definition for a custom element to the custom element registry, mapping its name to the constructor which will be used to create it.

There are two types of custom element you can create:

- _Autonomous custom elements_ are standalone elements, that don't inherit from built-in HTML elements.
- _Customized built-in elements_ are elements that inherit from, and extend, built-in HTML elements.

To define an autonomous custom element, you should omit the `options` parameter.

To define a customized built-in element, you must pass the `options` parameter with its `extends` property set to the name of the built-in element that you are extending, and this must correspond to the interface that your custom element class definition inherits from. For example, to customize the `` element, you must pass `{extends: "p"}` to `define()`, and the class definition for your element must inherit from `HTMLParagraphElement`.

When `define()` is called, existing HTML elements connected to an associated document, including those in shadow trees, are automatically upgraded if they use this registry and match the definition.

### Valid custom element names

Custom element names must:

- start with an ASCII lowercase letter (a-z)
- contain a hyphen
- not contain any ASCII uppercase letters
- not contain ASCII whitespace, `NULL`, `/`, or `>` (U+0000, U+002F, or U+003E, respectively)
- not be any of:
  - "annotation-xml"
  - "color-profile"
  - "font-face"
  - "font-face-src"
  - "font-face-uri"
  - "font-face-format"
  - "font-face-name"
  - "missing-glyph"

## Examples

### Defining an autonomous custom element

The following class implements a minimal autonomous custom element:

```js
class MyAutonomousElement extends HTMLElement {
  constructor() {
    super();
  }
}
```

This element doesn't do anything: a real autonomous element would implement its functionality in its constructor and in the lifecycle callbacks provided by the standard.
See Implementing a custom element in our guide to working with custom elements.

However, the above class definition satisfies the requirements of the `define()` method, so we can define it with the following code:

```js
customElements.define("my-autonomous-element", MyAutonomousElement);
```

We could then use it in an HTML page like this:

```html
<my-autonomous-element>Element contents</my-autonomous-element>
```

### Defining a customized built-in element

The following class implements a customized built-in element:

```js
class MyCustomizedBuiltInElement extends HTMLParagraphElement {
  constructor() {
    super();
  }
}
```

This element extends the built-in `` element.

In this minimal example the element doesn't implement any customization, so it will behave just like a normal `` element.
However, it does satisfy the requirements of `define()`, so we can define it like this:

```js
customElements.define(
  "my-customized-built-in-element",
  MyCustomizedBuiltInElement,
  {
    extends: "p",
  },
);
```

We could then use it in an HTML page like this:

```html
<p is="my-customized-built-in-element"></p>
```

## See also

- Using custom elements
- `CustomElementRegistry.upgrade()`
