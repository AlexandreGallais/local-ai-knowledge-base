---
title: "NDEFReader: scan() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreader/scan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReader: scan() method

The `scan()` method of the `NDEFReader` interface activates a reading device and returns a `Promise` that either resolves when an NFC tag read operation is scheduled or rejects if a hardware or permission error is encountered. This method triggers a permission prompt if the "nfc" permission has not been previously granted.

## Syntax

```js
scan(options)
```

### Parameters

- `options` (optional)
    An object with the following properties:
    - `signal`
        An `AbortSignal` that allows canceling this `scan()` operation.

### Return value

A `Promise` that resolves immediately after
scheduling read operations for the NFC adapter.

### Exceptions

This method doesn't throw exceptions; instead, it rejects the returned promise,
passing a `DOMException` whose `name` is one of the
following:

- `AbortError` `DOMException`
    Returned if the scan operation was aborted with the `AbortSignal` passed in the `options` argument.
- `InvalidStateError` `DOMException`
    Returned if there's already an ongoing scan.
- `NotAllowedError` `DOMException`
    Returned if the permission for this operation was rejected.
- `NotSupportedError` `DOMException`
    Returned if there is no NFC adapter compatible with Web NFC or a connection cannot be established.

## Examples

### Handle scanning errors

This example shows what happens when a scan promise rejects and `readingerror` is thrown.

```js
const ndef = new NDEFReader();
ndef
  .scan()
  .then(() => {
    console.log("Scan started successfully.");
    ndef.onreadingerror = (event) => {
      console.log(
        "Error! Cannot read data from the NFC tag. Try a different one?",
      );
    };
    ndef.onreading = (event) => {
      console.log("NDEF message read.");
    };
  })
  .catch((error) => {
    console.log(`Error! Scan failed to start: ${error}.`);
  });
```
