---
title: "DataTransfer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransfer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransfer

The **`DataTransfer`** object is used to hold any data transferred between contexts, such as a drag and drop operation, or clipboard read/write. It may hold one or more data items, each of one or more data types.

`DataTransfer` was primarily designed for the HTML Drag and Drop API, as the `DragEvent.dataTransfer` property, and is still specified in the HTML drag-and-drop section, but it is now also used by other APIs, such as `ClipboardEvent.clipboardData` and `InputEvent.dataTransfer`. However, other APIs only use certain parts of its interface, ignoring properties such as `dropEffect`. Documentation of `DataTransfer` will primarily discuss its usage in drag-and-drop operations, and you should refer to the other APIs' documentation for usage of `DataTransfer` in those contexts.

## Constructor

- `DataTransfer()`
    Creates and returns a new `DataTransfer` object.

## Instance properties

- `DataTransfer.dropEffect`
    Gets the type of drag-and-drop operation currently selected or sets the operation to a new type. The value must be `none`, `copy`, `link` or `move`.
- `DataTransfer.effectAllowed`
    Provides all of the types of operations that are possible. Must be one of `none`, `copy`, `copyLink`, `copyMove`, `link`, `linkMove`, `move`, `all` or `uninitialized`.
- `DataTransfer.files` (read-only)
    Contains a list of all the local files available on the data transfer. If the drag operation doesn't involve dragging files, this property is an empty list.
- `DataTransfer.items` (read-only)
    Gives a `DataTransferItemList` object which is a list of all of the drag data.
- `DataTransfer.types` (read-only)
    An array of strings giving the formats that were set in the `dragstart` event.

## Instance methods

- `DataTransfer.addElement()` (experimental) (non-standard)
    Sets the drag source for the given element. This will be the element on which `drag` and `dragend` events are fired, and not the default target (the node that was dragged). Firefox-specific.
- `DataTransfer.clearData()`
    Remove the data associated with a given type. The type argument is optional. If the type is empty or not specified, the data associated with all types is removed. If data for the specified type does not exist, or the data transfer contains no data, this method will have no effect.
- `DataTransfer.getData()`
    Retrieves the data for a given type, or an empty string if data for that type does not exist or the data transfer contains no data.
- `DataTransfer.setData()`
    Set the data for a given type. If data for the type does not exist, it is added at the end, such that the last item in the types list will be the new format. If data for the type already exists, the existing data is replaced in the same position.
- `DataTransfer.setDragImage()`
    Set the image to be used for dragging if a custom one is desired.

## Examples

Every method and property listed in this document has its own reference page and each reference page either directly includes an example of the interface or has a link to an example.

### Reading the data in a paste or drop event

In the following example, we have a `<form>` containing three different types of text inputs: a text `` element, a `<textarea>` element, and a `` element with `contenteditable` set to `true`. The user can paste or drop text into any of these elements, and the data in the `ClipboardEvent.clipboardData` or `DragEvent.dataTransfer` object will be displayed.

#### HTML

```html
<form>
  <fieldset>
    <legend>&lt;input /></legend>
    <input type="text" />
    <table class="center">
      <tbody>
        <tr>
          <th scope="row">Operation type</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Content type</th>
          <td></td>
        </tr>
      </tbody>
    </table>
  </fieldset>
  <fieldset>
    <legend>&lt;textarea /></legend>
    <textarea></textarea>
    <table class="center">
      <tbody>
        <tr>
          <th scope="row">Operation type</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Content type</th>
          <td></td>
        </tr>
      </tbody>
    </table>
  </fieldset>
  <fieldset>
    <legend>&lt;div contenteditable /></legend>
    <div contenteditable></div>
    <table class="center">
      <tbody>
        <tr>
          <th scope="row">Operation type</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Content type</th>
          <td></td>
        </tr>
      </tbody>
    </table>
  </fieldset>
  <p class="center">
    <input type="reset" />
  </p>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

#### CSS

```css
.center {
  text-align: center;
}

form > fieldset > * {
  vertical-align: top;
}
form input,
form textarea,
form [contenteditable] {
  min-width: 15rem;
  padding: 0.25rem;
}
[contenteditable] {
  appearance: textfield;
  display: inline-block;
  min-height: 1rem;
  border: 1px solid;
}

form table {
  display: inline-table;
}
table ol {
  text-align: left;
}
```

#### JavaScript

```js
const form = document.querySelector("form");

function displayData(event) {
  if (event.type === "drop") event.preventDefault();

  const cells = event.target.nextElementSibling.querySelectorAll("td");
  cells[0].textContent = event.type;
  const transfer = event.clipboardData || event.dataTransfer;
  const ol = document.createElement("ol");
  cells[1].textContent = "";
  cells[1].appendChild(ol);
  for (const item of transfer.items) {
    const li = document.createElement("li");
    li.textContent = `${item.kind} ${item.type}`;
    ol.appendChild(li);
  }
}

form.addEventListener("paste", displayData);
form.addEventListener("drop", displayData);
form.addEventListener("reset", () => {
  for (const cell of form.querySelectorAll("[contenteditable], td")) {
    cell.textContent = "";
  }
});
```

#### Result

## See also

- Drag and drop
- Drag Operations
- Working with the drag data store
