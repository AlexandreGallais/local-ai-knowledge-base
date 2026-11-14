---
title: "Element: ariaMultiLine property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariamultiline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaMultiLine property

The **`ariaMultiLine`** property of the `Element` interface reflects the value of the `aria-multiline` attribute, which indicates whether a text box accepts multiple lines of input or only a single line.

> **Note:**
> Where possible use an HTML `` element with `type="text"` or a `<textarea>` as these have built-in semantics and do not require ARIA attributes.

## Value

A string with one of the following values:

- `"true"`
    This is a multi-line text box.
- `"false"`
    This is a single-line text box.

## Examples

In this example the `aria-multiline` attribute on the element with an ID of `txtBoxInput` is set to "true" indicating that this box allows for multiple lines of input. Using `ariaMultiLine` we update the value to "false".

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
console.log(el.ariaMultiLine); // "true"
el.ariaMultiLine = "false";
console.log(el.ariaMultiLine); // "false"
```

## See also

- ARIA: textbox role
