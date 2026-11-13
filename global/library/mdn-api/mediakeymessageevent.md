---
title: "MediaKeyMessageEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeymessageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeyMessageEvent

The **`MediaKeyMessageEvent`** interface of the Encrypted Media Extensions API contains the content and related data when the content decryption module generates a message for the session.

## Constructor

- `MediaKeyMessageEvent()`
    Creates a new instance of `MediaKeyMessageEvent`.

## Instance properties

Inherits properties from its parent, `Event`.

- `MediaKeyMessageEvent.message` (read-only)
    Returns an `ArrayBuffer` with a message from the content decryption module. Messages vary by key system.
- `MediaKeyMessageEvent.messageType` (read-only)
    Indicates the type of message. May be one of `license-request`, `license-renewal`, `license-release`, or `individualization-request`.

## Instance methods

Inherits methods from its parent, `Event`.

## Examples

```js
// TBD
```
