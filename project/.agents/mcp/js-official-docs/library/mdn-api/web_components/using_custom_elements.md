---
title: "Using custom elements (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_components/using_custom_elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using custom elements

One of the key <example-value> of web components is the ability to create _custom elements_: that is, HTML elements whose behavior is defined by the web developer, that extend the set of elements available in the browser.

This article introduces custom elements, and walks through some examples.

## Types of custom element

There are two types of custom element:

- **Autonomous custom elements** inherit from the HTML element base class `HTMLElement`. You have to implement their behavior from scratch.

- **Customized built-in elements** inherit from standard HTML elements such as `HTMLImageElement` or `HTMLParagraphElement`. Their implementation extends the behavior of select instances of the standard element.

  > **Note:**
  > Safari does not plan to support customized built-in elements. See the `is` attribute for more information.

For both kinds of custom element, the basic steps to create and use them are the same:

- You first implement its behavior by defining a JavaScript class.
- You then register the custom element to the current page. You can also create scoped registries to limit definitions to a particular DOM subtree.
- Finally, you can use the custom element in your HTML or JavaScript code.

## Implementing a custom element

A custom element is implemented as a class which extends `HTMLElement` (in the case of autonomous elements) or the interface you want to customize (in the case of customized built-in elements). This class will not be called by you, but will be called by the browser. Immediately after defining the class, you should register the custom element, so you can create instances of it using standard DOM practices, such as writing the element in HTML markup, calling `document.createElement()`, etc.

Here's the implementation of a minimal custom element that customizes the `` element:

```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }
  // Element functionality written in here
}
```

Here's the implementation of a minimal autonomous custom element:

```js
class PopupInfo extends HTMLElement {
  constructor() {
    super();
  }
  // Element functionality written in here
}
```

In the class constructor, you can set up initial state and default values, register event listeners and perhaps create a shadow root. At this point, you should not inspect the element's attributes or children, or add new attributes or children. See Requirements for custom element constructors and reactions for the complete set of requirements.

### Custom element lifecycle callbacks

Once your custom element is registered, the browser will call certain methods of your class when code in the page interacts with your custom element in certain ways. By providing an implementation of these methods, which the specification calls _lifecycle callbacks_, you can run code in response to these events.

Custom element lifecycle callbacks include:

- `connectedCallback()`: Called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
- `disconnectedCallback()`: Called each time the element is removed from the document.
- `connectedMoveCallback()`: When defined, this is called _instead of_ `connectedCallback()` and `disconnectedCallback()` each time the element is moved to a different place in the DOM via `Element.moveBefore()`. Use this to avoid running initialization/cleanup code in the `connectedCallback()` and `disconnectedCallback()` callbacks when the element is not actually being added to or removed from the DOM. See Lifecycle callbacks and state-preserving moves for more details.
- `adoptedCallback()`: Called each time the element is moved to a new document.
- `attributeChangedCallback()`: Called when attributes are changed, added, removed, or replaced. See Responding to attribute changes for more details about this callback.

Here's a minimal custom element that logs these lifecycle events:

```js
// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```

#### Lifecycle callbacks and state-preserving moves

The position of a custom element in the DOM can be manipulated just like any regular HTML element, but there are lifecycle side-effects to consider.

Each time a custom element is moved (via methods such as `Element.moveBefore()` or `Node.insertBefore()`), the `disconnectedCallback()` and `connectedCallback()` lifecycle callbacks are fired, because the element is disconnected from and reconnected to the DOM.

This might be your intended behavior. However, since these callbacks are typically used to implement any required initialization or cleanup code to run at the start or end of the element's lifecycle, running them when the element is moved (rather than removed or inserted) may cause problems with its state. You might for example remove some stored data that the element still needs.

If you want to preserve the element's state, you can do so by defining a `connectedMoveCallback()` lifecycle callback inside the element class, and then using the `Element.moveBefore()` method to move the element (instead of similar methods such as `Node.insertBefore()`). This causes the `connectedMoveCallback()` to run instead of `connectedCallback()` and `disconnectedCallback()`.

