---
title: "Using files from web applications (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/file_api/using_files_from_web_applications/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using files from web applications (part 2 of 2)

## Example: Uploading a user-selected file

This example shows how to let the user upload files (such as the images selected using the previous example) to a server.

> **Note:**
> It's usually preferable to make HTTP requests using the Fetch API instead of `XMLHttpRequest`. However, in this case we want to show the user the upload progress, and this feature is still not supported by the Fetch API, so the example uses `XMLHttpRequest`.
>
> Work to track standardization of progress notifications using the Fetch API is at <https://github.com/whatwg/fetch/issues/607>.

### Creating the upload tasks

Continuing with the code that built the thumbnails in the previous example, recall that every thumbnail image is in the CSS class `obj` with the corresponding `File` attached in a `file` attribute. This allows us to select all of the images the user has chosen for uploading using `Document.querySelectorAll()`, like this:

```js
function sendFiles() {
  const imgs = document.querySelectorAll(".obj");

  for (const img of imgs) {
    new FileUpload(img, img.file);
  }
}
```

`document.querySelectorAll` fetches a `NodeList` of all the elements in the document with the CSS class `obj`. In our case, these will be all of the image thumbnails. Once we have that list, it's trivial to go through it and create a new `FileUpload` instance for each. Each of these handles uploading the corresponding file.

### Handling the upload process for a file

The `FileUpload` function accepts two inputs: an image element and a file from which to read the image data.

```js
function FileUpload(img, file) {
  const reader = new FileReader();
  this.ctrl = createThrobber(img);
  const xhr = new XMLHttpRequest();
  this.xhr = xhr;

  this.xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const percentage = Math.round((e.loaded * 100) / e.total);
      this.ctrl.update(percentage);
    }
  });

  xhr.upload.addEventListener("load", (e) => {
    this.ctrl.update(100);
    const canvas = this.ctrl.ctx.canvas;
    canvas.parentNode.removeChild(canvas);
  });
  xhr.open(
    "POST",
    "https://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php",
  );
  xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
  reader.onload = (evt) => {
    xhr.send(evt.target.result);
  };
  reader.readAsBinaryString(file);
}

function createThrobber(img) {
  const throbberWidth = 64;
  const throbberHeight = 6;
  const throbber = document.createElement("canvas");
  throbber.classList.add("upload-progress");
  throbber.setAttribute("width", throbberWidth);
  throbber.setAttribute("height", throbberHeight);
  img.parentNode.appendChild(throbber);
  throbber.ctx = throbber.getContext("2d");
  throbber.ctx.fillStyle = "orange";
  throbber.update = (percent) => {
    throbber.ctx.fillRect(
      0,
      0,
      (throbberWidth * percent) / 100,
      throbberHeight,
    );
    if (percent === 100) {
      throbber.ctx.fillStyle = "green";
    }
  };
  throbber.update(0);
  return throbber;
}
```

The `FileUpload()` function shown above creates a throbber, which is used to display progress information, and then creates an `XMLHttpRequest` to handle uploading the data.

Before actually transferring the data, several preparatory steps are taken:

1. The `XMLHttpRequest`'s upload `progress` listener is set to update the throbber with new percentage information so that as the upload progresses the throbber will be updated based on the latest information.
2. The `XMLHttpRequest`'s upload `load` event handler is set to update the throbber progress information to 100% to ensure the progress indicator actually reaches 100% (in case of granularity quirks during the process). It then removes the throbber since it's no longer needed. This causes the throbber to disappear once the upload is complete.
3. The request to upload the image file is opened by calling `XMLHttpRequest`'s `open()` method to start generating a POST request.
4. The MIME type for the upload is set by calling the `XMLHttpRequest` function `overrideMimeType()`. In this case, we're using a generic MIME type; you may or may not need to set the MIME type at all depending on your use case.
5. The `FileReader` object is used to convert the file to a binary string.
6. Finally, when the content is loaded the `XMLHttpRequest` function `send()` is called to upload the file's content.

### Asynchronously handling the file upload process

This example, which uses PHP on the server side and JavaScript on the client side, demonstrates asynchronous uploading of a file.

```php
<?php
if (isset($_FILES["myFile"])) {
  // Example:
  move_uploaded_file($_FILES["myFile"]["tmp_name"], "uploads/" . $_FILES["myFile"]["name"]);
  exit;
}
?><!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>dnd binary upload</title>
  </head>
  <body>
    <div>
      <div
        id="dropzone"
        style="margin:30px; width:500px; height:300px; border:1px dotted grey;">
        Drag & drop your file here
      </div>
    </div>
    <script>
      function sendFile(file) {
        const uri = "/index.php";
        const xhr = new XMLHttpRequest();
        const fd = new FormData();

        xhr.open("POST", uri, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText); // handle response.
          }
        };
        fd.append("myFile", file);
        // Initiate a multipart/form-data upload
        xhr.send(fd);
      }

      const dropzone = document.getElementById("dropzone");
      dropzone.addEventListener("dragover", (event) => {
        event.stopPropagation();
        event.preventDefault();
      });

      dropzone.addEventListener("drop", (event) => {
        event.preventDefault();

        const filesArray = event.dataTransfer.files;
        for (let i = 0; i < filesArray.length; i++) {
          sendFile(filesArray[i]);
        }
      });
    </script>
  </body>
</html>
```

## Example: Using object URLs to display PDF

Object URLs can be used for other things than just images! They can be used to display embedded PDF files or any other resources that can be displayed by the browser.

In Firefox, to have the PDF appear embedded in the iframe (rather than proposed as a downloaded file), the preference `pdfjs.disabled` must be set to `false`.

```html
<iframe id="viewer"></iframe>
```

And here is the change of the `src` attribute:

```js
const objURL = URL.createObjectURL(blob);
const iframe = document.getElementById("viewer");
iframe.setAttribute("src", objURL);

// Later:
URL.revokeObjectURL(objURL);
```

## Example: Using object URLs with other file types

You can manipulate files of other formats the same way. Here is how to preview uploaded video:

```js
const video = document.getElementById("video");
const objURL = URL.createObjectURL(blob);
video.src = objURL;
video.play();

// Later:
URL.revokeObjectURL(objURL);
```

## See also

- `File`
- `FileList`
- `FileReader`
- `URL`
- `XMLHttpRequest`
- Using XMLHttpRequest
