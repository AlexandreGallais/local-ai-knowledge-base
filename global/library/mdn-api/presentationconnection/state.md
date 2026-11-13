---
title: "PresentationConnection: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnection/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnection: state property

The **`state`** read-only property of the `PresentationConnection` interface reflects the presentation connection's current state. Depending on the current `PresentationConnectionState`, the `state` attribute can hold one of the following values.

- **`connecting`**: The user agent is attempting to establish a presentation connection with the destination browsing context. This is the initial state when a `PresentationConnection` object is created.
- **`connected`**: The presentation connection is established and communication is possible.
- **`closed`**: The presentation connection has been closed or could not be opened. The connection may be reopened by calling `reconnect()`. No communication is possible in this state.
- **`terminated`**: The receiving browsing context has terminated. Any presentation connection to that presentation has also terminated and cannot be reopened. No communication is possible.
