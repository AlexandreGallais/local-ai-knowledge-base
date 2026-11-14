---
title: "Using custom elements (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_components/using_custom_elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using custom elements (part 2 of 3)

## Responding to attribute changes

Like built-in elements, custom elements can use HTML attributes to configure the element's behavior. To use attributes effectively, an element has to be able to respond to changes in an attribute's value. To do this, a custom element needs to add the following members to the class that implements the custom element:

- A static property named `observedAttributes`. This must be an array containing the names of all attributes for which the element needs change notifications.
- An implementation of the `attributeChangedCallback()` lifecycle callback.

The `attributeChangedCallback()` callback is then called whenever an attribute whose name is listed in the element's `observedAttributes` property is added, modified, removed, or replaced.

The callback is passed three arguments:

- The name of the attribute which changed.
- The attribute's old value.
- The attribute's new value.

For example, this autonomous element will observe a `size` attribute, and log the old and new values when they change:

```js
// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["size"];

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
    );
  }
}

customElements.define("my-custom-element", MyCustomElement);
```

Note that if the element's HTML declaration includes an observed attribute, then `attributeChangedCallback()` will be called after the attribute is initialized, when the element's declaration is parsed for the first time. So in the following example, `attributeChangedCallback()` will be called when the DOM is parsed, even if the attribute is never changed again:

```html
<my-custom-element size="100"></my-custom-element>
```

For a complete example showing the use of `attributeChangedCallback()`, see Lifecycle callbacks in this page.

### Custom states and custom state pseudo-class CSS selectors

Built-in HTML elements can have different _states_, such as "hover", "disabled", and "read only".
Some of these states can be set as attributes using HTML or JavaScript, while others are internal, and cannot.
Whether external or internal, commonly these states have corresponding CSS pseudo-classes that can be used to select and style the element when it is in a particular state.

Autonomous custom elements (but not elements based on built-in elements) also allow you to define states and select against them using the `:state()` pseudo-class function.
The code below shows how this works using the example of an autonomous custom element that has an internal state `"collapsed"`.

The `collapsed` state is represented as a boolean property (with setter and getter methods) that is not visible outside of the element.
To make this state selectable in CSS the custom element first calls `HTMLElement.attachInternals()` in its constructor in order to attach an `ElementInternals` object, which in turn provides access to a `CustomStateSet` through the `ElementInternals.states` property.
The setter for the (internal) collapsed state adds the _identifier_ `hidden` to the `CustomStateSet` when the state is `true`, and removes it when the state is `false`.
The identifier is just a string: in this case we called it `hidden`, but we could have just as easily called it `collapsed`.

```js
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  get collapsed() {
    return this._internals.states.has("hidden");
  }

  set collapsed(flag) {
    if (flag) {
      // Existence of identifier corresponds to "true"
      this._internals.states.add("hidden");
    } else {
      // Absence of identifier corresponds to "false"
      this._internals.states.delete("hidden");
    }
  }
}

// Register the custom element
customElements.define("my-custom-element", MyCustomElement);
```

We can use the identifier added to the custom element's `CustomStateSet` (`this._internals.states`) for matching the element's custom state.
This is matched by passing the identifier to the `:state()` pseudo-class.
For example, below we select on the `hidden` state being true (and hence the element's `collapsed` state) using the `:hidden` selector, and remove the border.

```css
my-custom-element {
  border: dashed red;
}
my-custom-element:state(hidden) {
  border: none;
}
```

The `:state()` pseudo-class can also be used within the `:host()` pseudo-class function to match a custom state within a custom element's shadow DOM. Additionally, the `:state()` pseudo-class can be used after the `::part()` pseudo-element to match the shadow parts of a custom element that is in a particular state.

There are several live examples in `CustomStateSet` showing how this works.
