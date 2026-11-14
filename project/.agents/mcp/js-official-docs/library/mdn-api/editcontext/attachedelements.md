---
title: "EditContext: attachedElements() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/attachedelements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: attachedElements() method

The **`attachedElements()`** method of the `EditContext` interface returns an `Array` that contains only one item. This item is the element that's associated with the `EditContext` object.

## Syntax

```js
attachedElements()
```

### Parameters

None.

### Return value

An `Array` containing one `HTMLElement` object.

There can only be one element associated to an `EditContext` instance, so the returned array will always contain one element. If the API is extended in the future to support multiple associated elements, the return value will be an array containing multiple elements.

## Examples

### Getting the element associated with an `EditContext` instance

This example shows how to use the `attachedElements` method to get the element that's associated with an `EditContext` instance.

```html
<canvas id="editor-canvas"></canvas>
```

```js
const canvas = document.getElementById("editor-canvas");
const editContext = new EditContext();
canvas.editContext = editContext;

const attachedElements = editContext.attachedElements();
console.log(attachedElements[0] === canvas); // true
```

## See also

- The `EditContext` interface it belongs to.
