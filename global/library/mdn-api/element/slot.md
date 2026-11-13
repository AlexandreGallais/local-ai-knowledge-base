---
title: "Element: slot property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/slot/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: slot property

The **`slot`** property of the `Element` interface returns the name of the shadow DOM slot the element is inserted in. It reflects the element's `slot` content attribute.

A slot is a placeholder inside a web component that users can fill with their own markup (see Using templates and slots for more information).

## Value

A string.

## Examples

In our simple-template example (see it live), we create a trivial custom element example called
`<my-paragraph>` in which a shadow root is attached and then populated
using the contents of a template that contains a slot named `my-text`.

When `<my-paragraph>` is used in the document, the slot is populated
by a slottable element by including it inside the element with a
`slot` attribute
with the value `my-text`. Here is one such example:

```html
<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>
```

In our JavaScript file we get a reference to the `` shown above,
then log a reference to the name of the corresponding `<slot>` element.

```js
let slottedSpan = document.querySelector("my-paragraph span");
console.log(slottedSpan.slot); // logs 'my-text'
```
