---
title: "NDEFReader"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReader

The **`NDEFReader`** interface of the Web NFC API is used to read from and write data to compatible NFC devices, e.g., NFC tags supporting NDEF, when these devices are within the reader's magnetic induction field.

## Constructor

- `NDEFReader()` (experimental)
    Returns a new `NDEFReader` object.

## Instance methods

_The `NDEFReader` interface inherits the methods of `EventTarget`, its parent interface._

- `NDEFReader.scan()` (experimental)
    Activates a reading device and returns a `Promise` that either resolves when an NFC tag read operation is scheduled or rejects if a hardware or permission error is encountered. This method triggers a permission prompt if the "nfc" permission has not been previously granted.
- `NDEFReader.write()` (experimental)
    Attempts to write an NDEF message to a tag and returns a `Promise` that either resolves when a message has been written to the tag or rejects if a hardware or permission error is encountered. This method triggers a permission prompt if the "nfc" permission has not been previously granted.

## Events

_Inherits events from its parent, `EventTarget`._

- `reading` (experimental)
    Fires when a new reading is available from compatible NFC devices.
- `readingerror` (experimental)
    Fires when a tag is in proximity of a reading device, but cannot be read.

## Examples

### Handling initial reads while writing

The example below shows how to coordinate between a common reading handler and one used specifically for a single write. In order to write, a tag needs to be found and read. This gives you the ability to check whether it is actually a tag that you want to write to. That's why it's recommended that you call `write()` from a reading event.

```js
const ndef = new NDEFReader();
let ignoreRead = false;

ndef.onreading = (event) => {
  if (ignoreRead) {
    return; // write pending, ignore read.
  }

  console.log("We read a tag, but not during pending write!");
};

function write(data) {
  ignoreRead = true;
  return new Promise((resolve, reject) => {
    ndef.addEventListener(
      "reading",
      (event) => {
        // Check if we want to write to this tag, or reject.
        ndef
          .write(data)
          .then(resolve, reject)
          .finally(() => (ignoreRead = false));
      },
      { once: true },
    );
  });
}

await ndef.scan();
try {
  await write("Hello World");
  console.log("We wrote to a tag!");
} catch (err) {
  console.error("Something went wrong", err);
}
```
