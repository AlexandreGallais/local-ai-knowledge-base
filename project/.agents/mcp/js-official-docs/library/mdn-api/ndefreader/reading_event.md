---
title: "NDEFReader: reading event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreader/reading_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReader: reading event

The `reading` event of the `NDEFReader` interface is fired whenever a new reading is available from compatible NFC devices (e.g., NFC tags supporting NDEF) when these devices are within the reader's magnetic induction field.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("reading", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onreading = (event) => { }
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

## See also

- `readingerror` event
