---
title: "PresentationConnection: send() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnection/send/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnection: send() method

The **`send()`** method of the
`PresentationConnection` interface tells a controlling browsing context to
send binary or text data to a presenting browsing context.

## Syntax

```js
send(data)
```

### Parameters

- `data`
    The data to send to the presentation context. It will be one of the following:
    - `String`
    - `Blob`
    - `Array`

### Return value

None (`undefined`).
