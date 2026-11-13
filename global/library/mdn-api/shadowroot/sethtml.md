---
title: "ShadowRoot: setHTML() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/sethtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: setHTML() method

The **`setHTML()`** method of the `ShadowRoot` interface provides an XSS-safe method to parse and sanitize a string of HTML, which then replaces the existing tree in the Shadow DOM.

The method removes any elements and attributes that are considered XSS-unsafe, even if allowed by a passed sanitizer.
Notably, the following elements are always removed: `<script>`, `<frame>`, ``, ``, `<object>`, `<use>`, and event handler attributes.

It is recommended (if supported) as a drop-in replacement for `ShadowRoot.innerHTML` when setting a user-provided string of HTML.

## Syntax

```js
setHTML(input)
setHTML(input, options)
```

### Parameters

- `input`
    A string defining HTML to be sanitized and injected into the shadow root.
- `options` (optional)
    An options object with the following optional parameters:
    - `sanitizer`
        A `Sanitizer` or `SanitizerConfig` object which defines what elements of the input will be allowed or removed, or the string `"default"` for the default sanitizer configuration.
        The method will remove any XSS-unsafe elements and attributes, even if allowed by the sanitizer.
        If not specified, the default `Sanitizer` configuration is used.

        Note that if you're using the same configuration multiple times, it's expected to be more efficient to use a `Sanitizer` and modify it when you need to.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    This is thrown if `options.sanitizer` is passed a:
    - `SanitizerConfig` that isn't valid.
      For example, a configuration that includes both "allowed" and "removed" configuration settings.
    - string that does not have the value `"default"`.
    - value that is not a `Sanitizer`, `SanitizerConfig`, or string.

## Description

The **`setHTML()`** method provides an XSS-safe method to parse and sanitize a string of HTML and use it to replace the existing tree in the Shadow DOM.

`setHTML()` removes any HTML entities that aren't allowed by the sanitizer configuration, and further removes any XSS-unsafe elements or attributes — whether or not they are allowed by the sanitizer configuration.

If no sanitizer is specified in the `options.sanitizer` parameter, `setHTML()` is used with the default sanitizer configuration.
This configuration is suitable for the majority of use cases as it prevents XSS attacks, as well as other attacks like clickjacking or spoofing.

A custom `Sanitizer` or `SanitizerConfig` can be specified to choose which elements, attributes, and comments are allowed or removed.
Note that even if unsafe options are allowed by the sanitizer, they will still be removed when using this method (it removes the same elements as a sanitizer on which `Sanitizer.removeUnsafe()` has been called).

`setHTML()` should be used instead of `ShadowRoot.innerHTML` for inserting untrusted strings of HTML into the shadow DOM.
It should also be used instead of `ShadowRoot.setHTMLUnsafe()`, unless there is a specific need to allow unsafe elements and attributes.

Note that since this method always sanitizes input strings of XSS-unsafe entities, it is not secured or validated using the Trusted Types API.

## Examples

### Basic usage

This example shows some of the ways you can use `setHTML()` to sanitize and inject a string of HTML.

First we will create the `ShadowRoot` we want to target.
This could be created programmatically using `Element.attachShadow()` but for this example we'll create the root declaratively.

```html
<div id="host">
  <template shadowrootmode="open">
    <span>A span element in the shadow DOM</span>
  </template>
</div>
```

We can get a handle to the shadow root from the `#host` element like this:

```js
const shadow = document.querySelector("#host").shadowRoot;
```

The code below shows how we can call `setHTML()` with a string and different sanitizers in order to filter and inject the HTML into the shadow root.

```js
// Define unsanitized string of HTML
const unsanitizedString = "abc <script>alert(1)<" + "/script> def";

// setHTML() with default sanitizer
shadow.setHTML(unsanitizedString);

// Define custom Sanitizer and use in setHTML()
// This allows only elements: <div>, <p>, <span> (<script> is unsafe and will be removed)
const sanitizer1 = new Sanitizer({ elements: ["div", "p", "span", "script"] });
shadow.setHTML(unsanitizedString, { sanitizer: sanitizer1 });

// Define custom SanitizerConfig within setHTML()
// This removes elements <div>, <p>, <span>, <script>, and any other unsafe elements/attributes
shadow.setHTML(unsanitizedString, {
  sanitizer: { removeElements: ["div", "p", "span", "script"] },
});
```

