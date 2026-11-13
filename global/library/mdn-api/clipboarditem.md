---
title: "ClipboardItem"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboarditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardItem

The **`ClipboardItem`** interface of the Clipboard API represents a single item of data copied to, or read from, the clipboard, used with `Clipboard.write()` and `Clipboard.read()` respectively.

> **Note:**
> The `read()` and `write()` methods can be used to work with text strings and arbitrary data items represented by `Blob` instances. However, if you are solely working with text, it is more convenient to use the `Clipboard.readText()` and `Clipboard.writeText()` methods.

## Constructor

- `ClipboardItem()`
    Creates a new **`ClipboardItem`** object, with one or more MIME types as keys and their corresponding data as values.

## Instance properties

- `types` (read-only)
    Returns an `Array` of MIME types, one for each representation of the data in the `ClipboardItem`.
- `presentationStyle` (read-only)
    Returns one of the following: `"unspecified"`, `"inline"` or `"attachment"`.

## Static methods

- `ClipboardItem.supports()`
    Checks whether a given MIME type is supported by the clipboard. This enables a website to detect whether a MIME type is supported before attempting to write data.

## Instance methods

- `getType()`
    Returns a `Promise` that resolves with a `Blob` of the requested MIME type, or an error if the MIME type is not found.

## Description

A single `ClipboardItem` can hold several representations of that data at once, each identified by a different MIME type — for example, some copied rich text might be stored as both `text/html` and `text/plain`.

When you construct a `ClipboardItem`, you provide these representations as MIME-type-keyed properties of a single object; see `ClipboardItem()` for details.

When you read a `ClipboardItem`, you can find its available formats in `types`, and retrieve each one individually with `getType()`.

## Examples

### Writing text to the clipboard

In this example we first define two constants containing references to a `` element containing some text and a `` element.

Next, we define a function called `copyToClipboard()`. This starts off by storing a `"text/plain"` MIME type in a constant, then creating an object called `clipboardItemData` that contains one property with a key equal to the MIME type and a value of the text we want to copy to the clipboard (the content of the `` element, in this case). Because we are working with text, we can pass it in directly rather than having to create a `Blob`.

We construct a new `ClipboardItem` object using the `ClipboardItem()` constructor, and pass it into the `Clipboard.write()` method to copy the text to the clipboard.

Finally, we add an event listener to the `` so that it runs the function when pressed.

```js
const textSource = document.querySelector("p");
const copyBtn = document.querySelector("button");

async function copyToClipboard() {
  const type = "text/plain";
  const clipboardItemData = {
    [type]: textSource.textContent,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
}

copyBtn.addEventListener("click", copyToClipboard);
```

### Writing an image to the clipboard

Here we use `supports()` to check whether the `image/svg+xml` MIME data type is supported.
If it is, we fetch an SVG image with the Fetch API, and then read it into a `Blob`, which we can use to create a `ClipboardItem` that is written to the clipboard.

```js
async function writeClipImg() {
  try {
    if (ClipboardItem.supports("image/svg+xml")) {
      const imgURL = "/my-image.svg";
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      console.log("Fetched image copied.");
    } else {
      console.log("SVG images are not supported by the clipboard.");
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

### Reading from the clipboard

Here we're returning all items on the clipboard via the `clipboard.read()` method.
We then use the `ClipboardItem.types` property to set the `getType()` parameter and return the corresponding blob object.

Each `clipboardItem` here may itself list several MIME types in `types`, since a single clipboard entry can carry multiple format representations at once.

```js
async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      const formats = {};
      for (const type of clipboardItem.types) {
        formats[type] = await clipboardItem.getType(type);
      }
      console.log(formats); // e.g. { "text/html": Blob, "text/plain": Blob }
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

## See also

- `Clipboard.read()`
- `Clipboard.write()`
- `ClipboardChangeEvent`
- Clipboard API
- Image support for Async Clipboard article
