---
title: "InputEvent: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent: data property

The **`data`** read-only property of the
`InputEvent` interface returns a string with inserted
characters. This may be an empty string if the change doesn't insert text, such as when
characters are deleted.

## Value

A string or `null`. The spec has an overview of its value in various cases.

## Examples

In the following example, an event listener receives the input event. Any textual change
to the `` element is retrieved by `InputEvent.data` and
inserted into a paragraph using the
`Node.textContent`
property.

```html
<p>Some text to copy and paste.</p>

<input type="text" />

<p class="result"></p>
```

```js
const editable = document.querySelector("input");
const result = document.querySelector(".result");

editable.addEventListener("input", (e) => {
  result.textContent = `Inputted text: ${e.data}`;
});
```
