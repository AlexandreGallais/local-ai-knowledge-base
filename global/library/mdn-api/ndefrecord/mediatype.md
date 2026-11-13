---
title: "NDEFRecord: mediaType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/mediatype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord: mediaType property

The **`mediaType`**
property of the `NDEFRecord` interface returns the MIME type of the record. This value will be `null` if `recordType` is not equal to `"mime"`.

## Value

A string, containing the MIME type of the record
payload.

## Examples

The following example loops over the records in an `NDEFMessage` object, which is retrieved from `NDEFReadingEvent.message`. It then uses the `mediaType` property to determine which of the records to parse.

```js
const ndef = new NDEFReader();
await ndef.scan();
ndef.onreading = (event) => {
  const decoder = new TextDecoder();
  for (const record of event.message.records) {
    if (record.mediaType === "application/json") {
      const json = JSON.parse(decoder.decode(record.data));
      const article = /^[aeio]/i.test(json.title) ? "an" : "a";
      console.log(`${json.name} is ${article} ${json.title}`);
    }
  }
};
```
