---
title: "Response: bytes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/bytes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: bytes() method

The **`bytes()`** method of the `Response` interface takes a `Response` stream and reads it to completion.
It returns a promise that resolves with a `Uint8Array`.

## Syntax

```js
bytes()
```

### Parameters

None.

### Return value

A promise that resolves with a `Uint8Array`.

### Exceptions

- `AbortError` `DOMException`
    The request was aborted.
- `TypeError`
    Thrown for one of the following reasons:
    - The response body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).
- `RangeError`
    Thrown if there is a problem creating the associated `ArrayBuffer` (for example, if the data size is too large).

## Examples

### Fetching and decoding a file

The code below shows how you might fetch a text file, return the body as a `Uint8Array`, and then decode this into a string.

```js
const response = await fetch("https://www.example.com/textfile.txt");
const textFile = await response.bytes();
const string = new TextDecoder().decode(textFile);
console.log(string);
```

### Getting an image file signature

This example demonstrates how you can use `bytes()` to read the signature bytes of a number of image files, and identify the type.

#### HTML

First we define a `<select>` element for choosing the file type, with corresponding values that indicate the specific file on WikiMedia commons to fetch.

```html
<label for="file-select">Choose a file:</label>

<select name="Files" id="file-select">
  <option value="">--Select an image type--</option>
  <option
    value="https://upload.wikimedia.org/wikipedia/commons/7/70/Example.png">
    PNG
  </option>
  <option
    value="https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg">
    JPG
  </option>
  <option
    value="https://upload.wikimedia.org/wikipedia/commons/8/8f/Example.gif">
    GIF89a
  </option>
</select>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

The code first checks if the `bytes()` method is supported.
If the method is supported it adds an event handler for the `change` event on the `<select>` element.
When the value changes, it passes the value of the selection (a URL for an image file) to the `checkSignature()` method defined below.
If the method is not supported it logs this information.

```js
if ("bytes" in Response.prototype) {
  const selectFileElement = document.getElementById("file-select");
  selectFileElement.addEventListener("change", async (event) => {
    try {
      await checkSignature(event.target.value);
    } catch (e) {
      log(e);
    }
  });
} else {
  log("Response.bytes() not supported");
}
```

The `checkSignature()` method is defined below.
This fetches a file at the given `url`, and uses `response.bytes()` to get its contents as a byte array.
The initial bytes are then compared to the initial signature bytes of a number of common file types.
The file name and the file type are then logged.

```js
async function checkSignature(url) {
  if (url === "") return;
  log(`File: ${url}`);
  const response = await fetch(url);
  const image = await response.bytes();

  // File signatures from: https://en.wikipedia.org/wiki/List_of_file_signatures
  const jpgSignature = [0xff, 0xd8, 0xff, 0xe0];
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const gif89aSignature = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];

  if (
    image
      .slice(0, jpgSignature.length)
      .every((byte, index) => byte === jpgSignature[index])
  ) {
    log(`JPG signature: FF D8 FF E0`);
  } else if (
    image
      .slice(0, pngSignature.length)
      .every((byte, index) => byte === pngSignature[index])
  ) {
    log(`PNG signature: 89 50 4E 47 0D 0A 1A 0A`);
  } else if (
    image
      .slice(0, gif89aSignature.length)
      .every((byte, index) => byte === gif89aSignature[index])
  ) {
    log(`GIF (GIF89a) signature: 47 49 46 38 39 61`);
  } else {
    log("Unknown format");
  }
}
```

#### Result

Choose an image type using the selection list.
The log should then display the file name, along with the file type that was determined from the file's signature.

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
