---
title: "Notification: badge property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/badge/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: badge property

The **`badge`** read-only property of the `Notification` interface returns a string containing the URL of a small icon representing the web application itself. The badge is used by the platform when there is not enough space to display the full notification — for example, in a status bar. On Android, the badge should accommodate up to 4x display resolution (about 96×96px), and the image will be automatically masked to a monochrome silhouette.

See Notifications with different images for a comparison of the three image options.

## Value

A string containing a URL.
