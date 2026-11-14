---
title: "CustomStateSet (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customstateset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomStateSet (part 2 of 2)

## Examples

### Matching the custom state of a custom checkbox element

This example, which is adapted from the specification, demonstrates a custom checkbox element that has an internal "checked" state.
This is mapped to the `checked` custom state, allowing styling to be applied using the `:state(checked)` custom state pseudo class.

#### HTML

The HTML uses the custom element that the JavaScript below registers:

```html
<labeled-checkbox>You need to check this</labeled-checkbox>
```

#### CSS

We use the `:state(checked)` custom state pseudo class to select CSS for when the box is checked.

```css
labeled-checkbox {
  border: dashed red;
}
labeled-checkbox:state(checked) {
  border: solid;
}
```

#### JavaScript

First we define our class `LabeledCheckbox` which extends from `HTMLElement`.
In the constructor we call the `super()` method, add a listener for the click event, and call `this.attachInternals()` to attach an `ElementInternals` object.

Most of the rest of the "work" is then left to `connectedCallback()`, which is invoked when a custom element is added to the page.
The content of the element is defined using a `<style>` element to be the text `[]` or `[x]` followed by a label.
What's noteworthy here is that the custom state pseudo class is used to select the text to display: `:host(:state(checked))`.
After the example below, we'll cover what's happening in the snippet in more detail.

```js
class LabeledCheckbox extends HTMLElement {
  constructor() {
    super();
    this._boundOnClick = this._onClick.bind(this);
    this.addEventListener("click", this._boundOnClick);

    // Attach an ElementInternals to get states property
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<style>
  :host {
    display: block;
  }
  :host::before {
    content: "[ ]";
    white-space: pre;
    font-family: monospace;
  }
  :host(:state(checked))::before {
    content: "[x]";
  }
</style>
<slot>Label</slot>
`;
  }

  get checked() {
    return this._internals.states.has("checked");
  }

  set checked(flag) {
    if (flag) {
      this._internals.states.add("checked");
    } else {
      this._internals.states.delete("checked");
    }
  }

  _onClick(event) {
    // Toggle the 'checked' property when the element is clicked
    this.checked = !this.checked;
  }

  static isStateSyntaxSupported() {
    return CSS.supports("selector(:state(checked))");
  }
}

// Display a warning to unsupported browsers
if (!LabeledCheckbox.isStateSyntaxSupported()) {
  if (!document.getElementById("state-warning")) {
    const warning = document.createElement("div");
    warning.id = "state-warning";
    warning.style.color = "red";
    warning.textContent = "This feature is not supported by your browser.";
    document.body.insertBefore(warning, document.body.firstChild);
  }
}
```

In the `LabeledCheckbox` class:

- In the `get checked()` and `set checked()` we use `ElementInternals.states` to get the `CustomStateSet`.
- The `set checked(flag)` method adds the `"checked"` identifier to the `CustomStateSet` if the flag is set and delete the identifier if the flag is `false`.
- The `get checked()` method just checks whether the `checked` property is defined in the set.
- The property value is toggled when the element is clicked.

We then call the `define()` method on the object returned by `Window.customElements` in order to register the custom element:

```js
customElements.define("labeled-checkbox", LabeledCheckbox);
```

#### Result

Click the element to see a different border being applied as the checkbox `checked` state is toggled.

### Matching a custom state in a shadow part of a custom element

This example, which is adapted from the specification, demonstrates that custom states can be used to target the shadow parts of a custom element for styling.
Shadow parts are sections of the shadow tree that are intentionally exposed to pages that use the custom element.

The example creates a `<question-box>` custom element that displays a question prompt along with a checkbox labeled "Yes".
The element uses the `<labeled-checkbox>` defined in the previous example for the checkbox.

#### HTML

The HTML uses the custom element that the JavaScript below registers.

```html
<!-- Question box with default prompt "Question" -->
<question-box></question-box>

