---
title: "`<input type=\"file\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/file/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="file">` HTML attribute value

`` elements with **`type="file"`** let the user choose one or more files from their device storage. Once chosen, the files can be uploaded to a server using form submission, or manipulated using JavaScript code and the File API.

```html
<label for="avatar">Choose a profile picture:</label>

<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
```

```css
label {
  display: block;
  font:
    1rem "Fira Sans",
    sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}
```

## Value

A file input's `value` attribute contains a string that represents the path to the selected file(s). If no file is selected yet, the value is an empty string (`""`). When the user selected multiple files, the `value` represents the first file in the list of files they selected. The other files can be identified using the input's `HTMLInputElement.files` property.

> **Note:**
> The value is always the file's name prefixed with `C:\fakepath\`, which isn't the real path of the file. This is to prevent malicious software from guessing the user's file structure.

## Additional attributes

In addition to the common attributes shared by all `` elements, inputs of type `file` also support the following attributes.

### accept

The `accept` attribute value is a string that defines the file types the file input should accept. This string is a comma-separated list of **unique file type specifiers**. Because a given file type may be identified in more than one manner, it's useful to provide a thorough set of type specifiers when you need files of a given format.

For instance, there are a number of ways Microsoft Word files can be identified, so a site that accepts Word files might use an `` like this:

```html
<input
  type="file"
  id="docpicker"
  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
```

### capture

The `capture` attribute value is a string that specifies which camera to use for capture of image or video data, if the `accept` attribute indicates that the input should be of one of those types. A value of `user` indicates that the user-facing camera and/or microphone should be used. A value of `environment` specifies that the outward-facing camera and/or microphone should be used. If this attribute is missing, the user agent is free to decide on its own what to do. If the requested facing mode isn't available, the user agent may fall back to its preferred default mode.

> **Note:**
> `capture` was previously a Boolean attribute which, if present, requested that the device's media capture device(s) such as camera or microphone be used instead of requesting a file input.

### multiple

When the `multiple` Boolean attribute is specified, the file input allows the user to select more than one file.

### webkitdirectory

The Boolean `webkitdirectory` attribute, if present, indicates that only directories should be available to be selected by the user in the file picker interface. See `HTMLInputElement.webkitdirectory` for additional details and examples.

> **Note:**
> `webkitdirectory` is defined in the File and Directory Entries API. It's named `webkitdirectory` because of its origins as a Chrome-specific API. It is now available in all browsers.

## Unique file type specifiers

A **unique file type specifier** is a string that describes a type of file that may be selected by the user in an `` element of type `file`. Each unique file type specifier may take one of the following forms:

- A valid case-insensitive filename extension, starting with a period (".") character. For example: `.jpg`, `.pdf`, or `.doc`.
- A valid MIME type string, with no extensions.
- The string `audio/*` meaning "any audio file".
- The string `video/*` meaning "any video file".
- The string `image/*` meaning "any image file".

The `accept` attribute takes a string containing one or more of these unique file type specifiers as its value, separated by commas. For example, a file picker that needs content that can be presented as an image, including both standard image formats and PDF files, might look like this:

```html
<input type="file" accept="image/*,.pdf" />
```

## Using file inputs

### A basic <example-value>

```html
<div>
  <label for="file">Choose file to upload</label>
  <input type="file" id="file" name="file" multiple />
</div>
```

```css
div {
  margin-bottom: 10px;
}
```

This produces the following output:

Regardless of the user's device or operating system, the file input provides a button that opens up a file picker dialog that allows the user to choose a file.

Including the `multiple` attribute, as shown above, specifies that multiple files can be chosen at once. The user can choose multiple files from the file picker in any way that their chosen platform allows (e.g., by holding down `Shift` or `Control` and then clicking). If you only want the user to choose a single file per ``, omit the `multiple` attribute.

### Getting information on selected files

The selected files are returned by the element's `HTMLInputElement.files` property, which is a `FileList` object containing a list of `File` objects. The `FileList` behaves like an array, so you can check its `length` property to get the number of selected files.

Each `File` object contains the following information:

- `name`
    The file's name.
- `lastModified`
    A number specifying the date and time at which the file was last modified, in milliseconds since the UNIX epoch (January 1, 1970, at midnight).
- `lastModifiedDate` (deprecated)
    A `Date` object representing the date and time at which the file was last modified. _This is deprecated and should not be used. Use `lastModified` instead._
- `size`
    The size of the file in bytes.
- `type`
    The file's MIME type.
- `webkitRelativePath` (non-standard)
    A string specifying the file's path relative to the base directory selected in a directory picker (that is, a `file` picker in which the `webkitdirectory` attribute is set). _This is non-standard and should be used with caution._

### Limiting accepted file types

Often you won't want the user to be able to pick any arbitrary type of file; instead, you often want them to select files of a specific type or types. For example, if your file input lets users upload a profile picture, you probably want them to select web-compatible image formats, such as JPEG or PNG.

Acceptable file types can be specified with the `accept` attribute, which takes a comma-separated list of allowed file extensions or MIME types. Some examples:

- `accept="image/png"` or `accept=".png"` — Accepts PNG files.
- `accept="image/png, image/jpeg"` or `accept=".png, .jpg, .jpeg"` — Accept PNG or JPEG files.
- `accept="image/*"` — Accept any file with an `image/*` MIME type. (Many mobile devices also let the user take a picture with the camera when this is used.)
- `accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"` — accept anything that smells like an MS Word document.

Let's look at a more complete example:

```html
<div>
  <label for="profile_pic">Choose file to upload</label>
  <input
    type="file"
    id="profile_pic"
    name="profile_pic"
    accept=".jpg, .jpeg, .png" />
</div>
```

```css
div {
  margin-bottom: 10px;
}
```

This produces a similar-looking output to the previous example:

It may look similar, but if you try selecting a file with this input, you'll see that the file picker only lets you select the file types specified in the `accept` value (the exact interface differs across browsers and operating systems).

The `accept` attribute doesn't validate the types of the selected files; it provides hints for browsers to guide users towards selecting the correct file types. It is still possible (in most cases) for users to toggle an option in the file chooser that makes it possible to override this and select any file they wish, and then choose incorrect file types.

Because of this, you should make sure that the `accept` attribute is backed up by appropriate server-side validation.

### Detecting cancellations

The `cancel` event is fired when the user does not change their selection, reselecting the previously selected files. The `cancel` event is also fired when the file picker dialog gets closed, or canceled, via the "cancel" button or the `escape` key.

For example, the following code will log to the console if the user closes the popup without selecting a file:

```js
const elem = document.createElement("input");
elem.type = "file";
elem.addEventListener("cancel", () => {
  console.log("Canceled.");
});
elem.addEventListener("change", () => {
  if (elem.files.length === 1) {
    console.log("File selected: ", elem.files[0]);
  }
});
elem.click();
```

### Notes

1. You cannot set the value of a file picker from a script — doing something like the following has no effect:

   ```js
   const input = document.querySelector("input[type=file]");
   input.value = "foo";
   ```

2. When a file is chosen using an ``, the real path to the source file is not shown in the input's `value` attribute for obvious security reasons. Instead, the filename is shown, with `C:\fakepath\` prepended to it. There are some historical reasons for this quirk, but it is supported across all modern browsers, and in fact is defined in the spec.
