---
title: "Using files from web applications (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file_api/using_files_from_web_applications/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using files from web applications

Using the File API, web content can ask the user to select local files and then read the contents of those files. This selection can be done by either using an HTML ``<<input type="file">>`` element or by drag and drop.

## Accessing selected file(s)

Consider this HTML:

```html
<input type="file" id="input" multiple />
```

The File API makes it possible to access a `FileList` containing `File` objects representing the files selected by the user.

The `multiple` attribute on the `input` element allows the user to select multiple files.

Accessing the first selected file using a classical DOM selector:

```js
const selectedFile = document.getElementById("input").files[0];
```

### Accessing selected file(s) on a change event

It is also possible (but not mandatory) to access the `FileList` through the `change` event. You need to use `EventTarget.addEventListener()` to add the `change` event listener, like this:

```js
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
}
```

## Getting information about selected file(s)

The `FileList` object provided by the DOM lists all of the files selected by the user, each specified as a `File` object. You can determine how many files the user selected by checking the value of the file list's `length` attribute:

```js
const numFiles = fileList.length;
```

Individual `File` objects can be retrieved by accessing the list as an array.

There are three attributes provided by the `File` object that contain useful information about the file.

- `name`
    The file's name as a read-only string. This is just the file name, and does not include any path information.
- `size`
    The size of the file in bytes as a read-only 64-bit integer.
- `type`
    The MIME type of the file as a read-only string or `""` if the type couldn't be determined.

### Example: Showing file(s) size

The following example shows a possible use of the `size` property:

```html
<form name="uploadForm">
  <div>
    <input id="uploadInput" type="file" multiple />
    <label for="fileNum">Selected files:</label>
    <output id="fileNum">0</output>;
    <label for="fileSize">Total size:</label>
    <output id="fileSize">0</output>
  </div>
  <div><input type="submit" value="Send file" /></div>
</form>
```

```js
const uploadInput = document.getElementById("uploadInput");
uploadInput.addEventListener("change", () => {
  // Calculate total size
  let numberOfBytes = 0;
  for (const file of uploadInput.files) {
    numberOfBytes += file.size;
  }

  // Approximate to the closest prefixed unit
  const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  const exponent = Math.min(
    Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
    units.length - 1,
  );
  const approx = numberOfBytes / 1024 ** exponent;
  const output =
    exponent === 0
      ? `${numberOfBytes} bytes`
      : `${approx.toFixed(3)} ${units[exponent]} (${numberOfBytes} bytes)`;

  document.getElementById("fileNum").textContent = uploadInput.files.length;
  document.getElementById("fileSize").textContent = output;
});
```

## Using hidden file input elements using the click() method

You can hide the admittedly ugly file `` element and present your own interface for opening the file picker and displaying which file or files the user has selected. You can do this by styling the input element with `display:none` and calling the `click()` method on the `` element.

Consider this HTML:

```html
<input type="file" id="fileElem" multiple accept="image/*" />
<button id="fileSelect" type="button">Select some files</button>
```

```css
#fileElem {
  display: none;
}
```

The code that handles the `click` event can look like this:

```js
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click();
  }
});
```

You can style the `` however you wish.

## Using a label element to trigger a hidden file input element

To allow opening the file picker without using JavaScript (the click() method), a `` element can be used. Note that in this case the input element must not be hidden using `display: none` (nor `visibility: hidden`), otherwise the label would not be keyboard-accessible. Use the visually-hidden technique instead.

Consider this HTML:

```html
<input
  type="file"
  id="fileElem"
  multiple
  accept="image/*"
  class="visually-hidden" />
<label for="fileElem">Select some files</label>
```

and this CSS:

```css
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

input.visually-hidden:is(:focus, :focus-within) + label {
  outline: thin dotted;
}
```

