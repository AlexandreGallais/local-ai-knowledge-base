---
title: "Drag operations (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_drag_and_drop_api/drag_operations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Drag operations (part 2 of 2)

## Drop feedback

Now the user is dragging into a valid drop target. There are several ways in which you can indicate to the user that a drop is allowed at this location, and what might happen if the drop happens. Usually, the mouse pointer will update as necessary depending on the value of the `dropEffect` property. Although the exact appearance depends on the user's platform, typically a plus sign icon will appear for a `copy` for example, and a "cannot drop here" icon will appear when a drop is not allowed. This mouse pointer feedback is sufficient in many cases.

### Drop effects

When dropping, there are several operations that may be performed:

- `copy`
    The data will be simultaneously present at the source and target locations after dropping.
- `move`
    The data will only be present at the target location, and will be removed from the source location.
- `link`
    Some form of linking will be created between the source and drop locations; there is only one instance of the data at the source location.
- `none`
    Nothing happens; the drop failed.

With the `dragenter` and `dragover` events, the `dropEffect` property is initialized to the effect that the user is requesting. The user can modify the desired effect by pressing modifier keys. Although the exact keys used vary by platform, typically the `Shift` and `Control` keys would be used to switch between copying, moving, and linking. The mouse pointer will change to indicate which operation is desired. For instance, for a `copy`, the cursor might appear with a plus sign next to it.

You can modify the `dropEffect` property during the `dragenter` or `dragover` events, if for example, a particular drop target only supports certain operations. You can modify the `dropEffect` property to override the user effect, and enforce a specific drop operation to occur.

```js
target.addEventListener("dragover", (event) => {
  event.dataTransfer.dropEffect = "move";
});
```

In this example, move is the effect that is performed.

You can use the value `none` to indicate that no drop is allowed at this location. You should usually do this if the element is only temporarily not accepting drops; if it's not intended to be a drop target, you should just not cancel the event.

Note that setting `dropEffect` only indicates the desired effect _at this particular instant_; a later `dragover` dispatch may change it. To persist the choice, you must set it in every `dragover` event. Also, this effect is only _informational_, and what effects ends up being implemented depends on both the source and the target nodes (for example, if the source node cannot be modified, then even if a "move" effect is requested, it may not be possible).

For both user gestures and programmatically setting `dropEffect`, by default, all three drop effects are available. The draggable element can restrict itself to only allow certain effects by setting the `effectAllowed` property within a `dragstart` event listener.

```js
draggableElement.addEventListener("dragstart", (event) => {
  event.dataTransfer.effectAllowed = "copyLink";
});
```

In this example, only a copy or link operation is allowed, but a move operation is not possible to be selected either via script or via user gestures.

The values of `effectAllowed` are combinations of `dropEffect`:

| Value           | Description                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`          | No operation is permitted                                                                                                                    |
| `copy`          | `copy` only                                                                                                                                  |
| `move`          | `move` only                                                                                                                                  |
| `link`          | `link` only                                                                                                                                  |
| `copyMove`      | `copy` or `move` only                                                                                                                        |
| `copyLink`      | `copy` or `link` only                                                                                                                        |
| `linkMove`      | `link` or `move` only                                                                                                                        |
| `all`           | `copy`, `move`, or `link`                                                                                                                    |
| `uninitialized` | The default value when the effect has not been set; generally equivalent to `all`, except the default `dropEffect` may not always be `copy`. |

By default, the `dropEffect` is initialized based on `effectAllowed`, in the order of `copy`, `link`, `move`, selecting the first one that is allowed. The unselected but allowed effects may also be selected as default if appropriate; for example, on Windows, holding the `Alt` key <example-value> `link` to be used in priority. If `effectAllowed` is `uninitialized` and the dragged element is an `` link, the default `dropEffect` is `link`; if `effectAllowed` is `uninitialized` and the dragged element is a selection from an editable text field, the default `dropEffect` is `move`.

```html
<div class="sources-container">
  These are the sources with different <code>allowedEffect</code>
  <div id="sources"></div>
</div>
<div class="targets-container">
  These are the targets with different <code>dropEffect</code>
  <div id="targets"></div>
</div>
```

```css
.sources-container,
.targets-container {
  width: calc(100% - 2rem);
  border: 2px dashed gray;
  padding: 0.5rem;
  margin: 1rem 0;
}

#sources,
#targets {
  display: grid;
  gap: 0.5rem;
  width: 100%;
}

#sources {
  grid-template-columns: 1fr 1fr 1fr;
}

#targets {
  grid-template-columns: 1fr 1fr;
}

#sources div,
#targets div {
  border: 2px solid black;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

#sources div {
  height: 50px;
}

#targets div {
  height: 75px;
}
```

```js
for (const allowedEffect of [
  "none",
  "copy",
  "move",
  "link",
  "copyMove",
  "copyLink",
  "linkMove",
  "all",
  "uninitialized",
]) {
  const div = document.createElement("div");
  div.textContent = allowedEffect;
  div.draggable = true;
  div.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = allowedEffect;
  });
  document.getElementById("sources").appendChild(div);
}

