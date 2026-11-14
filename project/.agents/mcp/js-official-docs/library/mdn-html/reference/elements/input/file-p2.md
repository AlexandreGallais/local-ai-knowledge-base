---
title: "`<input type=\"file\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="file">` HTML attribute value (part 2 of 2)

## Examples

### Complete file example

In this example, we'll present a slightly more advanced file chooser that takes advantage of the file information available in the `HTMLInputElement.files` property, as well as showing off a few clever tricks.

#### HTML

The HTML looks like so:

```html
<div class="file-picker">
  <div>
    <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
    <input
      type="file"
      id="image_uploads"
      name="image_uploads"
      accept=".jpg, .jpeg, .png"
      multiple />
  </div>
  <div class="preview">
    <p>No files currently selected for upload</p>
  </div>
  <div>
    <button type="button">Submit</button>
  </div>
</div>
```

```css
html {
  font-family: sans-serif;
}

.file-picker {
  background: #cccccc;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid black;
}

.file-picker ol {
  padding-left: 0;
}

.file-picker li,
div > p {
  background: #eeeeee;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  list-style-type: none;
  border: 1px solid black;
}

.file-picker img {
  height: 64px;
  order: 1;
}

.file-picker p {
  line-height: 32px;
  padding-left: 10px;
}

.file-picker label,
.file-picker button {
  background-color: #7f9ccb;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px ridge black;
  font-size: 0.8rem;
  height: auto;
}

.file-picker label:hover,
.file-picker button:hover {
  background-color: #2d5ba3;
  color: white;
}

.file-picker label:active,
.file-picker button:active {
  background-color: #0d3f8f;
  color: white;
}
```

This is similar to what we've seen earlier, so we won't spend time describing it. Also, we've hidden the CSS applied to the example, as it isn't relevant to understanding the file input or the JavaScript that powers it.

#### JavaScript

In the first lines of script, we get references to the form input itself, and the `` element with the class of `.preview`. Next, we hide the `` element — we do this because file inputs tend to be ugly, difficult to style, and inconsistent in their design across browsers. You can activate the `input` element by clicking its ``, so it is better to visually hide the `input` and style the label like a button, so the user will know to interact with it if they want to upload files.

```js
const input = document.querySelector("input");
const preview = document.querySelector(".preview");

input.style.opacity = 0;
```

> **Note:**
> `opacity` is used to hide the file input instead of `visibility: hidden` or `display: none`, because assistive technology interprets the latter two styles to mean the file input isn't interactive.

Next, we add an event listener to the input to listen for changes to its selected value (in this case, when files are selected). The event listener invokes our custom `updateImageDisplay()` function.

```js
input.addEventListener("change", updateImageDisplay);
```

Whenever the `updateImageDisplay()` function is invoked, we:

- Use a `while` loop to empty the previous contents of the preview ``.
- Grab the `FileList` object that contains the information on all the selected files, and store it in a variable called `curFiles`.
- Check to see if no files were selected, by checking if `curFiles.length` is equal to 0. If so, print a message into the preview `` stating that no files have been selected.
- If files _have_ been selected, we loop through each one, printing information about it into the preview ``. Things to note here:
- We use the custom `validFileType()` function to check whether the file is of the correct type (e.g., the image types specified in the `accept` attribute).
- If it is, we:
  - Print out its name and file size into a list item inside the previous `` (obtained from `file.name` and `file.size`). The custom `returnFileSize()` function returns a nicely-formatted version of the size in bytes/KB/MB (by default the browser reports the size in absolute bytes).
  - Generate a thumbnail preview of the image by calling `URL.createObjectURL(file)`. Then, insert the image into the list item too by creating a new `` and setting its `src` to the thumbnail.

- If the file type is invalid, we display a message inside a list item telling the user that they need to select a different file type.

```js
function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size,
        )}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = file.name;

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}
```

The custom `validFileType()` function takes a `File` object as a parameter, then uses `Array.prototype.includes()` to check if any value in the `fileTypes` matches the file's `type` property. If a match is found, the function returns `true`. If no match is found, it returns `false`.

```js
// https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}
```

The `returnFileSize()` function takes a number (of bytes, taken from the current file's `size` property), and turns it into a nicely formatted size in bytes/KB/MB.

```js
function returnFileSize(number) {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  }
  return `${(number / 1e6).toFixed(1)} MB`;
}
```

> **Note:**
> The "KB" and "MB" units here use the SI prefix convention of 1KB = 1000B, similar to macOS. Different systems represent file sizes differently—for example, Ubuntu uses IEC prefixes where 1KiB = 1024B, while RAM specifications often use SI prefixes to represent powers of two (1KB = 1024B). For this reason, we used `1e3` (`1000`) and `1e6` (`100000`) instead of `1024` and `1048576`. In your application, you should communicate the unit system clearly to your users if the exact size is important.

```js
const button = document.querySelector(".file-picker button");
button.addEventListener("click", () => {
  const para = document.createElement("p");
  para.append("Image uploaded!");
  preview.replaceChildren(para);
});
```

#### Result

## Technical summary

       | Value
       |
        A string representing the path to the selected
        file.

       | Events
       |
        `change`,
        `input` and
        `cancel`

       | Supported common attributes
       | `required`

       | Additional Attributes
       |
        `accept`,
        `capture`,
        `multiple`

       | IDL attributes
       | `files` and `value`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       | no corresponding role

## See also

- Using files from web applications — contains a number of other useful examples related to `` and the File API.
