---
title: "InputEvent: dataTransfer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/datatransfer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent: dataTransfer property

The **`dataTransfer`** read-only property of the
`InputEvent` interface returns a `DataTransfer` object
containing information about richtext or plaintext data being added to or removed from
editable content.

## Value

A `DataTransfer` object or `null`. The spec has an overview of its value in various cases.

## Examples

In the following simple example we've set up an event listener on the input event so that when any
content is pasted into the contenteditable `` element, its HTML source
is retrieved via the
`InputEvent.dataTransfer.getData()`
method and reported in the paragraph below the input.

Try copying and pasting some of the content provided to see the effects.

```html
<p><span style="font-weight: bold; color: blue">Whoa, bold blue text!</span></p>
<p>
  <span style="font-style: italic; color: red">Exciting: italic red text!</span>
</p>
<p>Boring normal text ;-(</p>

<hr />

<p contenteditable="true">
  Go on, try pasting some content into this editable paragraph and see what
  happens!
</p>

<p class="result"></p>
```

```js
const editable = document.querySelector("p[contenteditable]");
const result = document.querySelector(".result");

editable.addEventListener("input", (e) => {
  result.textContent = e.dataTransfer.getData("text/html");
});
```
