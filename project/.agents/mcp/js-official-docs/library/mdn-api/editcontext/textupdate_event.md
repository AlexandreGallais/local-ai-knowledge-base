---
title: "EditContext: textupdate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/textupdate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: textupdate event

The `textupdate` event of the `EditContext` interface fires when the user has made changes to the text or selection of an editable region that's attached to an `EditContext` instance.

This event makes it possible to render the updated text and selection in the UI, in response to user input.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("textupdate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontextupdate = (event) => { }
```

## Event type

A `TextUpdateEvent`. Inherits from `Event`.

## Examples

### Rendering the updated text on `textupdate`

In the following example, the `textupdate` event of the EditContext API is used to render the text a user enters in an editable `<canvas>` element.

```html
<canvas id="editor-canvas"></canvas>
```

```js
const canvas = document.getElementById("editor-canvas");
const ctx = canvas.getContext("2d");
const editContext = new EditContext();
canvas.editContext = editContext;

editContext.addEventListener("textupdate", (e) => {
  // When the user has focus on the <canvas> and enters text,
  // this event is fired, and we use it to re-render the text.
  console.log(
    `The user entered the text: ${e.text} at ${e.updateRangeStart}. Re-rendering the full EditContext text`,
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(editContext.text, 10, 10);
});
```
