---
title: "UIEvent: detail property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/uievent/detail/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UIEvent: detail property

The **`UIEvent.detail`** read-only property, when non-zero, provides the current (or next, depending on the event) click count.

For `click` or `dblclick` events, `UIEvent.detail` is the current click count.

For `mousedown` or `mouseup` events, `UIEvent.detail` is _1 plus_ the current click count.

For all other `UIEvent` objects, `UIEvent.detail` is always zero.
