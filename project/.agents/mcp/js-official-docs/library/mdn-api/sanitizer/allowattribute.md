---
title: "Sanitizer: allowAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/allowattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: allowAttribute() method

The **`allowAttribute()`** method of the `Sanitizer` interface sets an attribute to be allowed on all elements when the sanitizer is used.

The method can be used with either an allow configuration or a remove configuration.
If used with an allow configuration, the specified attribute is added to the `attributes` array.
If used with a remove configuration, the attribute is removed from the `removeAttributes` array (if present).

Note that to allow/disallow attributes only on specific elements use `Sanitizer.allowElement()`.

## Syntax

```js
allowAttribute(attribute)
```

### Parameters

- `attribute`
    A string indicating the name of the attribute to be allowed globally on elements, or an object with the following properties:
    - `name`
        A string containing the name of the attribute.
    - `namespace` (optional)
        A string containing the namespace of the attribute, which defaults to `null`.

### Return value

`true` if the operation changed the configuration to allow the attribute, and `false` if the configuration already allowed the attribute.

Note that `false` might be returned if the internal configuration:

- defines an `attributes` array and the attribute is already present (it does not need to be added again)
- instead defines the `removeAttributes` array and the specified attribute is not present (and is hence already allowed)
- `dataAttributes` is set `true`, but a `data-*` attribute is passed.

## Examples

### How to allow specific attributes on elements

This example shows how `allowAttribute()` is used to specify that an attribute is allowed on elements.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 420px;
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

The code first creates a new `Sanitizer` object that initially allows no attributes.
We then call `allowAttribute()` with the attributes `title` and `mathcolor`.

```js
if ("Sanitizer" in window) {
```

```js
// Create an allow sanitizer
const sanitizer = new Sanitizer({
  attributes: [],
});

// Allow the "title" attribute
sanitizer.allowAttribute("title");
// Allow the "mathcolor" attribute
sanitizer.allowAttribute("mathcolor");

// Log the sanitizer configuration
let sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
```

```js
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
```

#### Results

The final configuration is logged below.
Note how both attributes are now added to the `attributes` list (other attributes will not be allowed on elements when the sanitizer is used).
