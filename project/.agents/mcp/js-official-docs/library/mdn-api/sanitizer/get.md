---
title: "Sanitizer: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: get() method

The **`get()`** method of the `Sanitizer` interface returns a `SanitizerConfig` dictionary instance that represents the current `Sanitizer` configuration.

This may be used to create a sanitizer that is slightly modified from the default; by first getting and then modifying the default `Sanitizer` configuration, and then using it to construct a new `Sanitizer`.

The returned configuration can also be used to inspect the configuration, and can be passed directly the HTML parsing functions.
Note however that it will be more efficient to pass a `Sanitizer` rather than a configuration dictionary, particularly where the `Sanitizer` is to be used multiple times.

## Syntax

```js
get()
```

### Parameters

None

### Return value

A `SanitizerConfig`.

## Examples

### Getting a configuration

This example shows how you might create a new sanitizer and get its configuration.

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

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
```

#### JavaScript

The following code tests whether the `Sanitizer` interface is supported, and if so creates a new `Sanitizer` object using a simple `SanitizerConfig` that allows the HTML elements: ``, ``, ``, `<script>`.
It then gets and logs the configuration.

```js
if ("Sanitizer" in window) {
```

```js
// Create sanitizer using SanitizerConfig
const sanitizer = new Sanitizer({ elements: ["div", "p", "span", "script"] });

// Get current configuration
const sanitizerConfig = sanitizer.get();

log(JSON.stringify(sanitizerConfig, null, 2));
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

#### Results

The output is logged below.
Note that the same elements set when constructing the sanitizer are returned, but the new elements also have a namespace.
Note also here that comments and data attributes will be allowed.

### Getting the default sanitizer

This example shows how you can get the configuration for the default `Sanitizer`.
This might then be modified and used to create a new `Sanitizer` that meets your specific needs.

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

The following code tests whether the `Sanitizer` interface is supported.
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

// Get default configuration
const defaultConfig = sanitizer.get();

log(JSON.stringify(defaultConfig, null, 2));
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

#### Results

The default sanitizer configuration is logged below.
Note that the default configuration is quite big, allowing many elements and attributes.