### `setHTML()` live example

This example provides a "live" demonstration of the method when called with different sanitizers.
The code defines buttons that you can click to sanitize and inject a string of HTML using a default and a custom sanitizer, respectively.
The original string and sanitized HTML are logged so you can inspect the results in each case.

#### HTML

The HTML defines two `` elements for applying different sanitizers, another button to reset the example, and a `` that contains the declarative shadow root.

```html
<button id="buttonDefault" type="button">Default</button>
<button id="buttonAllowScript" type="button">allowScript</button>
<button id="reload" type="button">Reload</button>

<div id="host">
  <template shadowrootmode="open">
    <span>I am in the shadow DOM </span>
  </template>
</div>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 320px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
  margin: 5px;
}
```

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent += text;
}
```

```js
if ("Sanitizer" in window) {
```

First we define the handler for the reload button.

```js
const reload = document.querySelector("#reload");
reload.addEventListener("click", () => document.location.reload());
```

Then we define the string to sanitize, which will be the same for all cases.
This contains the `<script>` element and the `onclick` handler, both of which are considered XSS-unsafe.
We also get variable `shadow`, which is our handle to the shadow root.

```js
// Define unsafe string of HTML
const unsanitizedString = `
  <div>
    <p>Paragraph to inject into shadow DOM.
      <button onclick="alert('You clicked the button!')">Click me</button>
    </p>
    <script src="path/to/a/module.js" type="module"><\/script>
    <p data-id="123">Para with <code>data-</code> attribute</p>
  </div>
`;

const shadow = document.querySelector("#host").shadowRoot;
```

Next we define the click handler for the button that sets the shadow root with the default sanitizer.
This should strip out all unsafe entities before inserting the string of HTML.
Note that you can see exactly which elements are removed in the `Sanitizer()` constructor examples.

```js
const defaultSanitizerButton = document.querySelector("#buttonDefault");
defaultSanitizerButton.addEventListener("click", () => {
  // Set the content of the element using the default sanitizer
  shadow.setHTML(unsanitizedString);

  // Log HTML before sanitization and after being injected
  logElement.textContent =
    "Default sanitizer: remove script element, onclick attribute, data- attribute\n\n";
  log(`\nunsanitized: ${unsanitizedString}`);
  log(`\n\nsanitized: ${shadow.innerHTML}`);
});
```

The next click handler sets the target HTML using a custom sanitizer that allows only ``, ``, and `<script>` elements.
Note that because we're using the `setHTML` method, `<script>` will also be removed!

```js
const allowScriptButton = document.querySelector("#buttonAllowScript");
allowScriptButton.addEventListener("click", () => {
  // Set the content of the element using a custom sanitizer
  const sanitizer1 = new Sanitizer({
    elements: ["div", "p", "script"],
  });
  shadow.setHTML(unsanitizedString, { sanitizer: sanitizer1 });

  // Log HTML before sanitization and after being injected
  logElement.textContent =
    "Sanitizer: {elements: ['div', 'p', 'script']}\n Script removed even though allowed\n";
  log(`\nunsanitized: ${unsanitizedString}`);
  log(`\n\nsanitized: ${shadow.innerHTML}`);
});
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
  // Provide fallback or alternative behavior
}
```

#### Results

Click the "Default" and "allowScript" buttons to see the effects of the default and custom sanitizer, respectively.

Note that because we are using a safe sanitization method, in both cases the `<script>` element and `onclick` handler are removed, even if explicitly allowed by the sanitizer.
However while the `data-` attribute is removed with the default sanitizer, it is allowed when we pass a sanitizer.

## See also

- `ShadowRoot.setHTMLUnsafe()`
- `Element.setHTML()` and `Element.setHTMLUnsafe()`
- `Document.parseHTML()` and `Document.parseHTMLUnsafe()`
- HTML Sanitizer API
