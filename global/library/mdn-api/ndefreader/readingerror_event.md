---
title: "NDEFReader: readingerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreader/readingerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReader: readingerror event

The `readingerror` event of the `NDEFReader` interface is fired whenever an error occurs during reading of NFC tags, e.g., when tags leave the reader's magnetic induction field.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("readingerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onreadingerror = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The following example shows how to process events using both the `onreading` and `onreadingerror` event handlers.

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
