---
title: "Element: ariaRequired property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariarequired/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaRequired property

The **`ariaRequired`** property of the `Element` interface reflects the value of the `aria-required` attribute, which indicates that user input is required on the element before a form may be submitted.

> **Note:**
> Where possible use an HTML `` element with `type="text"` or a `<textarea>` as these have built-in semantics and do not require ARIA attributes.

## Value

A string with one of the following values:

- `"true"`
    Users need to provide input on an element before a form is submitted.
- `"false"`
    User input is not necessary to submit the form.

## Examples

In this example the `aria-required` attribute on the element with an ID of `txtBoxInput` is set to "true" indicating that this input must be completed. Using `ariaRequired` we update the value to "false".

```html
<div id="txtboxMultilineLabel">Enter the tags for the article</div>
<div
  role="textbox"
  id="txtBoxInput"
  contenteditable="true"
  aria-multiline="true"
  aria-labelledby="txtboxMultilineLabel"
  aria-required="true"></div>
```

```js
let el = document.getElementById("txtBoxInput");
console.log(el.ariaRequired); // "true"
el.ariaRequired = "false";
console.log(el.ariaRequired); // "false"
```

## See also

- ARIA: textbox role
