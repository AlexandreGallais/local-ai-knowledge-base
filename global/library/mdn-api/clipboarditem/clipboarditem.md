---
title: "ClipboardItem: ClipboardItem() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboarditem/clipboarditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardItem: ClipboardItem() constructor

The **`ClipboardItem()`** constructor creates a new `ClipboardItem` object, which represents data to be stored or retrieved via the Clipboard API `clipboard.write()` and `clipboard.read()` methods, respectively.

> **Note:**
> The `read()` and `write()` methods can be used to work with text strings and arbitrary data items represented by `Blob` instances. However, if you are solely working with text, it is more convenient to use the `Clipboard.readText()` and `Clipboard.writeText()` methods.

> **Note:**
> Image format support varies by browser. See the browser compatibility table for the `Clipboard` interface.

## Syntax

```js
new ClipboardItem(data)
new ClipboardItem(data, options)
```

### Parameters

- `data`
    An `Object` with one or more properties, each representing a different format of the same clipboard entry.
    The key of each property is a MIME type, such as `"text/plain"` or `"text/html"`, and its value is the data for that format.

    Each value can be represented as one of the following:
    - a `Blob`
    - a string
    - a `Promise` that resolves to either a `Blob` or string.
- `options` (optional)
    An object with the following properties:
    - `presentationStyle` (optional)
        One of the three strings: `unspecified`, `inline` or `attachment`.
        The default is `unspecified`.

        `inline` signifies to apps that receive the paste that the `ClipboardItem` should be inserted inline at the point of paste. `attachment` signifies to apps that receive the paste that the `ClipboardItem` should be added as an attachment. `unspecified` doesn't signify any information to apps that receive the paste.

## Examples

The following example requests a PNG image using `fetch()` and uses it, via the `Response.blob()` method, to create a new `ClipboardItem`.
This item is then written to the clipboard, using the `Clipboard.write()` method.

For an example that writes and reads back several MIME-type representations in one `ClipboardItem`, see Reading multiple formats from the clipboard.

> **Note:**
> `Clipboard.write()` takes an array of `ClipboardItem` objects, but if the underlying OS doesn't support writing multiple items, only the first item will be written.
> Some browser versions throw an exception if more than one item is passed in the array (see Browser compatibility in `Clipboard.write()`).

```js
async function writeClipImg() {
  try {
    if (ClipboardItem.supports("image/png")) {
      const imgURL = "/my-image.png";
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      console.log("Fetched image copied.");
    } else {
      console.log("image png is not supported");
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

## See also

- Clipboard API
- Image support for Async Clipboard article
