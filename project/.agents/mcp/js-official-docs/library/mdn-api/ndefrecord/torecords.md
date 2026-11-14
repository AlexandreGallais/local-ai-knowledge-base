---
title: "NDEFRecord: toRecords() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefrecord/torecords/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFRecord: toRecords() method

The **`toRecords()`**
method of the `NDEFRecord` interface converts
`NDEFRecord.data` to a sequence of records based on
`NDEFRecord.recordType`, and returns the result. This allows
parsing the payloads of record types which may contain nested records, such
as smart poster and external type records.

## Syntax

```js
toRecords()
```

### Parameters

None.

### Return value

A list of `NDEFRecord`s.

### Exceptions

- `NotSupportedError` `DOMException`
    Indicates that the User Agent does not know how to parse this combination of
    `NDEFRecord.data` and `NDEFRecord.recordType`.

## Examples

Read an external record with an NDEF message as payload

The example uses external type records to create application-defined records.
These records may contain an `NDEFMessage` as payload, with its own
`NDEFRecord` objects, including local types that are used in the
context of the application. Notice that the smart poster record type also
contains an NDEF message as payload.

Because NDEF gives no guarantee on the ordering of records, using an external
type record with an NDEF message as payload can be useful for encapsulating
related data.

This example shows how to read an external record for social posts, which
contains an `NDEFMessage`, containing a text record and a record
with the local type "act" (action), with a definition borrowed from smart
poster, but used in local application context.

```js
const ndefReader = new NDEFReader();
await ndefReader.scan();
ndefReader.onreading = (event) => {
  const externalRecord = event.message.records.find(
    (record) => record.type === "example.com:smart-poster",
  );

  let action, text;

  for (const record of externalRecord.toRecords()) {
    if (record.recordType === "text") {
      const decoder = new TextDecoder(record.encoding);
      text = decoder.decode(record.data);
    } else if (record.recordType === ":act") {
      action = record.data.getUint8(0);
    }
  }

  switch (action) {
    case 0: // do the action
      console.log(`Post "${text}" to timeline`);
      break;
    case 1: // save for later
      console.log(`Save "${text}" as a draft`);
      break;
    case 2: // open for editing
      console.log(`Show editable post with "${text}"`);
      break;
  }
};
```
