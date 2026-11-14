---
title: "NDEFRecord: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord: data property

The **`data`**
property of the `NDEFRecord` interface returns a
`DataView` containing the raw bytes of the record's payload.

## Value

A `DataView` that contains encoded payload data of the record.

## Examples

The following example loops over the records in an `NDEFMessage`
object, which is retrieved from `NDEFReadingEvent.message`. After
selecting a record based on its `mediaType`, it then decodes what's stored in the `data` property.

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