<!-- Question box with custom prompt "Continue?" -->
<question-box>Continue?</question-box>
```

#### CSS

The first block of CSS matches the exposed shadow part named `checkbox` using the `::part()` selector, styling it to be `red` by default.

```css
question-box::part(checkbox) {
  color: red;
}
```

The second block follows `::part()` with `:state()`, in order to match `checkbox` parts that are in the `checked` state:

```css
question-box::part(checkbox):state(checked) {
  color: green;
  outline: dashed 1px green;
}
```

#### JavaScript

```js
class LabeledCheckbox extends HTMLElement {
  constructor() {
    super();
    this._boundOnClick = this._onClick.bind(this);
    this.addEventListener("click", this._boundOnClick);

    // Attach an ElementInternals to get states property
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<style>
  :host {
    display: block;
  }
  :host::before {
    content: "[ ]";
    white-space: pre;
    font-family: monospace;
  }
  :host(:state(checked))::before {
    content: "[x]";
  }
</style>
<slot>Label</slot>
`;
  }

  get checked() {
    return this._internals.states.has("checked");
  }

  set checked(flag) {
    if (flag) {
      this._internals.states.add("checked");
    } else {
      this._internals.states.delete("checked");
    }
  }

  _onClick(event) {
    // Toggle the 'checked' property when the element is clicked
    this.checked = !this.checked;
  }

  static isStateSyntaxSupported() {
    return CSS.supports("selector(:state(checked))");
  }
}

customElements.define("labeled-checkbox", LabeledCheckbox);

if (!LabeledCheckbox.isStateSyntaxSupported()) {
  if (!document.getElementById("state-warning")) {
    const warning = document.createElement("div");
    warning.id = "state-warning";
    warning.style.color = "red";
    warning.textContent = "This feature is not supported by your browser.";
    document.body.insertBefore(warning, document.body.firstChild);
  }
}
```

First, we define the custom element class `QuestionBox`, which extends `HTMLElement`.
As always, the constructor first calls the `super()` method.
Next, we attach a shadow DOM tree to the custom element by calling `attachShadow()`.

```js
class QuestionBox extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<div><slot>Question</slot></div>
<labeled-checkbox part="checkbox">Yes</labeled-checkbox>
`;
  }
}
```

The content of the shadow root is set using `innerHTML`.
This defines a `<slot>` element that contains the default prompt text "Question" for the element.
We then define a `<labeled-checkbox>` custom element with the default text `"Yes"`.
This checkbox is exposed as a shadow part of the question box with the name `checkbox` using the `part` attribute.

Note that the code and styling for the `<labeled-checkbox>` element are exactly the same as in the previous example, and are therefore not repeated here.

Next, we call the `define()` method on the object returned by `Window.customElements` to register the custom element with the name `question-box`:

```js
customElements.define("question-box", QuestionBox);
```

#### Result

Click either of the checkboxes to see the color change from `red` to `green` with an outline when the `checked` state toggles.

### Non-boolean internal states

This example shows how to handle the case where the custom element has an internal property with multiple possible value.

The custom element in this case has a `state` property with allowed values: "loading", "interactive" and "complete".
To make this work, we map each value to its custom state and create code to ensure that only the identifier corresponding to the internal state is set.
You can see this in the implementation of the `set state()` method: we set the internal state, add the identifier for the matching custom state to `CustomStateSet`, and remove the identifiers associated with all the other values.

Most of the remaining code is similar to the example that demonstrates a single boolean state (we show different text for each state as the user toggles through them).

#### HTML

The HTML uses the custom element that the JavaScript below registers.
This is similar to the example that demonstrates a single boolean state, except we don't specify a value and use the default value from the slot (`<slot>Click me</slot>`).

```html
<many-state-element></many-state-element>
```

#### CSS

In the CSS we use the three custom state pseudo classes to select CSS for each of the internal state values: `:state(loading)`, `:state(interactive)`, `:state(complete)`.
Note that the custom element code ensures that only one of these custom states can be defined at a time.

```css
many-state-element:state(loading) {
  border: dotted grey;
}
many-state-element:state(interactive) {
  border: dashed blue;
}
many-state-element:state(complete) {
  border: solid green;
}
```

#### JavaScript

```js
class ManyStateElement extends HTMLElement {
  constructor() {
    super();
    this._boundOnClick = this._onClick.bind(this);
    this.addEventListener("click", this._boundOnClick);
    // Attach an ElementInternals to get states property
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    this.state = "loading";

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<style>
  :host {
    display: block;
    font-family: monospace;
  }
  :host::before {
    content: "[ unknown ]";
    white-space: pre;
  }
  :host(:state(loading))::before {
    content: "[ loading ]";
  }
  :host(:state(interactive))::before {
    content: "[ interactive ]";
  }
  :host(:state(complete))::before {
    content: "[ complete ]";
  }
</style>
<slot>Click me</slot>
`;
  }

  get state() {
    return this._state;
  }

  set state(stateName) {
    // Set internal state to passed value
    // Add identifier matching state and delete others
    if (stateName === "loading") {
      this._state = "loading";
      this._internals.states.add("loading");
      this._internals.states.delete("interactive");
      this._internals.states.delete("complete");
    } else if (stateName === "interactive") {
      this._state = "interactive";
      this._internals.states.delete("loading");
      this._internals.states.add("interactive");
      this._internals.states.delete("complete");
    } else if (stateName === "complete") {
      this._state = "complete";
      this._internals.states.delete("loading");
      this._internals.states.delete("interactive");
      this._internals.states.add("complete");
    }
  }

  _onClick(event) {
    // Cycle the state when element clicked
    if (this.state === "loading") {
      this.state = "interactive";
    } else if (this.state === "interactive") {
      this.state = "complete";
    } else if (this.state === "complete") {
      this.state = "loading";
    }
  }

  static isStateSyntaxSupported() {
    return CSS.supports("selector(:state(loading))");
  }
}

customElements.define("many-state-element", ManyStateElement);

if (!LabeledCheckbox.isStateSyntaxSupported()) {
  if (!document.getElementById("state-warning")) {
    const warning = document.createElement("div");
    warning.id = "state-warning";
    warning.style.color = "red";
    warning.textContent = "This feature is not supported by your browser.";
    document.body.insertBefore(warning, document.body.firstChild);
  }
}
```

#### Results

Click the element to see a different border being applied as the state changes.

## Compatibility with `<dashed-ident>` syntax

Previously custom elements with custom states were selected using a `<dashed-ident>` instead of the `:state()` function.
Browser versions that don't support `:state()` will throw an error when supplied with an ident that is not prefixed with the double dash.
If support for these browsers is required, either use a try...catch block to support both syntaxes, or use a `<dashed-ident>` as the state's value and select it with both the `:--my-state` and `:state(--my-state)` CSS selector.

### Using a try...catch block

This code shows how you can use `try...catch` to attempt adding a state identifier that does not use a `<dashed-ident>`, and fall back to `<dashed-ident>` if an error is thrown.

#### CSS

```css
compatible-state-element:is(:--loaded, :state(loaded)) {
  border: solid green;
}
```

#### JavaScript

```js
class CompatibleStateElement extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    // The double dash is required in browsers with the
    // legacy syntax, not supplying it will throw
    try {
      this._internals.states.add("loaded");
    } catch {
      this._internals.states.add("--loaded");
    }
  }
}
```

### Using double dash prefixed idents

An alternative solution can be to use the `<dashed-ident>` within JavaScript.
The downside to this approach is that the dashes must be included when using the CSS `:state()` syntax.

#### CSS

```css
compatible-state-element:is(:--loaded, :state(--loaded)) {
  border: solid green;
}
```

#### JavaScript

```js
class CompatibleStateElement extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
  }
  connectedCallback() {
    // The double dash is required in browsers with the
    // legacy syntax, but works with the modern syntax
    this._internals.states.add("--loaded");
  }
}
```

## See also

Using custom elements
