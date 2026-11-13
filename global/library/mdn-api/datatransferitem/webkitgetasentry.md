---
title: "DataTransferItem: webkitGetAsEntry() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/datatransferitem/webkitgetasentry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataTransferItem: webkitGetAsEntry() method

The **`webkitGetAsEntry()`** method of the `DataTransferItem` interface returns a `FileSystemFileEntry` or `FileSystemDirectoryEntry` representing the item if it is a file. If the item isn't a file, `null` is returned.

During a drag operation, this method can only read data in the handlers for the `dragstart` and `drop` events, because those are the only times the drag data store is readable. Calling it from any other drag event returns `null`. See Reading the drag data store for details.

> **Note:**
> This function is implemented as `webkitGetAsEntry()` in non-WebKit browsers including Firefox at this time; it may be renamed to `getAsEntry()` in the future, so you should code defensively, looking for both.

## Syntax

```js
webkitGetAsEntry()
```

### Parameters

None.

### Return value

A `FileSystemEntry`-based object describing the dropped item.
This will be either `FileSystemFileEntry` or `FileSystemDirectoryEntry`.
The method aborts and returns `null` if the dropped item isn't a file, or if the `DataTransferItem` object is not in read or read/write mode.

## Examples

In this example, a drop zone is created, which responds to the `drop` event
by scanning through the dropped files and directories, outputting a hierarchical
directory listing.

### HTML

The HTML establishes the drop zone itself, which is a `` element with the ID `"dropzone"`, and an unordered list element with the ID `"listing"`.

```html
<p>Drag files and/or directories to the box below!</p>

<div id="dropzone">
  <div id="boxtitle">Drop Files Here</div>
</div>

<h2>Directory tree:</h2>

<ul id="listing"></ul>
```

### CSS

The styles used by the example are shown here.

```css
#dropzone {
  text-align: center;
  width: 300px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  border: 4px dashed red;
  border-radius: 10px;
}

#boxtitle {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: black;
  font:
    bold 2em "Arial",
    sans-serif;
  width: 300px;
  height: 100px;
}

body {
  font:
    14px "Arial",
    sans-serif;
}
```

### JavaScript

First, let's look at the recursive `scanFiles()` function.
This function takes as input a `FileSystemEntry` representing an entry in the file system to be scanned and processed (the `item` parameter), and an element into which to insert the list of contents (the `container` parameter).

> **Note:**
> To read all files in a directory, `readEntries` needs to be called repeatedly until it returns an empty array.
> In Chromium-based browsers, the following example will only return a max of 100 entries.

```js
let dropzone = document.getElementById("dropzone");
let listing = document.getElementById("listing");

function scanFiles(item, container) {
  let elem = document.createElement("li");
  elem.textContent = item.name;
  container.appendChild(elem);

  if (item.isDirectory) {
    let directoryReader = item.createReader();
    let directoryContainer = document.createElement("ul");
    container.appendChild(directoryContainer);
    directoryReader.readEntries((entries) => {
      entries.forEach((entry) => {
        scanFiles(entry, directoryContainer);
      });
    });
  }
}
```

`scanFiles()` begins by creating a new `` element to represent the item being scanned, inserts the name of the item into it as its text content, and then appends it to the container.
The container is always a list element in this example, as you'll see shortly.

Once the current item is in the list, the item's `isDirectory` property is checked.
If the item is a directory, we need to recurse into that directory.
The first step is to create a `FileSystemDirectoryReader` to handle fetching the directory's contents.
That's done by calling the item's `createReader()` method.
Then a new `` is created and appended to the parent list; this will contain the directory's contents in the next level down in the list's hierarchy.

After that, `directoryReader.readEntries()` is called to read in all the entries in the directory.
These are each, in turn, passed into a recursive call to `scanFiles()` to process them.
Any of them which are files are inserted into the list; any which are directories are inserted into the list and a new level of the list's hierarchy is added below, and so forth.

Then come the event handlers. First, we prevent the `dragover` event from being handled by the default handler, so that our drop zone can receive the drop:

```js
dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});
```

The event handler that kicks everything off, of course, is the handler for the `drop` event:

```js
dropzone.addEventListener("drop", (event) => {
  let items = event.dataTransfer.items;

  event.preventDefault();
  listing.textContent = "";

  for (const item of items) {
    const entry = item.webkitGetAsEntry();

    if (entry) {
      scanFiles(entry, listing);
    }
  }
});
```

This fetches the list of `DataTransferItem` objects representing the items dropped from `event.dataTransfer.items`.
Then we call `Event.preventDefault()` to prevent the event from being handled further after we're done.

Now it's time to start building the list. First, the list is emptied by setting `listing.textContent` to be empty.
That leaves us with an empty `` to begin inserting directory entries into.

Then we iterate over the items in the list of dropped items.
For each one, we call its `webkitGetAsEntry()` method to obtain a `FileSystemEntry` representing the file.
If that's successful, we call `scanFiles()` to process the item—either by adding it to the list if it's just a file or by adding it and walking down into it if it's a directory.

### Result

You can see how this works by trying it out below. Find some files and directories and drag them in, and take a look at the resulting output.

## See also

- File and Directory Entries API
- `DataTransferItem`
- `FileSystemEntry`, `FileSystemFileEntry`, and `FileSystemDirectoryEntry`
- Events: `dragover` and `drop`
