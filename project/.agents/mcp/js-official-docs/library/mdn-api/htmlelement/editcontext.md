---
title: "HTMLElement: editContext property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/editcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: editContext property

The **`editContext`** property of the `HTMLElement` interface gets and sets an element's associated `EditContext` object.

The `EditContext API` can be used to build rich text editors on the web that support advanced text input experiences, such as Input Method Editor (IME) composition, emoji picker, or any other platform-specific editing-related UI surfaces.

## Value

An `EditContext` object or `null`.

### Possible elements

Setting the `editContext` property only works on certain types of elements:

- One of these HTML elements: ``, ``, ``, `<body>`, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, ``, ``, ``, ``, ``, or ``.
- A valid custom element.
- A `<canvas>` element.

If you try to set the `editContext` property on an element that is not one of the above, a `NotSupportedError` `DOMException` is thrown.

### Element association

Setting the `editContext` property of an element to an `EditContext` instance associates that element with the `EditContext` instance.

The association is one-to-one:

- An element can only be associated to one `EditContext` instance.
- An `EditContext` instance can only be associated to one element.

If you try to associate an already associated `EditContext` instance to a different element, a `DOMException` is thrown.

If you try to associate an other `EditContext` instance to an element that's already associated, a `DOMException` is also thrown.

To check whether an element is associated with an `EditContext` instance already, use the `EditContext.attachedElements()` method.

### Garbage collection

An `EditContext` instance will keep its associated element alive if it has other live references, even if the associated element is removed from the DOM.

If you want to make sure the element is garbage collected, clear the `editContext` property of the element.

## Examples

### Setting an element's `editContext` property

This example shows how to set the `editContext` property of a `<canvas>` element to a new `EditContext` instance in order to make the element editable.

```html
<canvas id="editor-canvas"></canvas>
```

```js
const canvas = document.getElementById("editor-canvas");
const editContext = new EditContext();
canvas.editContext = editContext;
```

### Clearing an element's `editContext` property

This example shows how to clear the `editContext` property of an editable `<canvas>` element in order to safely remove the element from the DOM.

```html
<canvas id="editor-canvas"></canvas>
```

```js
// Create the EditContext and associate it with the canvas element.
const canvas = document.getElementById("editor-canvas");
const editContext = new EditContext();
canvas.editContext = editContext;

// Later, clear the editContext property, and remove the element.
canvas.editContext = null;
canvas.remove();
```

## See also

- The `EditContext` interface.
