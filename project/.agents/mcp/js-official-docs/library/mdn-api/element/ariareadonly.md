---
title: "Element: ariaReadOnly property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariareadonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaReadOnly property

The **`ariaReadOnly`** property of the `Element` interface reflects the value of the `aria-readonly` attribute, which indicates that the element is not editable, but is otherwise operable.

> **Note:**
> Where possible use an HTML `` element with `type="text"` or a `<textarea>` as these have built-in semantics and do not require ARIA attributes.

## Value

A string with one of the following values:

- `"true"`
    The user cannot change the value of the element.
- `"false"`
    The user can set the value of the element.

## Examples

In this example the `aria-readonly` attribute on the element with an ID of `txtBoxInput` is set to "true" indicating that this input is currently read only. Using `ariaReadOnly` we update the value to "false".

```html
<div id="txtboxMultilineLabel">Enter the tags for the article</div>
<div
  role="textbox"
  id="txtBoxInput"
  contenteditable="true"
  aria-multiline="true"
  aria-labelledby="txtboxMultilineLabel"
  aria-readonly="true"></div>
```

```js
let el = document.getElementById("txtBoxInput");
console.log(el.ariaReadOnly); // "true"
el.ariaReadOnly = "false";
console.log(el.ariaReadOnly); // "false"
```

## See also

- ARIA: textbox role
