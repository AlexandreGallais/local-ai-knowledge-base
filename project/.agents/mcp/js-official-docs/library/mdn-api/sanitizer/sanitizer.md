---
title: "Sanitizer: Sanitizer() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/sanitizer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: Sanitizer() constructor

The **`Sanitizer()`** constructor creates a new `Sanitizer` object, which can be used to filter unwanted elements and attributes from HTML or documents before they are inserted/parsed into the DOM.

## Syntax

```js
new Sanitizer()
new Sanitizer(configuration)
```

### Parameters

- `configuration` (optional)
    A `SanitizerConfig` defining a valid configuration, or the string `"default"` to indicate the default sanitizer configuration.
    The "empty configuration" (`{}`) can also be passed, and results in a remove configuration with empty arrays.

    If omitted, the constructor returns a `Sanitizer` with the default configuration.

### Returns

An instance of the `Sanitizer` object.

### Exceptions

- `TypeError`
    The `configuration` parameter is passed one of the following:
    - a `SanitizerConfig` that isn't a valid configuration.
      For example, a configuration that includes both "allowed" and "removed" configuration settings.
    - a string that does not have the value `"default"`.

## Description

The constructor creates a new `Sanitizer` object, which can be used to filter unwanted elements and attributes from HTML or documents before they are inserted/parsed into the DOM.

The default sanitizer configuration is an allow sanitizer that omits XSS-unsafe elements and attributes, along with other elements and attributes that can potentially be used in other attacks, such as clickjacking and spoofing.
This configuration is suitable for the majority of sanitization use cases.
It is created if `"default"` or no object is passed to the constructor.

The constructor can be passed a `SanitizerConfig` with a valid configuration to customize the sanitizer behavior.

A valid configuration can specify either `elements` or `removeElements` arrays (but not both) and either the `attributes` or `removeAttributes` arrays (but not both).
In most cases it does not matter which of these arrays you use because, for example, the `allowAttribute()` method can implement the same behavior by adding the attribute to the `attributes` array or by removing it from the `removeAttributes` array.
The main thing to note is that if you have a configuration with `removeElements` then you cannot have per-element attributes, as these must be defined on the `elements` array.

## Examples

### Creating the default sanitizer

This example shows how you can create the default `Sanitizer` and logs the resulting configuration object.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 400px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

The code first tests whether the `Sanitizer` interface is supported.
It then creates the default `Sanitizer`, passing no options, and then gets and logs the configuration.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
```

```js
if ("Sanitizer" in window) {
```

```js
// Create default sanitizer
const sanitizer = new Sanitizer();

// Get and log the (default) configuration
const defaultConfig = sanitizer.get();
log(JSON.stringify(defaultConfig, null, 2));
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

#### Results

The output is logged below.
Note that the default configuration is an allow configuration, having both `elements` and `attributes` arrays that contain the elements that are allowed when the sanitizer is used.

### Creating a `Sanitizer` and using it with `setHTML()`

This example shows how you might create and use a custom sanitizer in a safe HTML DOM insertion method.

#### HTML

Here we define two `<pre>` elements in which we'll display both the sanitized and unsanitized HTML.

```html
<pre id="unmodified"></pre>
<pre id="setHTML"></pre>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 430px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
```

The following code tests whether the `Sanitizer` interface is supported.
It then defines a string of "unsafe HTML", which contains bot safe elements, such as `` and ``, and XSS-unsafe elements such as `<script>`

We then create a `Sanitizer` object with a `SanitizerConfig` that allows the HTML elements: ``, ``, ``, and `<script>`.
The sanitizer is used with the unsafe string in `Element.setHTML()`.
Both the original and sanitized strings are displayed as text nodes.

```js
if ("Sanitizer" in window) {
```

```js
// Define unsafe string of HTML
const unsafeHTMLString = `
  <div>
    <p>This is a paragraph. <span onclick="alert('You clicked the span!')">Click me</span></p>
    <script src="path/to/amodule.js" type="module"
  </div>
`;

// Set unsafe string as a text node of first element
const unmodifiedElement = document.querySelector("#unmodified");
unmodifiedElement.innerText = unsafeHTMLString;

// Create sanitizer using a SanitizerConfig that allows script (and other elements)
const sanitizer = new Sanitizer({ elements: ["div", "p", "span", "script"] });

// Use the sanitizer to set the HTML of the second element using the safe method
const setHTMLElement = document.querySelector("#setHTML");
setHTMLElement.setHTML(unsafeHTMLString, { sanitizer });

// Get that HTML and set it back to the element as a text node
// (so we can see the elements)
setHTMLElement.innerText = setHTMLElement.innerHTML;

// Log the configuration
const sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

#### Results

The original string and sanitized HTML that was parsed into the DOM are shown below.
Note that even though the sanitizer allows `<script>` elements, these are stripped out of the injected HTML when using `Element.setHTML()`.
Also note that the configuration includes both the names of the elements and their namespaces.
