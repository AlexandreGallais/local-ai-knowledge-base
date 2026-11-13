---
title: "NDEFMessage: records property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefmessage/records/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFMessage: records property

The `records` property of
`NDEFMessage` interface represents a list of `NDEFRecord`s
present in the NDEF message.

## Value

A list of `NDEFRecord` object that represent data recorded in the message.

## Examples

The following example shows how to read the contents of an NDEF message. It first sets up an event handler for `onreading`, which is passed an instance of `NDEFReadingEvent`. An `NDEFMessage` object is returned from `NDEFReadingEvent.message`. It loops through `message.records` and processes each record based on its message type. The data member is a `DataView`, which allows handling data encoded in UTF-16.

```js
ndefReaderInst.onreading = (event) => {
  const ndefMessage = event.message;
  for (const record of ndefMessage.records) {
    console.log(`Record type:  ${record.recordType}`);
    console.log(`MIME type:    ${record.mediaType}`);
    console.log(`Record id:    ${record.id}`);
    switch (record.recordType) {
      case "text":
        // TODO: Read text record with record data, lang, and encoding.
        break;
      case "url":
        // TODO: Read URL record with record data.
        break;
      default:
      // TODO: Handle other records with record data.
    }
  }
};
```
