---
title: "Clipboard: read() method (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/read/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard: read() method (part 2 of 3)

## Examples

### Reading multiple formats from the clipboard

This example copies text to the clipboard as a single `ClipboardItem` with two format representations: `text/html` and `text/plain`.
It then reads the clipboard back with `read()` and lists the returned formats.

#### HTML

First we define the `source` element, which contains the HTML representation of the data that we'll copy.
The buttons that follow are used to copy the HTML and to read (and log) the returned clipboard items.

```html
<div id="source">
  <p><strong>Bold</strong> and <em>italic</em> text.</p>
</div>
<button id="copy" type="button">Copy (HTML + plain text)</button>
<button id="inspect" type="button">Read clipboard item</button>
```

There is also hidden logging-panel code, not relevant to the example.

```html
<pre id="log"></pre>
```

```css
#source {
  border: 1px solid black;
  padding: 0.5rem;
  width: fit-content;
}

#log {
  height: 130px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
  white-space: pre-wrap;
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

The "Copy" button constructs one `ClipboardItem` with two MIME-type keys, `text/html` and `text/plain`, and writes it as a single clipboard entry.

```js
const sourceElement = document.querySelector("#source");
const copyButton = document.querySelector("#copy");

copyButton.addEventListener("click", async () => {
  const html = sourceElement.innerHTML;
  const text = sourceElement.innerText;
  try {
    const clipboardItem = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([text], { type: "text/plain" }),
    });
    await navigator.clipboard.write([clipboardItem]);
    log("Copied one ClipboardItem with two formats: text/html and text/plain.");
  } catch (error) {
    log(`Copy failed: ${error.message}`);
  }
});
```

The "Read" button calls `read()` and logs every MIME type each returned `ClipboardItem` carries. It then fetches and logs each format's data with `getType()`.

```js
const inspectButton = document.querySelector("#inspect");

inspectButton.addEventListener("click", async () => {
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      log(`ClipboardItem contains: ${clipboardItem.types.join(", ")}`);
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        const text = await blob.text();
        log(`  ${type} → ${text}`);
      }
    }
  } catch (error) {
    log(`Read failed: ${error.message}`);
  }
});
```

#### Result

First click the Copy button to copy the element as both text and HTML.
Then click the "Read clipboard item" button to read it back and list the formats in the item.

> **Note:**
> If prompted, grant permission in order to copy and paste.

### Reading image data from clipboard

This example uses the `read()` method to read image data from the clipboard and paste it into an `` element.

#### HTML

```html
<img id="source" src="butterfly.jpg" alt="A butterfly" />
<img
  id="destination"
  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
  alt="Pasted image" />
<button id="reload" type="button">Reload</button>
<p id="log"></p>
```

#### CSS

```css
img {
  height: 100px;
  width: 100px;
  margin: 0 1rem;
  border: 1px solid black;
}
#reload {
  display: block;
  margin: 0 1rem;
}
```

#### JavaScript

This code provides a mechanism to log any errors to the element with id `log`.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `Error: ${text}`;
}
```

We also add code to reload and clear the example when the "Reload" button is pressed.

```js
const reload = document.querySelector("#reload");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
```

The remaining code reads the clipboard when the destination element is clicked and copies the image data into the `destinationImage` element.
It logs an error if it is unable to use the `read()` method, or if the clipboard does not contain data in PNG format.

```js
const destinationImage = document.querySelector("#destination");
destinationImage.addEventListener("click", pasteImage);

async function pasteImage() {
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (!item.types.includes("image/png")) {
        throw new Error("Clipboard does not contain PNG image data.");
      }
      const blob = await item.getType("image/png");
      destinationImage.src = URL.createObjectURL(blob);
    }
  } catch (error) {
    log(error.message);
  }
}
```

#### Result

Copy the butterfly image on the left by right-clicking the image and selecting "Copy image" from the context menu.
Then click on the empty frame on the right.
The example will fetch the image data from the clipboard and display the image in the empty frame.

> **Note:**
> If prompted, grant permission in order to paste the image.

### Reading data from the clipboard

This example uses the `read()` method to read data from the clipboard and log whatever data is stored in the clipboard.

This differs from the previous version in that it will display text, HTML, and image `ClipboardItem` objects (rather than just images).

#### HTML

```html
<img id="source_jpg" src="butterfly.jpg" alt="JPG butterfly image" />
<div id="destination">Click here to copy clipboard data.</div>
<button id="reload" type="button">Reload</button>
<p id="log"></p>
```

#### CSS

```css
img {
  height: 100px;
  width: 100px;
  margin: 0 1rem;
  border: 1px solid black;
}

#destination {
  min-height: 300px;
  min-width: 90%;
  margin: 0 1rem;
  border: 1px solid black;
}

#reload {
  display: block;
  margin: 0 1rem;
}
```

#### JavaScript

