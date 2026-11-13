---
title: "PresentationRequest: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationrequest/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationRequest: start() method

The **`start()`** property of the `PresentationRequest` interface returns a `Promise` that resolves with a `PresentationConnection` after the user agent prompts the user to select a display and grant permission to use that display.

## Syntax

```js
start()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a `PresentationConnection`.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.
