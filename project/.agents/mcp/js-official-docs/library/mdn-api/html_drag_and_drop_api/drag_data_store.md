---
title: "Working with the drag data store (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_drag_and_drop_api/drag_data_store/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Working with the drag data store

The `DragEvent` interface has a `dataTransfer` property, which is a `DataTransfer` object. `DataTransfer` objects represent the main context of the drag operation, and it stays consistent across the firing of different events. It includes the drag data, drag image, drop effect, etc. This article focuses on the _data store_ part of the `dataTransfer`.

## Structure of the drag data store

Fundamentally, the drag data store is a list of items, represented as a `DataTransferItemList` of `DataTransferItem` objects. Each item can be one of two kinds:

- `string`: its payload is a string, retrievable with `getAsString()`.
- `file`: its payload is a file object, retrievable with `getAsFile()` (or `getAsFileSystemHandle()` or `webkitGetAsEntry()`, if more complex file system operations are needed).

Furthermore the item is also identified by a type, which by convention is in the form of a MIME type. This type can instruct the consumer about how the payload should be parsed or decoded. For all text items, the list can only have one item of each type, so the list, in effect, contains two disjoint collections: a list of files with potentially duplicate types, and a `Map` of text items keyed by their type. Generally, the files list represents multiple files being dragged. The text map _does not_ represent multiple resources being transferred, but the same resource encoded in different ways, so that the receiving end can choose the most appropriate supported interpretation. The text items are intended to be sorted in descending order of preference.

This list is accessible via the `DataTransfer.items` property.

The HTML Drag and Drop API went through multiple iterations, resulting in two coexisting ways to manage the data store. Before the `DataTransferItemList` and `DataTransferItem` interfaces, the "old way" used the following properties on `DataTransfer`:

- `types`: contains the `type` properties of the _text items_ in the list, plus the value `"files"` if there are any _file items_.
- `setData()`, `getData()`, `clearData()`: provide access to the _text items_ in the list using the "type-to-payload mapping" model.
- `files`: provides access to the _file items_ in the list as a `FileList`.

You may see that the types of the _file items_ are not directly exposed. They are still accessible, but only via the `type` property of each `File` object in the `files` list, so if you can't read the files, then you can't know their types either (see reading the drag data store for when the store is readable).

To get the files and their types, we recommend using the `items` property because it provides a more flexible and consistent interface. For text items, you should also prefer using the `items` property for consistency, although the `getData()` method is more convenient for accessing or removing a specific type.

Another key <example-value> between the `DataTransfer` and `DataTransferItem` interfaces is that the former uses the synchronous `getData()` method to access the text payload, but the latter instead uses the asynchronous `getAsString()` method.

## Modifying the drag data store

For the default-draggable items such as images, links, and selections, the drag data is already defined by the browser; for custom draggable elements defined using the `draggable` attribute, you must define the drag data yourself. The only time to make any modifications to the data store is within the `dragstart` handler—for the `dataTransfer` of any other drag event, the data store is unmodifiable.

To add text data to the drag data store, the "new way" uses the `DataTransferItemList.add()` method, while the "old way" uses the `DataTransfer.setData()` method.

```js
function dragstartHandler(ev) {
  // New way: add(data, type)
  ev.dataTransfer.items.add(ev.target.innerText, "text/plain");
  // Old way: setData(type, data)
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
}

const p1 = document.getElementById("p1");
p1.addEventListener("dragstart", dragstartHandler);
```

For both methods, if they are called when the data store is unmodifiable, nothing happens. If a text item with the same type already exists, `add()` throws an error while `setData()` overwrites the existing item.

To add file data to the drag data store, the "new way" still uses the `DataTransferItemList.add()` method. Because the "old way" stores file items in the `DataTransfer.files` property, which is a read-only `FileList`, there's no direct equivalent.

```js
function dragstartHandler(ev) {
  // New way: add(data)
  ev.dataTransfer.items.add(new File([blob], "image.png"));
}

const p1 = document.getElementById("p1");
p1.addEventListener("dragstart", dragstartHandler);
```

Note that when adding file data, `add()` ignores the `type` parameter and uses the `type` property of the `File` object.

> **Note:**
> Read/write protection is done on a per-job basis, which means only the _synchronous code_ within the `dragstart` handler can modify the data store. If you try to access the data store after an asynchronous operation, you will no longer have write permissions. For example, this does not work:
>
> ```js example-bad
> function dragstartHandler(ev) {
>   canvas.toBlob((blob) => {
>     ev.dataTransfer.items.add(new File([blob], "image.png"));
>   });
> }
> ```

Removing data is similar, using the `DataTransferItemList.remove()`, `DataTransferItemList.clear()`, or `DataTransfer.clearData()` methods.

## Reading the drag data store

The only time you can _read_ from the data store, apart from the `dragstart` event when you have full access to the data store, is during the `drop` event, allowing the drop target to retrieve the data.

To read text data from the drag data store, the "new way" uses the `DataTransferItemList` object, while the "old way" uses the `DataTransfer.getData()` method. The new way is more convenient for looping through all items, while the old way is more convenient for accessing a specific type.

```js
function dropHandler(ev) {
  // New way: loop through items
  for (const item of ev.dataTransfer.items) {
    if (item.kind === "string") {
      item.getAsString((data) => {
        // Do something with data
      });
    }
  }
  // Old way: getData(type)
  const data = ev.dataTransfer.getData("text/plain");
}

const p1 = document.getElementById("p1");
p1.addEventListener("drop", dropHandler);
```

To read file data from the drag data store, the "new way" still uses the `DataTransferItemList` object, while the "old way" uses the `DataTransfer.files` property.

```js
function dropHandler(ev) {
  // New way: loop through items
  for (const item of ev.dataTransfer.items) {
    if (item.kind === "file") {
      const file = item.getAsFile(); // A File object
    }
  }
  // Old way: loop through files
  for (const file of ev.dataTransfer.files) {
    // Do something with file
  }
}

const p1 = document.getElementById("p1");
p1.addEventListener("drop", dropHandler);
```

### Protected mode

Outside of `dragstart` and `drop` events, the data store is in _protected mode_, disallowing code from accessing any payload. Namely:

- All modification attempts silently do nothing or throw a `DOMException` (for `items.remove()` only).
- `DataTransfer.getData()` always returns the empty string.
- `DataTransfer.files` always returns an empty list.
- `DataTransferItem.getAsString()` returns without ever calling the callback.
- `DataTransferItem.getAsFile()` always returns `null`.

Again, read/write protection is done on a per-job basis, which means only the _synchronous code_ within the `drop` handler can read the data store. If you try to access the data store after an asynchronous operation, you will no longer have write permissions. For example, this does not work:

```js
function getDataPromise(item) {
  return new Promise((resolve) => {
    item.getAsString((data) => {
      resolve(data);
    });
  });
}

async function dropHandler(ev) {
  for (const item of ev.dataTransfer.items) {
    if (item.kind === "string") {
      // Bad: by the second time this runs, we are no longer in the same job
      const data = await getDataPromise(item);
    }
  }
}

const p1 = document.getElementById("p1");
p1.addEventListener("drop", dropHandler);
```

Instead, you must call all the access methods synchronously upfront, and wait for their results later:

```js
async function dropHandler(ev) {
  const promises = [];
  for (const item of ev.dataTransfer.items) {
    if (item.kind === "string") {
      // Bad: by the second time this runs, we are no longer in the same job
      promises.push(getDataPromise(item));
    }
  }
  const results = await Promise.all(promises);
}
```