This code provides a mechanism to log any errors to the element with id `log`.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `Error: ${text}`;
}
```

We also add code to reload and clear the example when the "Reload" button is pressed.

```js
const reload = document.querySelector("#reload");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
```

The remaining code reads the clipboard when the destination element is clicked and displays each `ClipboardItem` element along with its MIME type.
It logs an error it is unable to use the `read()` method, or if the clipboard contains any other MIME type.

```js
const destinationDiv = document.querySelector("#destination");
destinationDiv.addEventListener("click", pasteData);

async function pasteData() {
  destinationDiv.innerText = ""; // Clear inner text
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      for (const mimeType of item.types) {
        const mimeTypeElement = document.createElement("p");
        mimeTypeElement.innerText = `MIME type: ${mimeType}`;
        destinationDiv.appendChild(mimeTypeElement);
        if (mimeType === "image/png") {
          const pngImage = new Image();
          pngImage.alt = "PNG image from clipboard";
          const blob = await item.getType("image/png");
          pngImage.src = URL.createObjectURL(blob);
          destinationDiv.appendChild(pngImage);
        } else if (mimeType === "text/html") {
          const blob = await item.getType("text/html");
          const blobText = await blob.text();
          const clipHTML = document.createElement("pre");
          clipHTML.innerText = blobText;
          destinationDiv.appendChild(clipHTML);
        } else if (mimeType === "text/plain") {
          const blob = await item.getType("text/plain");
          const blobText = await blob.text();
          const clipPlain = document.createElement("pre");
          clipPlain.innerText = blobText;
          destinationDiv.appendChild(clipPlain);
        } else {
          throw new Error(`${mimeType} not supported.`);
        }
      }
    }
  } catch (error) {
    log(error.message);
  }
}
```

#### Result

Copy some text or the butterfly (JPG) image below (to copy images right-click on them and then select "Copy image" from the context menu).
Select the indicated frame below to paste this information from the clipboard into the frame.

Notes:

- Even though the butterfly image is a JPG file, when read from the clipboard it is a PNG.
- If prompted, you will need to grant permission in order to paste the image.
- This may not work on chromium browsers as the sample frame is not granted the Permissions-Policy `clipboard-read` and `clipboard-write` permissions (required by Chromium browsers).

### Reading unsanitized HTML from the clipboard

This example uses the `formats` parameter to read HTML data from the clipboard and get the code in its original form, without the browser sanitizing it first.

#### HTML

```html
<textarea id="source" rows="5">
  <style>h1 {color: red;} p {color: blue;}</style>
  <h1>Hello world!</h1>
  <p>This is a test.</p>
  <script>alert('Hello world!');</script>
</textarea>
<button id="copy">Copy HTML</button>
<button id="paste_normal">Paste HTML</button>
<button id="paste_unsanitized">Paste unsanitized HTML</button>
<textarea id="destination" rows="5"></textarea>
```

#### CSS

```css
body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

textarea {
  grid-column: 1 / span 3;
}
```

#### JavaScript

```js
const copyButton = document.getElementById("copy");
const pasteButton = document.getElementById("paste_normal");
const pasteUnsanitizedButton = document.getElementById("paste_unsanitized");
const sourceTextarea = document.getElementById("source");
const destinationTextarea = document.getElementById("destination");

copyButton.addEventListener("click", async () => {
  const text = sourceTextarea.value;
  const type = "text/html";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  try {
    await navigator.clipboard.write(data);
  } catch (error) {
    destinationTextarea.value = `Clipboard write failed: ${error}`;
  }
});

async function getHTMLFromClipboardContents(clipboardContents) {
  for (const item of clipboardContents) {
    if (item.types.includes("text/html")) {
      const blob = await item.getType("text/html");
      const blobText = await blob.text();
      return blobText;
    }
  }

  return null;
}

pasteButton.addEventListener("click", async () => {
  try {
    const clipboardContents = await navigator.clipboard.read();
    const html = await getHTMLFromClipboardContents(clipboardContents);
    destinationTextarea.value =
      html || "Could not find HTML data in the clipboard.";
  } catch (error) {
    destinationTextarea.value = `Clipboard read failed: ${error}`;
  }
});

pasteUnsanitizedButton.addEventListener("click", async () => {
  try {
    const clipboardContents = await navigator.clipboard.read({
      unsanitized: ["text/html"],
    });
    const html = await getHTMLFromClipboardContents(clipboardContents);
    destinationTextarea.value =
      html || "Could not find HTML data in the clipboard.";
  } catch (error) {
    destinationTextarea.value = `Clipboard read failed: ${error}`;
  }
});
```

#### Result

First click the "Copy HTML" button to write the HTML code from the first textarea to the clipboard. Then either click the "Paste HTML" button or the "Paste unsanitized HTML" button to paste the sanitized or unsanitized HTML code into the second textarea.
