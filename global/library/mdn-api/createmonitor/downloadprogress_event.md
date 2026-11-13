---
title: "CreateMonitor: downloadprogress event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/createmonitor/downloadprogress_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CreateMonitor: downloadprogress event

The **`downloadprogress`** event of the `CreateMonitor` interface is fired when progress is made on the AI model download.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("downloadprogress", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondownloadprogress = (event) => { }
```

## Event type

A `ProgressEvent`. Inherits from `Event`.

## Examples

See the main `CreateMonitor` page for an example.

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev.
