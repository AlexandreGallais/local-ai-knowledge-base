---
title: "Element: ariaPlaceholder property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaplaceholder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaPlaceholder property

The **`ariaPlaceholder`** property of the `Element` interface reflects the value of the `aria-placeholder` attribute, which defines a short hint intended to aid the user with data entry when the control has no value.

> **Note:**
> Where possible use an HTML `` element with `type="text"` or a `<textarea>` as these have built-in semantics and do not require ARIA attributes.

## Value

A string.

## Examples

In this example the `aria-placeholder` attribute on the element with an ID of `txtBoxInput` has been set to a string. Using `ariaPlaceholder` we update the string to another value.

```html
<div id="txtboxLabel">Enter your five-digit zip code</div>
<div
  role="textbox"
  id="txtBoxInput"
  contenteditable="true"
  aria-placeholder="5-digit zip code"
  aria-labelledby="txtboxLabel"></div>
```

```js
let el = document.getElementById("txtBoxInput");
console.log(el.ariaPlaceholder); // "5-digit zip code"
el.ariaPlaceholder = "12345";
console.log(el.ariaPlaceholder); // "12345"
```

## See also

- ARIA: textbox role
