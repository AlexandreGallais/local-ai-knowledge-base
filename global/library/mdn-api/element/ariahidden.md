---
title: "Element: ariaHidden property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariahidden/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaHidden property

The **`ariaHidden`** property of the `Element` interface reflects the value of the `aria-hidden` attribute, which indicates whether the element is exposed to an accessibility API.

## Value

A string with one of the following values:

- `"true"`
    The element is hidden from the accessibility API.
- `"false"`
    The element is exposed to the accessibility API as if it were rendered.
- `"undefined"`
    The element's hidden state is determined by the user agent based on whether it is rendered.

## Examples

In this example the `aria-hidden` attribute on the element with an ID of `hidden` is set to "true". Using `ariaHidden` we update the value to "false".

```html
<div id="hidden" aria-hidden="true">Some things are better left unsaid.</div>
```

```js
let el = document.getElementById("hidden");
console.log(el.ariaHidden); // true
el.ariaHidden = "false";
console.log(el.ariaHidden); // false
```
