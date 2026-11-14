---
title: "FileList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filelist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileList

The **`FileList`** interface represents an object of this type returned by the `files` property of the HTML `` element; this lets you access the list of files selected with the `` element. It's also used for a list of files dropped into web content when using the drag and drop API; see the `DataTransfer` object for details on this usage.

All `` element nodes have a `files` attribute of type `FileList` on them which allows access to the items in this list. For example, if the HTML includes the following file input:

```html
<input id="fileItem" type="file" />
```

The following line of code fetches the first file in the node's file list as a `File` object:

```js
const file = document.getElementById("fileItem").files[0];
```

This interface was an attempt to create an unmodifiable list and only continues to be supported to not break code that's already using it. Modern APIs represent list structures using types based on JavaScript arrays, thus making many array methods available, and at the same time imposing additional semantics on their usage (such as making their items read-only).

These historical reasons do not mean that you as a developer should avoid `FileList`. You don't create `FileList` objects yourself, but you get them from APIs such as `HTMLInputElement.files`, and these APIs are not deprecated. However, be careful of the semantic differences from a real array.

## Instance properties

- `length` (read-only)
    A read-only value indicating the number of files in the list.

## Instance methods

- `item()`
    Returns a `File` object representing the file at the specified index in the file list.

## Example

### Logging filenames

In this example, we log the names of all the files selected by the user.

#### HTML

```html
<input id="myfiles" multiple type="file" />
<pre class="output">Selected files:</pre>
```

#### CSS

```css
.output {
  overflow: scroll;
  margin: 1rem 0;
  height: 200px;
}
```

#### JavaScript

```js
const output = document.querySelector(".output");
const fileInput = document.querySelector("#myfiles");

fileInput.addEventListener("change", () => {
  for (const file of fileInput.files) {
    output.innerText += `\n${file.name}`;
  }
});
```

#### Result

## See also

- Using files from web applications
- `File`
- `FileReader`
