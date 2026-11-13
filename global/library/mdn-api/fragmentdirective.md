---
title: "FragmentDirective"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fragmentdirective/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FragmentDirective

The **`FragmentDirective`** interface is an object exposed to allow code to check whether or not a browser supports text fragments.

It is accessed via the `Document.fragmentDirective` property.

## Instance properties

None.

## Instance methods

None.

## Examples

### Checking if text fragments are supported

The code below logs whether or not text fragments are supported in your browser by checking that `Document.fragmentDirective` is defined.
Note that the object is empty, and at present is mainly intended for feature detection.
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

- `::target-text`
