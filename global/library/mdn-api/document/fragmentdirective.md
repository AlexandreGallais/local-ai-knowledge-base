---
title: "Document: fragmentDirective property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/fragmentdirective/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: fragmentDirective property

The **`fragmentDirective`** read-only property of the `Document` interface returns the `FragmentDirective` for the current document.

## Value

A `FragmentDirective` object.

## Examples

### Checking if text fragments are supported

The code below logs whether or not text fragments are supported in your browser by checking for existence of the object.
Note that the object is empty, and at present it is mainly intended for feature detection.
In the future, it might include other information.

```html
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
```

```css
#log {
  height: 20px;
}
```

```js
if (document.fragmentDirective) {
  log("Your browser supports text fragments.");
} else {
  log("Text fragments are not supported in your browser.");
}
```

## See also

- Text fragments
- `::target-text`