for (const dropEffect of ["none", "copy", "move", "link"]) {
  const div = document.createElement("div");
  div.textContent = dropEffect;
  div.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = dropEffect;
  });
  document.getElementById("targets").appendChild(div);
}
```

### Custom drop feedback

For more complex visual effects, you can perform other operations during the `dragenter` event, for example, by inserting an element at the location where the drop will occur. This might be an insertion marker or an element that represents the dragged element in its new location. To do this, you could create an `` element and insert it into the document during the `dragenter` event.

The `dragover` event will fire at the element the mouse is pointing at. Naturally, you may need to move the insertion marker around inside the `dragover` event handler as well. You can use the event's `clientX` and `clientY` properties as with other mouse events to determine the location of the mouse pointer.

Finally, the `dragleave` event will fire at an element when the drag leaves the element. This is the time when you should remove any insertion markers or highlighting. You do not need to cancel this event. The `dragleave` event will always fire, even if the drag is canceled, so you can always ensure that any insertion point cleanup can be done during this event.

For a practical example of using these events, see our Kanban board example.

## Performing a drop

When the user releases the mouse, the drag and drop operation ends.

In order for the drop to be _potentially successful_, the drop must happen over a valid drop target, and the `dropEffect` must not be `none` at the time of mouse release. Otherwise, the drop operation is considered failed.

If the drop is potentially successful, a `drop` event is fired on the drop target. You need to cancel this event using `preventDefault()` in order for the drop to be considered actually successful. Otherwise, the drop is also considered successful if the drop was dropping text (the data contains a `text/plain` item) into an editable text field. In this case, the text is inserted into the field (either at the cursor position or at the end, depending on platform conventions) and, if the `dropEffect` is `move` while the source is a selection within an editable region, the source is removed. Otherwise, for all other drag data and drop targets, the drop is considered failed.

During the `drop` event, you should retrieve the desired data from the drag data store using `DataTransfer.getData()`, and insert it at the drop location. You can use the `dropEffect` property to determine which drag operation was desired. The `drop` event is the only time when you can read the drag data store, other than `dragstart`.

```js
target.addEventListener("drop", (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  target.textContent = data;
});
```

In the example here, once the data has been retrieved, we insert the string as the textual content of the target. This has the effect of inserting the dragged text where it was dropped, assuming that the drop target is an area of text such as a `p` or `div` element.

The `getData()` method returns an empty string if the data store does not contain data of the specified type. If you implemented conditional drop targets, this situation should not occur, because the drop target should only accept drops when the desired data is present.

You can retrieve other types of data as well. If the data is a link, it should have the type `text/uri-list`. You could then insert a link into the content.

```js
target.addEventListener("drop", (event) => {
  event.preventDefault();
  const lines = event.dataTransfer.getData("text/uri-list").split("\r\n");
  lines
    .filter((line) => !line.startsWith("#"))
    .forEach((line) => {
      const link = document.createElement("a");
      link.href = line;
      link.textContent = line;
      target.appendChild(link);
    });
});
```

For more information about how to read drag data, see Working with the drag data store.

It is also the source and the target elements' responsibility to collaborate to implement the `dropEffect`—the source listens for the `dragend` event and the target listens for the `drop` event. For example, if the `dropEffect` is `move`, then one of these elements must remove the dragged item from its old location (usually the source element itself, because the target element doesn't necessarily know or have control over the source).

## A failed drop

The drag-and-drop operation is considered failed if one of the following is true:

1. The user pressed the `Escape` key
2. The drop happened outside of a valid drop target
3. The drop effect was `none` at the time of mouse release
4. The `drop` event was not canceled and the drop was not dropping text (containing a `text/plain` data) into an editable text field (see performing a drop)

For cases 1 and 3, if the abortion happens while hovering over a valid drop target, the drop target receives a `dragleave` event, as if the drop no longer happens over it, so that it can clean up any drop feedback. In all cases, the `dropEffect` is set to `none` for subsequent events.

Afterwards, a `dragend` event is fired at the source node. The browser may display an animation of the dragged selection going back to the source of the drag-and-drop operation.

## Finishing the drag

Once the drag is complete, a `dragend` event is fired at the source of the drag (the same element that received the `dragstart` event). This event will fire regardless of whether the drag succeeded.

If the `dropEffect` property has the value `none` during a `dragend`, then the drag was canceled. Otherwise, the effect specifies which operation was performed. The source can use this information after a `move` operation to remove the dragged item from the old location.

A drop can occur inside the same window or over another application. The `dragend` event will always fire regardless. The event's `screenX` and `screenY` properties will be set to the screen coordinates where the drop occurred.

After the `dragend` event has finished propagating, the drag and drop operation is complete.

## See also

- HTML Drag and Drop API (Overview)
- Working with the drag data store