There is no need to add JavaScript code to call `fileElem.click()`. Also in this case you can style the label element as you wish. You need to provide a visual cue for the focus status of the hidden input field on its label, be it an outline as shown above, or background-color or box-shadow. (As of time of writing, Firefox doesn't show this visual cue for `` elements.)

## Selecting files using drag and drop

You can also let the user drag and drop files into your web application.

The first step is to establish a drop zone. Exactly what part of your content will accept drops may vary depending on the design of your application, but making an element receive drop events is easy:

```js
let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);
```

In this example, we're turning the element with the ID `dropbox` into our drop zone. This is done by adding listeners for the `dragenter`, `dragover`, and `drop` events.

We don't actually need to do anything with the `dragenter` and `dragover` events in our case, so these functions are both simple. They just stop propagation of the event and prevent the default action from occurring:

```js
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
```

The real magic happens in the `drop()` function:

```js
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}
```

Here, we retrieve the `dataTransfer` field from the event, pull the file list out of it, and then pass that to `handleFiles()`. From this point on, handling the files is the same whether the user used the `input` element or drag and drop.

## Example: Showing thumbnails of user-selected images

Let's say you're developing the next great photo-sharing website and want to use HTML to display thumbnail previews of images before the user actually uploads them. You can establish your input element or drop zone as discussed previously and have them call a function such as the `handleFiles()` function below.

```js
function handleFiles(files) {
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      continue;
    }

    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
```

Here our loop handling the user-selected files looks at each file's `type` attribute to see if its MIME type begins with `image/`. For each file that is an image, we create a new `img` element. CSS can be used to establish any pretty borders or shadows and to specify the size of the image, so that doesn't need to be done here.

Each image has the CSS class `obj` added to it, making it easy to find in the DOM tree. We also add a `file` attribute to each image specifying the `File` for the image; this will let us fetch the images for actual upload later. We use `Node.appendChild()` to add the new thumbnail to the preview area of our document.

Next, we establish the `FileReader` to handle asynchronously loading the image and attaching it to the `img` element. After creating the new `FileReader` object, we set up its `onload` function and then call `readAsDataURL()` to start the read operation in the background. When the entire contents of the image file are loaded, they are converted into a `data:` URL which is passed to the `onload` callback. Our implementation of this routine sets the `img` element's `src` attribute to the loaded image which results in the image appearing in the thumbnail on the user's screen.

## Using object URLs

The DOM `URL.createObjectURL()` and `URL.revokeObjectURL()` methods let you create simple URL strings that can be used to reference any data that can be referred to using a DOM `File` object, including local files on the user's computer.

When you have a `File` object you'd like to reference by URL from HTML, you can create an object URL for it like this:

```js
const objectURL = window.URL.createObjectURL(fileObj);
```

The object URL is a string identifying the `File` object. Each time you call `URL.createObjectURL()`, a unique object URL is created even if you've created an object URL for that file already. Each of these must be released. While they are released automatically when the document is unloaded, if your page uses them dynamically you should release them explicitly by calling `URL.revokeObjectURL()`:

```js
URL.revokeObjectURL(objectURL);
```

## Example: Using object URLs to display images

This example uses object URLs to display image thumbnails. In addition, it displays other file information including their names and sizes.

The HTML that presents the interface looks like this:

```html
<input type="file" id="fileElem" multiple accept="image/*" />
<a href="#" id="fileSelect">Select some files</a>
<div id="fileList">
  <p>No files selected!</p>
</div>
```

```css
#fileElem {
  display: none;
}
```

This establishes our file `` element as well as a link that invokes the file picker (since we keep the file input hidden to prevent that less-than-attractive user interface from being displayed). This is explained in the section Using hidden file input elements using the click() method, as is the method that invokes the file picker.

The `handleFiles()` method follows:

```js
const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem"),
  fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
});

fileElem.addEventListener("change", handleFiles);

function handleFiles() {
  fileList.textContent = "";
  if (!this.files.length) {
    const p = document.createElement("p");
    p.textContent = "No files selected!";
    fileList.appendChild(p);
  } else {
    const list = document.createElement("ul");
    fileList.appendChild(list);
    for (const file of this.files) {
      const li = document.createElement("li");
      list.appendChild(li);

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.height = 60;
      li.appendChild(img);
      const info = document.createElement("span");
      info.textContent = `${file.name}: ${file.size} bytes`;
      li.appendChild(info);
    }
  }
}
```

This starts by fetching the URL of the `` with the ID `fileList`. This is the block into which we'll insert our file list, including thumbnails.

If the `FileList` object passed to `handleFiles()` is empty, we set the inner HTML of the block to display "No files selected!". Otherwise, we start building our file list, as follows:

1. A new unordered list (``) element is created.
2. The new list element is inserted into the `` block by calling its `Node.appendChild()` method.
3. For each `File` in the `FileList` represented by `files`:
   1. Create a new list item (``) element and insert it into the list.
   2. Create a new image (``) element.
   3. Set the image's source to a new object URL representing the file, using `URL.createObjectURL()` to create the blob URL.
   4. Set the image's height to 60 pixels.
   5. Append the new list item to the list.

Here is a live demo of the code above:

Note that we don't immediately revoke the object URL after the image has loaded, because doing so would make the image unusable for user interactions (such as right-clicking to save the image or opening it in a new tab). For long-lived applications, you should revoke object URLs when they're no longer needed (such as when the image is removed from the DOM) to free up memory by calling the `URL.revokeObjectURL()` method and passing in the object URL string.