You could add an empty `connectedMoveCallback()` to stop the other two callbacks running, or include some custom logic to handle the move:

```js
class MyComponent {
  // ...
  connectedMoveCallback() {
    console.log("Custom move-handling logic here.");
  }
  // ...
}
```

## Registering a custom element

To make a custom element available in a page, call the `define()` method of `Window.customElements`.

The `define()` method takes the following arguments:

- `name`
    The name of the element. This must start with a lowercase letter, contain a hyphen, and satisfy certain other rules listed in the specification's definition of a valid name.
- `constructor`
    The custom element's constructor function.
- `options`
    Only included for customized built-in elements, this is an object containing a single property `extends`, which is a string naming the built-in element to extend.

For example, this code registers the `WordCount` customized built-in element:

```js
customElements.define("word-count", WordCount, { extends: "p" });
```

This code registers the `PopupInfo` autonomous custom element:

```js
customElements.define("popup-info", PopupInfo);
```

## Using a custom element

Once you've defined and registered a custom element, you can use it in your code.

To use a customized built-in element, use the built-in element but with the custom name as the value of the `is` attribute:

```html
<p is="word-count"></p>
```

To use an autonomous custom element, use the custom name just like a built-in HTML element:

```html
<popup-info>
  <!-- content of the element -->
</popup-info>
```

## Scoped custom element registries

The examples above register custom elements on the global `CustomElementRegistry` accessed via `Window.customElements`. This means every custom element name you register must be globally unique across the entire page. As applications grow and begin combining components from multiple libraries, global name collisions can become a problem — if two libraries both try to define `<my-button>`, one of them will fail.

**Scoped custom element registries** solve this by letting you create an independent registry whose definitions only apply to a specific DOM subtree, such as a `ShadowRoot`. Different shadow trees can each use their own registry with their own definitions, even if the element names overlap.

### Creating a scoped registry

Create a scoped registry using the `CustomElementRegistry()` constructor and register elements on it with `define()`, just like the global registry:

```js
const myRegistry = new CustomElementRegistry();

myRegistry.define(
  "my-element",
  class extends HTMLElement {
    connectedCallback() {
      this.textContent = "Hello from scoped registry!";
    }
  },
);
```

> **Note:**
> Scoped registries do not support the `extends` option in `define()` (for creating customized built-in elements). Attempting to use `extends` with a scoped registry throws a `NotSupportedError` `DOMException`.

### Associating a scoped registry with a shadow root

One way to use a scoped registry is to pass it to `Element.attachShadow()` via the `customElementRegistry` option. Elements parsed or created inside that shadow tree will then use the scoped registry's definitions instead of the global one:

```js
const host = document.createElement("div");
document.body.appendChild(host);

const shadow = host.attachShadow({
  mode: "open",
  customElementRegistry: myRegistry,
});

// <my-element> is upgraded using myRegistry's definition
shadow.innerHTML = "<my-element></my-element>";
```

You can also associate a scoped registry after the shadow root has been created by calling `initialize()`. This is useful when you need to set up the DOM structure first and attach the registry later:

```js
const shadow = host.attachShadow({
  mode: "open",
  customElementRegistry: null, // no registry yet
});
shadow.innerHTML = "<my-element></my-element>";

// Later, associate the scoped registry and upgrade elements
myRegistry.initialize(shadow);
```

### Declarative shadow DOM with scoped registry

For declarative shadow DOM, you can use the `shadowrootcustomelementregistry` attribute on a `<template>` element. This tells the HTML parser to leave the shadow root's `customElementRegistry` as `null`, so a scoped registry can be attached later with `initialize()`:

```html
<my-host>
  <template shadowrootmode="open" shadowrootcustomelementregistry>
    <my-element></my-element>
  </template>
</my-host>
```
